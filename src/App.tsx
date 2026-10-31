
import { useState } from "react";

type Screen = "home" | "create" | "join" | "lobby" | "rules";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");

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

          <button
            onClick={() => {
              if (playerName.trim()) setScreen("create");
              else alert("Please enter your name");
            }}
          >
            Create Room
          </button>

          <button
            onClick={() => {
              if (playerName.trim()) setScreen("join");
              else alert("Please enter your name");
            }}
          >
            Join Room
          </button>

          <button onClick={() => setScreen("rules")}>
            How to Play
          </button>
        </section>
      )}

      {screen === "create" && (
        <section className="panel">
          <h2>Create Investigation Room</h2>
          <p>Prepare your investigation in Ravenwood.</p>
          <p>Maximum players: 8</p>
          <p>Game duration: 15 minutes</p>
          <p>Secret roles will be assigned when a real game starts.</p>

          <button onClick={() => setScreen("lobby")}>
            Continue to Lobby
          </button>
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

          <button
            onClick={() => {
              if (roomCode.trim().length === 6) {
                alert("Multiplayer room connection will be added next.");
              } else {
                alert("Enter a six-character room code");
              }
            }}
          >
            Join Room
          </button>

          <button onClick={() => setScreen("home")}>Back</button>
        </section>
      )}

      {screen === "lobby" && (
        <section className="panel">
          <h2>Investigation Lobby</h2>
          <p>Welcome, {playerName}!</p>
          <p>Ravenwood is waiting for you.</p>
          <p>Invite your investigators when room hosting is connected.</p>

          <button onClick={() => setScreen("home")}>
            Leave Lobby
          </button>
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
