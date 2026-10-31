import { useState } from "react";

type Screen = "home" | "create" | "join" | "lobby" | "rules";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createdCode, setCreatedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function createRoom() {
    if (!playerName.trim()) {
      setMessage("Please enter your name first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not create room.");
      }

      setCreatedCode(data.roomCode);
      sessionStorage.setItem("cityGuestToken", data.guestToken);
      sessionStorage.setItem("cityPlayerId", data.playerId);
      sessionStorage.setItem("cityRoomId", data.roomId);
      setScreen("lobby");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header>
        <h1>CITY OF SECRETS</h1>
        <p>Every city has secrets. Every player has a role.</p>
      </header>

      {screen === "home" && (
        <section className="panel">
          <h2>Enter Ravenwood</h2>
          <p>A mysterious city. A hidden killer. Can you solve the case?</p>
          <input
            placeholder="Enter your player name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={() => setScreen("create")}>Create Room</button>
          <button onClick={() => setScreen("join")}>Join Room</button>
          <button onClick={() => setScreen("rules")}>How to Play</button>
        </section>
      )}

      {screen === "create" && (
        <section className="panel">
          <h2>Create Investigation Room</h2>
          <p>Maximum players: 8</p>
          <p>Game duration: 15 minutes</p>
          <button onClick={createRoom} disabled={loading}>
            {loading ? "Creating..." : "Create Room"}
          </button>
          {message && <p>{message}</p>}
          <button onClick={() => setScreen("home")}>Back</button>
        </section>
      )}

      {screen === "join" && (
        <section className="panel">
          <h2>Join Investigation</h2>
          <input
            placeholder="Enter six-character room code"
            maxLength={6}
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />
          <p>Room joining will be connected in the next version.</p>
          <button onClick={() => setScreen("home")}>Back</button>
        </section>
      )}

      {screen === "lobby" && (
        <section className="panel">
          <h2>Investigation Lobby</h2>
          <p>Welcome, {playerName}!</p>
          <p>Your room code:</p>
          <h1>{createdCode}</h1>
          <p>Share this code with your investigators.</p>
          <p>Maximum players: 8 · Duration: 15 minutes</p>
          <button onClick={() => navigator.clipboard.writeText(createdCode)}>
            Copy Room Code
          </button>
          <button onClick={() => setScreen("home")}>Leave Lobby</button>
        </section>
      )}

      {screen === "rules" && (
        <section className="panel">
          <h2>How to Play</h2>
          <p>01. Receive a secret role.</p>
          <p>02. Explore the city and collect evidence.</p>
          <p>03. Solve puzzles and secret missions.</p>
          <p>04. Discuss clues with other players.</p>
          <p>05. Vote to identify the killer.</p>
          <p>06. Discover the truth before time runs out.</p>
          <button onClick={() => setScreen("home")}>Back</button>
        </section>
      )}

      <footer>15 MINUTES · SECRET ROLES · ONE KILLER</footer>
    </main>
  );
}
