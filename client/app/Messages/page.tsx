'use client'
import React, { useState } from 'react';
import { chat, messageList } from './Chat';
import './page.css'
import chatBackground from '../../public/chat.png'

interface msgObj {
  "id": number,
  "content": string,
  "createdAt": string,
  "updatedAt": string,
  "chatId": number,
  "authorId": number,
}

interface ReceiverProps {
  message: msgObj;
}

const isChatOwner = () => {
  // get the current userId from localStorage
  const userId = localStorage.getItem('userId');
  // check if user is the owner of the listing
  if (userId == chat.landlordId.toString()) {
    return true;
  } else {
    return false;
  }
}

const isSender = () => {
  // get the current userId from localStorage
  const userId = localStorage.getItem('userId');
}

const Receiver: React.FC<ReceiverProps> = ({ message }) => {
  return <div className='receiver'>{message.content}</div>;
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<msgObj[]>(messageList);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    //setMessages([...messageList, inputValue]);
    setInputValue('');
  };


  const userId = localStorage.getItem('userId');
  console.log(messageList[0]);
  return (
      <div className='messages' style={{ backgroundImage: `url(${chatBackground})` }}>
        {messages.map((message, index) => (
          message.authorId === Number(userId) ?
            <div className='sender'>{message.content}</div>
            : <Receiver message={message} />
        ))}
      </div>
  );
};

export default Messages;
