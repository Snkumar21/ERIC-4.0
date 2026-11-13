
export const initialChats = [
    {
        id: "chat-1",
        title: "Welcome to ERIC",
        messages: [
            {
                id: "msg-1",
                role: "assistant",
                content: "Hello! I'm ERIC, your Electronic Responsive Intelligence Chatbot. I'm ready to assist you with conversations, calculations, learning and much more. What would you like to explore today?",
                timestamp: new Date().toISOString(),
            },
        ],
    },
];

export const getMockReply = (message) => {
    const text = message.toLowerCase().trim();

    if (/^(hi|hello|hey|hii)\b/.test(text)) {
        return "Hello! It's good to hear from you. How can I help you today?";
    }

    if (text.includes("your name") || text.includes("who are you")) {
        return "I'm ERIC — Electronic Responsive Intelligence Chatbot. I'm being developed to assist with conversations, calculations, research and knowledge-based tasks.";
    }

    if (text.includes("how are you")) {
        return "I'm functioning normally and ready to help! What would you like to work on?";
    }

    if (text.includes("time")) {
        return `The current time on this device is ${new Date().toLocaleTimeString()}.`;
    }

    if (text.includes("date")) {
        return `Today's date on this device is ${new Date().toLocaleDateString()}.`;
    }

    return `I received your message: "${message}". My intelligence engine is not connected yet. Once we develop Step 2, I'll be able to process your requests with proper AI logic.`;
};