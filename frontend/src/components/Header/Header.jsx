
import { Menu, PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import "./Header.css";

function Header({ onMenuClick, sidebarOpen, chatTitle }) {
  return (
    <header className="chat-header">
      <div className="header-left">
        <button
          className="header-menu-button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={21} />
        </button>

        <div className="header-chat-title">
          <h3>{chatTitle || "New Conversation"}</h3>
          <p>Electronic Responsive Intelligence Chatbot</p>
        </div>
      </div>

      <div className="header-right">
        <div className="model-indicator">
          <Sparkles size={15} />
          <span>ERIC Assistant</span>
        </div>

        <div className="header-status">
          <span className="status-dot" />
          <span>Ready</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
