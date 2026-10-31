import { createClient } from "@supabase/supabase-js";
import { createHash, randomBytes } from "node:crypto";

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 6 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const playerName =
    typeof req.body?.playerName === "string"
      ? req.body.playerName.trim().slice(0, 24)
      : "";

  if (!playerName) {
    return res.status(400).json({ error: "Enter your player name" });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.CITY_GAME_DATABASE_SECRET;

  if (!url || !key) {
    return res.status(500).json({ error: "Server configuration missing" });
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  for (let attempt = 0; attempt < 5; attempt++) {
    const roomCode = generateRoomCode();
    const guestToken = randomBytes(32).toString("hex");
    const guestTokenHash = createHash("sha256")
      .update(guestToken)
      .digest("hex");

    const { data: room, error: roomError } = await supabase
      .schema("game_private")
      .from("rooms")
      .insert({
        room_code: roomCode,
        status: "waiting",
        is_private: false,
        max_players: 8,
        round_number: 1,
      })
      .select("id, room_code, status")
      .single();

    if (roomError) {
      if (roomError.code === "23505") continue;
      return res.status(500).json({ error: "Could not create room" });
    }

    const { data: player, error: playerError } = await supabase
      .schema("game_private")
      .from("players")
      .insert({
        room_id: room.id,
        guest_token_hash: guestTokenHash,
        display_name: playerName,
        is_host: true,
        is_connected: true,
      })
      .select("id")
      .single();

    if (playerError) {
      await supabase
        .schema("game_private")
        .from("rooms")
        .delete()
        .eq("id", room.id);

      return res.status(500).json({ error: "Could not add host player" });
    }

    return res.status(201).json({
      roomCode: room.room_code,
      roomId: room.id,
      playerId: player.id,
      guestToken,
    });
  }

  return res.status(500).json({ error: "Please try creating the room again" });
}
