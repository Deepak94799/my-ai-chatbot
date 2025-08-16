import { gql } from '@apollo/client';

export const GET_CHATS = gql`
  query GetChats {
    chats(order_by: {created_at: desc}) {
      id
      title
    }
  }
`;

export const GET_MESSAGES = gql`
  subscription GetMessages($chatId: uuid!) {
    messages(where: {chat_id: {_eq: $chatId}}, order_by: {created_at: asc}) {
      id
      role
      content
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($userId: uuid!) {
    insert_chats_one(object: {user_id: $userId}) {
      id
    }
  }
`;

export const INSERT_USER_MESSAGE = gql`
  mutation InsertUserMessage($chatId: uuid!, $message: String!) {
    insert_messages_one(object: {chat_id: $chatId, content: $message, role: "user"}) {
      id
    }
  }
`;

export const SEND_MESSAGE_ACTION = gql`
  mutation SendMessage($chatId: uuid!, $message: String!) {
    sendMessage(chatId: $chatId, message: $message) {
      bot_response
    }
  }
`;