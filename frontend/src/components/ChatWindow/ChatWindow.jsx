import { useEffect, useRef } from "react";
import { Bot, Sparkles } from "lucide-react";
import MessageBubble from "../MessageBubble/MessageBubble";
import ChatInput from "../ChatInput/ChatInput";
import "./ChatWindow.css";

function ChatWindow({ messages, onSend, isTyping }) {
    const bottomRef = useRef(null);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
    const isEmpty = messages.length === 0;

    return (
        <main className="chat-window">
            <div className="messages-container">
                {isEmpty ? (
                    <div className="welcome-screen">
                        <div className="welcome-icon">
                            <Bot size={42} />
                            <span className="welcome-sparkle">
                                <Sparkles size={17} />
                            </span>
                        </div>

                        <p className="welcome-eyebrow">YOUR AI ASSISTANT</p>

                        <h1>
                            Hello, I'm <span>ERIC.</span>
                        </h1>

                        <p className="welcome-description">
                            Electronic Responsive Intelligence Chatbot.
                            Your intelligent workspace for conversations,
                            calculations, knowledge and exploration.
                        </p>

                        <div className="suggestion-grid">
                            <button onClick={() => onSend("Introduce yourself")}>
                                <span>01</span>
                                <strong>Meet ERIC</strong>
                                <small>Get to know your AI assistant</small>
                            </button>

                            <button onClick={() => onSend("What can you help me with?")}>
                                <span>02</span>
                                <strong>Explore capabilities</strong>
                                <small>Discover what ERIC can do</small>
                            </button>

                            <button onClick={() => onSend("Calculate 25 multiplied by 4")}>
                                <span>03</span>
                                <strong>Try a calculation</strong>
                                <small>Start with a simple calculation</small>
                            </button>

                            <button onClick={() => onSend("Tell me about artificial intelligence")}>
                                <span>04</span>
                                <strong>Explore AI</strong>
                                <small>Ask a question and explore</small>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="message-list">
                        {messages.map((message) => (
                            <MessageBubble key={message.id} message={message} />
                        ))}
                    </div>
                )}

                {isTyping && (
                    <div className="typing-indicator">
                        <div className="typing-avatar">
                            <Bot size={17} />
                        </div>
                        <span>ERIC is thinking</span>
                        <div className="typing-dots">
                            <i />
                            <i />
                            <i />
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            <div className="chat-input-area">
                <ChatInput onSend={onSend} disabled={isTyping} />
            </div>
        </main>
    );
}
export default ChatWindow;