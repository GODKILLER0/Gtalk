import React, { useState } from "react";
import Modal from "../../Modal/Modal";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import "./ServerSidebar.css";

function ServerSidebar({ servers, activeServerId, onSelectServer, onCreateServer, onJoinServer, isCreateModalOpen, setIsCreateModalOpen }) {
  const [hovered, setHovered] = useState(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [guildName, setGuildName] = useState("");
  const [guildId, setGuildId] = useState("");

  const handleCreateServer = () => {
    if (guildName.trim()) {
      onCreateServer(guildName.trim());
      setGuildName("");
      setIsCreateModalOpen(false);
    }
  };

  const handleJoinServer = () => {
    if (guildId.trim()) {
      onJoinServer(guildId.trim());
      setGuildId("");
      setIsJoinModalOpen(false);
    }
  };

  return (
    <aside className="server-sidebar">
      <div className="server-list">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`server-item ${
              activeServerId === server.id ? "active" : ""
            }`}
            onClick={() => onSelectServer(server.id)}
            onMouseEnter={() => setHovered(server.id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={server.name}
            role="button"
            tabIndex={0}
          >
            <span className="server-icon">{server.name.charAt(0).toUpperCase()}</span>

            {hovered === server.id && (
              <div className="tooltip server-tooltip">
                {server.name} (ID: {server.id})
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="server-footer">
        <button className="server-add" onClick={() => setIsCreateModalOpen(true)} aria-label="Add Server">
          +
        </button>
        <button className="server-join" onClick={() => setIsJoinModalOpen(true)} aria-label="Join Server">
          🔗
        </button>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        title="Create Guild"
        onClose={() => setIsCreateModalOpen(false)}
      >
        <Input
          type="text"
          placeholder="Guild Name"
          value={guildName}
          onChange={(e) => setGuildName(e.target.value)}
        />
        <Button onClick={handleCreateServer}>Create</Button>
      </Modal>

      <Modal
        isOpen={isJoinModalOpen}
        title="Join Guild"
        onClose={() => setIsJoinModalOpen(false)}
      >
        <Input
          type="text"
          placeholder="Guild ID"
          value={guildId}
          onChange={(e) => setGuildId(e.target.value)}
        />
        <Button onClick={handleJoinServer}>Join</Button>
      </Modal>
    </aside>
  );
}

export default ServerSidebar;
