import { useState } from "react";

const locations = [
  "Clocktower Crime Scene",
  "Police Archive",
  "City Hospital",
  "Abandoned Warehouse",
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [roomCode, setRoomCode] = useState("");

  return (
    <main className="app">
      <nav>
        <h2>🔎 CITY OF SECRETS</h2>
        <span>RAVENWOOD • CASE FILE 001</span>
      </nav>

      {screen === "home" && (
        <section className="hero">
          <p className="eyebrow">EVERY CITY HIDES A SECRET</p>
          <h1>TRUST NO ONE.<br />FIND THE TRUTH.</h1>
          <p>
            A mysterious crime has shaken Ravenwood. Investigate the city,
            uncover evidence and discover who is hiding behind the crime.
          </p>
          <button onClick={() => setScreen("create")}>CREATE ROOM</button>
          <button className="secondary" onClick={() => setScreen("join")}>
            JOIN ROOM
          </button>
          <button className="secondary" onClick={() => setScreen("rules")}>
            HOW TO PLAY
          </button>
        </section>
      )}

      {screen === "create" && (
        <section className="panel">
          <h1>Create Investigation Room</h1>
          <p>Start a new Ravenwood investigation.</p>
          <label>Maximum players</label>
          <select>
            <option>4 Players</option>
            <option>6 Players</option>
            <option>8 Players</option>
          </select>
          <button onClick={() => setScreen("lobby")}>CONTINUE TO LOBBY</button>
          <button className="secondary" onClick={() => setScreen("home")}>BACK</button>
        </section>
      )}

      {screen === "join" && (
        <section className="panel">
          <h1>Join Investigation</h1>
          <input
            maxLength={6}
            placeholder="ENTER 6-CHARACTER ROOM CODE"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          />
          <button disabled={roomCode.length !== 6} onClick={() => setScreen("lobby")}>
            JOIN
          </button>
          <button className="secondary" onClick={() => setScreen("home")}>BACK</button>
        </section>
      )}

      {screen === "lobby" && (
        <section className="panel">
          <h1>Investigation Lobby</h1>
          <p>Waiting for investigators to join...</p>
          <p className="code">ROOM CODE: {roomCode || "RAVEN1"}</p>
          <p>Share this code with your friends.</p>
          <button onClick={() => setScreen("game")}>START LOCAL PREVIEW</button>
          <button className="secondary" onClick={() => setScreen("home")}>BACK</button>
        </section>
      )}

      {screen === "rules" && (
        <section className="panel">
          <h1>How to Play</h1>
          <p>Every round lasts 15 minutes.</p>
          <ul>
            <li>1 minute — Briefing</li>
            <li>1 minute — Secret role reveal</li>
            <li>7 minutes — Investigation</li>
            <li>3 minutes — Discussion</li>
            <li>2 minutes — Final vote</li>
            <li>1 minute — Reveal</li>
          </ul>
          <button onClick={() => setScreen("home")}>BACK</button>
        </section>
      )}

      {screen === "game" && (
        <section className="panel">
          <h1>Ravenwood Investigation</h1>
          <p className="eyebrow">LOCAL PREVIEW • MULTIPLAYER NOT CONNECTED</p>
          <h2>Investigation Locations</h2>
          <div className="locations">
            {locations.map((location) => (
              <article key={location}>{location}</article>
            ))}
          </div>
          <h2>Evidence Board</h2>
          <p>Collect clues and solve the mystery.</p>
          <h2>Investigator Chat</h2>
          <input placeholder="Chat will be connected in a later step" disabled />
          <button onClick={() => setScreen("home")}>EXIT GAME</button>
        </section>
      )}
    </main>
  );
}
