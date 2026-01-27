import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./UserPanel.css";

function UserPanel() {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  return (
    <div className="user-panel">
      <div className="user-info">
        <div className="status-dot online" />
        <div className="user-text">
          <span className="username">{user.username}</span>
          <span className="status-text">online</span>
        </div>
      </div>

      <div className="user-actions">
        <button aria-label="Mute">🎤</button>
        <button aria-label="Deafen">🎧</button>
        <button aria-label="Settings">⚙️</button>
      </div>
    </div>
  );
}

export default UserPanel;
