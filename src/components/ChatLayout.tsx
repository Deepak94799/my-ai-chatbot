import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatView from './ChatView';

const ChatLayout = () => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
      <ChatList setActiveChatId={setActiveChatId} />
      <div style={{ flex: 1, borderLeft: '1px solid #eee' }}>
        {activeChatId ? (
          <ChatView chatId={activeChatId} />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '200px', color: '#888' }}>
            <h2>Select a chat or create a new one to start</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;