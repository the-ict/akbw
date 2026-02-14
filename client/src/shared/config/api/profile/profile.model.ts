interface HelpMessage {
  id: number;
  chat_id: number;
  sender_id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface HelpChat {
  id: number;
  user_id: string;
  members: string[];
  messages: HelpMessage[];
  createdAt: string;
  updatedAt: string;
}

interface AskMessage {
  id: number;
  chat_id: number;
  sender_id: string;
  message: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
}

interface AskChat {
  id: number;
  user_id: string;
  members: string[];
  messages: AskMessage[];
  createdAt: string;
  updatedAt: string;
}

interface HelpChatRequest {
  receiver_id: string;
}

interface AskChatRequest {
  receiver_id: string;
}

interface AskChatMessageRequest {
  chat_id: number;
  message: string;
  photo?: string;
}

interface HelpChatMessageRequest {
  chat_id: number;
  message: string;
}

export type {
  HelpChatRequest,
  AskChatRequest,
  AskChatMessageRequest,
  HelpChatMessageRequest,
  HelpChat,
  HelpMessage,
  AskChat,
  AskMessage,
};
