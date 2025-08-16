import { useMutation, useSubscription } from '@apollo/client';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { GET_MESSAGES, INSERT_USER_MESSAGE, SEND_MESSAGE_ACTION } from '../graphql';

const ChatView = ({ chatId }: { chatId: string }) => {
  const [input, setInput] = useState('');
  const { data, loading, error } = useSubscription(GET_MESSAGES, { variables: { chatId } });
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const [insertUserMessage] = useMutation(INSERT_USER_MESSAGE);
  const [sendMessageAction, { loading: actionLoading }] = useMutation(SEND_MESSAGE_ACTION);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [data]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || actionLoading) return;

    const messageContent = input;
    setInput('');

    try {
      await insertUserMessage({ variables: { chatId, message: messageContent } });
      await sendMessageAction({ variables: { chatId, message: messageContent } });
    } catch (err) {
      toast.error('Failed to send message.');
      setInput(messageContent);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {loading && <p>Loading messages...</p>}
        {error && <p>Error: {error.message}</p>}
        {data?.messages.map((msg: any) => (
          <div key={msg.id} style={{ marginBottom: '10px', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '70%', padding: '10px 15px', borderRadius: '15px', background: msg.role === 'user' ? '#007bff' : '#e9ecef', color: msg.role === 'user' ? 'white' : 'black' }}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} style={{ padding: '10px', borderTop: '1px solid #ccc', display: 'flex' }}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={actionLoading} placeholder="Type a message..." style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button type="submit" disabled={actionLoading} style={{ marginLeft: '10px', padding: '10px 15px', borderRadius: '5px', border: 'none', background: '#007bff', color: 'white' }}>
          {actionLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatView;