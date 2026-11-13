import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import "./MessageBubble.css";

function MessageBubble({ message }) {
    const [copied, setCopied] = useState(false);
    const isAssistant = message.role === "assistant";

    const copyMessage = async () => {
        try {
            await navigator.clipboard.writeText(message.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            console.error("Unable to copy message.");
        }
    };

    return (
        <div className={`message-row ${isAssistant ? "assistant-row" : "user-row"}`}>
            <div className={`message-avatar ${isAssistant ? "assistant-avatar" : "user-avatar"}`}>
                {isAssistant ? <Bot size={19} /> : <User size={19} />}
            </div>

            <div className="message-content">
                <div className="message-meta">
                    <strong>{isAssistant ? "ERIC" : "You"}</strong>
                    <span>
                        {message.timestamp
                        ? new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            })
                        : ""}
                    </span>
                </div>

                <div className="message-text">{message.content}</div>

                {isAssistant && (
                    <button className="copy-message-button" onClick={copyMessage}>
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                )}
            </div>
        </div>
    );
}
export default MessageBubble;