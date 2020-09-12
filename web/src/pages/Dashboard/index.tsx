import React, { useState, useCallback, KeyboardEventHandler } from 'react';

import { MdSend, MdClose } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';
import { BiChat } from 'react-icons/bi';

import {
  OpenChatButton,
  ChatHeader, Container, ChatContainer, ChatArea, ChatActions,
} from './styles';
import api from '../../services/api';

interface Message {
  id: string;
  question: string;
  answer: string;
}

const Dashborad: React.FC = () => {
  const [toggleChat, setToggleChat] = useState(false);
  const [inputQuestion, setInputQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleToggleChat = useCallback(() => {
    setToggleChat((state) => !state);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (inputQuestion === '') {
      return;
    }

    try {
      const response = await api.post<Message>('chat/ask', {
        question: inputQuestion,
      });

      const messageList = messages;

      messageList.push(response.data);

      setMessages(messageList);
      setInputQuestion('');
    } catch (err) {
      setInputQuestion('');
    }
  }, [inputQuestion, messages]);

  return (
    <Container>
      {toggleChat ? (
        <ChatContainer>
          <ChatHeader>
            <FaRobot size={40} />
            <div>
              <strong>ChatBot</strong>
              <p>Online</p>

            </div>

            <button type="button" onClick={handleToggleChat}>
              <MdClose size={30} />
            </button>
          </ChatHeader>

          <ChatArea>

            {messages?.map((message) => (
              <>
                <p key={message.id}>{message.question}</p>
                <p key={message.id}>{message.answer}</p>
              </>
            ))}

          </ChatArea>
          <ChatActions>
            <input type="text" placeholder="Digite sua pergunta" onChange={(e) => setInputQuestion(e.target.value)} value={inputQuestion} />
            <button type="button" onClick={handleSubmit}>
              <MdSend size={24} />
            </button>
          </ChatActions>
        </ChatContainer>
      ) : (
        <OpenChatButton type="button" onClick={handleToggleChat}>
          <BiChat size={40} />
        </OpenChatButton>
      )}

    </Container>
  );
};

export default Dashborad;
