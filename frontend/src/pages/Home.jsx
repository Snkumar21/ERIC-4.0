import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import { initialChats, getMockReply } from "../data/mockChats";
import "./Home.css";

function createNewChat() {
    return {
        id: crypto.randomUUID(),
        title: "New Conversation",
        messages: [],
    };
}

function Home() {
    const [chats, setChats] = useState(initialChats);
    const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const activeChat = chats.find((chat) => chat.id === activeChatId);
    const messages = activeChat?.messages || [];

    const handleNewChat = () => {
        const newChat = createNewChat();

        setChats((previous) => [newChat, ...previous]);
        setActiveChatId(newChat.id);
        setSidebarOpen(false);
    };

    const handleSelectChat = (chatId) => {
        setActiveChatId(chatId);
    };

    const handleDeleteChat = (chatId) => {
        const remainingChats = chats.filter((chat) => chat.id !== chatId);

        if (remainingChats.length === 0) {
            const newChat = createNewChat();
            setChats([newChat]);
            setActiveChatId(newChat.id);
            return;
        }

        setChats(remainingChats);

        if (activeChatId === chatId) {
            setActiveChatId(remainingChats[0].id);
        }
    };

    const handleSendMessage = (text) => {
        if (!activeChat || isTyping) return;

        const userMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
            timestamp: new Date().toISOString(),
        };

        setChats((previous) =>
            previous.map((chat) =>
                chat.id === activeChatId
                ? {
                    ...chat,
                    title:
                        chat.messages.length === 0
                        ? text.length > 32
                            ? `${text.slice(0, 32)}...`
                            : text
                        : chat.title,
                    messages: [...chat.messages, userMessage],
                }
                : chat
            )
        );

        setIsTyping(true);

        // Temporary simulated response.
        // This will be replaced by ERIC's intelligence engine in Step 2.
        setTimeout(() => {
            const assistantMessage = {
                id: crypto.randomUUID(),
                role: "assistant",
                content: getMockReply(text),
                timestamp: new Date().toISOString(),
            };

            setChats((previous) =>
                previous.map((chat) =>
                chat.id === activeChatId
                    ? {
                        ...chat,
                        messages: [...chat.messages, assistantMessage],
                    }
                    : chat
                )
            );

            setIsTyping(false);
        }, 900);
    };

    return (
        <div className="home-layout">
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
                onDeleteChat={handleDeleteChat}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <section className="main-panel">
                <Header
                    onMenuClick={() => setSidebarOpen((previous) => !previous)}
                    sidebarOpen={sidebarOpen}
                    chatTitle={activeChat?.title}
                />

                <ChatWindow
                    messages={messages}
                    onSend={handleSendMessage}
                    isTyping={isTyping}
                />
            </section>
        </div>
    );
}
export default Home;