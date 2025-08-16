import { useMutation, useQuery } from '@apollo/client';
import { useSignOut, useUserId } from '@nhost/react';
import React from 'react';
import { CREATE_CHAT, GET_CHATS } from '../graphql';
const ChatList = ({ setActiveChatId }: { setActiveChatId: (id: string) => void }) => {
  const { loading, error, data } = useQuery(GET_CHATS);
  const { signOut } = useSignOut();
  const userId = useUserId();
  const [createChat, { loading: creatingChat }] = useMutation(CREATE_CHAT, {
    refetchQueries: [{ query: GET_CHATS }],
  });

  const handleNewChat = async () => {
    const result = await createChat({ variables: { userId } });
    if (result.data) {
      setActiveChatId(result.data.insert_chats_one.id);
    }
  };

  return (
    <div style={{ width: '300px', padding: '10px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
      <button onClick={handleNewChat} disabled={creatingChat} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>+ New Chat</button>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflowY: 'auto', flex: 1 }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error!</p>}
        {data?.chats.map((chat: any) => (
          <li key={chat.id} onClick={() => setActiveChatId(chat.id)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #f0f0f0' }}>
            {chat.title}
          </li>
        ))}
      </ul>
      <button onClick={signOut} style={{ marginTop: 'auto', padding: '10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>Sign Out</button>
    </div>
  );
};

export default ChatList;