import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import "./ChatInput.css";

function ChatInput({ onSend, disabled = false }) {
    const [message, setMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (!trimmedMessage || disabled) return;
        onSend(trimmedMessage);
        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="chat-input-wrapper">
            <form className="chat-input-box" onSubmit={handleSubmit}>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message ERIC..." rows={1} disabled={disabled} aria-label="Message ERIC" />

                <div className="input-actions">
                    <button type="button" className="attachment-button" title="Attachments coming soon" disabled >
                        <Paperclip size={18} />
                    </button>
                    <button type="submit" className="send-button" disabled={!message.trim() || disabled} aria-label="Send message" >
                        <Send size={17} />
                    </button>
                </div>
            </form>
            <p className="input-disclaimer">
                ERIC 4.0 is under development. Responses are currently simulated.
            </p>
        </div>
    );
}
export default ChatInput;