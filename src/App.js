import React, { useEffect, useState } from "react";
import "./App.css";
import ReactPlayer from "react-player";
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";

const App = () => {
  const snowflakeCount = 100;
  const snowflakeSymbols = ["❄", "❅", "❆"];
  const random = (min, max) => Math.random() * (max - min) + min;

  const [isPlaying, setIsPlaying] = useState(true); // Track the play/pause state

  // Function to create a single snowflake element
  const createSnowflake = () => {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.innerText =
      snowflakeSymbols[Math.floor(Math.random() * snowflakeSymbols.length)];
    snowflake.style.left = `${random(0, 100)}vw`;
    snowflake.style.fontSize = `${random(0.8, 2)}em`;
    snowflake.style.opacity = random(0.5, 1);

    snowflake.style.animationDuration = `${random(10, 30)}s`;
    snowflake.style.animationDelay = `${random(0, 15)}s`;
    snowflake.style.setProperty("--horizontal-drift", `${random(-15, 15)}vw`);
    snowflake.style.setProperty("--rotation", `${random(-360, 360)}deg`);

    if (Math.random() > 0.8) {
      snowflake.classList.add("flare");
    }

    if (Math.random() > 0.5) {
      snowflake.classList.add("blurred");
    }

    document.body.appendChild(snowflake);

    snowflake.addEventListener("animationend", () => {
      snowflake.remove();
    });
  };

  useEffect(() => {
    for (let i = 0; i < snowflakeCount; i++) {
      createSnowflake();
    }

    const interval = setInterval(createSnowflake, 500);

    return () => clearInterval(interval);
  }, []);

  // Toggle play/pause state
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative"
      style={{
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="music-player-container ">
        <div className="music-player">
          <ReactPlayer
            url="https://youtu.be/I-A22StmcXM?si=EFLkSkKDymfWfHyX"
            playing={isPlaying}
            controls={true}
            loop={true}
            width="0"
            height="0"
          />
        </div>
      </div>
      <button
        onClick={togglePlayPause}
        className="absolute left-4 top-4"
        style={{
          fontSize: "24px",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}{" "}
      </button>
    </div>
  );
};

export default App;
