import { useState } from "react";
import { Bot, Plus, MessageSquare, Search, Settings, PanelLeftClose, PanelLeftOpen, Trash2, X, } from "lucide-react";
import "./Sidebar.css";

function Sidebar({
    chats,
    activeChatId,
    onNewChat,
    onSelectChat,
    onDeleteChat,
    isOpen,
    onClose,
}) {
    const [search, setSearch] = useState("");
    const filteredChats = chats.filter((chat) => chat.title.toLowerCase().includes(search.toLowerCase()) );

    return (
        <>
            {isOpen && (
                <div className="sidebar-overlay" onClick={onClose} />
            )}

            <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
                <div className="sidebar-top">
                    <div className="sidebar-brand">
                        <div className="brand-icon">
                            <Bot size={25} />
                        </div>

                        <div className="brand-info">
                            <h2>ERIC<span>.</span></h2>
                            <p>Version 4.0</p>
                        </div>
                    </div>

                    <button
                        className="icon-button sidebar-close"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        <X size={19} />
                    </button>
                </div>

                <button className="new-chat-button" onClick={onNewChat}>
                    <Plus size={19} />
                    <span>New Chat</span>
                </button>

                <div className="sidebar-search">
                    <Search size={17} />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="history-section">
                    <p className="section-label">RECENT CONVERSATIONS</p>

                    <div className="chat-history">
                        { filteredChats.length > 0 ? (
                            filteredChats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`history-item ${ activeChatId === chat.id ? "active" : "" }`}
                                >
                                    <button
                                        className="history-select"
                                        onClick={() => { onSelectChat(chat.id); onClose(); }}
                                    >
                                        <MessageSquare size={16} />
                                        <span>{chat.title}</span>
                                    </button>

                                    <button
                                        className="delete-chat-button"
                                        onClick={() => onDeleteChat(chat.id)}
                                        title="Delete conversation"
                                        aria-label={`Delete ${chat.title}`}
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="empty-history">No conversations found.</p>
                        )}
                    </div>
                </div>

                <div className="sidebar-bottom">
                    <div className="system-status">
                        <span className="status-dot" />
                        <div>
                            <p>System Status</p>
                            <small>UI Prototype Active</small>
                        </div>
                    </div>

                    <button className="settings-button">
                        <Settings size={18} />
                        <span>Settings</span>
                    </button>

                    <div className="sidebar-footer">
                        <span>ERIC 4.0</span>
                        <span>Built for the future.</span>
                    </div>
                </div>
            </aside>
        </>
    );
}
export default Sidebar;