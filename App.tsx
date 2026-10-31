import { useState } from "react";

type Screen = "home" | "create" | "join" | "lobby" | "rules";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

  return (
    <main className="app">
      <header>
        <h1> CITY OF SECRETS </h1>
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
          <p>Your multiplayer room setup will be connected next.</p>
          <button onClick={() => setScreen("lobby")}>Continue to Lobby</button>
          <button onClick={() => setScreen("home")}>Back</button>
        </section>
      )}

      {screen === "join" && (
        <section className="panel">
          <h2>Join Investigation</h2>
          <input
            placeholder="Enter six-character room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <button onClick={() => setScreen("lobby")}>Join</button>
          <button onClick={() => setScreen("home")}>Back</button>
        </section>
      )}

      {screen === "lobby" && (
        <section className="panel">
          <h2>Investigation Lobby</h2>
          <p>Welcome, {playerName || "Detective"}!</p>
          <p>Waiting for investigators...</p>
          <p>Ravenwood is waiting for you.</p>
          <button onClick={() => setScreen("home")}>Leave Lobby</button>
        </section>
      )}

      {screen === "rules" && (
        <section className="panel">
          <h2>How to Play</h2>
          <p>1. Receive a secret role.</p>
          <p>2. Explore the city and collect evidence.</p>
          <p>3. Complete puzzles and secret missions.</p>
          <p>4. Discuss clues with other players.</p>
          <p>5. Vote to identify the killer.</p>
          <button onClick={() => setScreen("home")}>Back</button>
        </section>
      )}

      <footer>15 MINUTES · SECRET ROLES · ONE KILLER</footer>
    </main>
  );
}
