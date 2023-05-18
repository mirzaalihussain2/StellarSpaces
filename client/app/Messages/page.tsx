'use client'
import React, { useState } from 'react';
import { chat, messageList } from './Chat';
import { chat2, messageList2 } from './Chat2';
import './page.css'
import chatBackground from '../../public/chat.png'
//import ChatSideBar from './ChatSideBar';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { Button, Input, Select, Space } from 'antd';
import type { MenuProps, MenuTheme } from 'antd/es/menu';
import Link from 'next/link';

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

/////////////
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  onClick?: () => void,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}

const handleClick = () => {
  // Function logic to execute when User 3 is selected
  console.log('User 3 selected');
};


const items: MenuItem[] = [
  getItem('User 1', '1'),
  getItem('User 2', '2'),
  getItem('User 3', '3'),
  getItem('User 4', '4'),
  getItem('User 5', '5'),

];

const ChatSideBar: React.FC<{ mode: 'vertical' | 'inline' }> = ({ mode }) => {

  return (
    <Menu
      // style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode={mode}
      theme={'dark'}
      items={items}
    />
  );
};
///////////////////////

const Messages: React.FC = () => {
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [messages, setMessages] = useState<msgObj[]>(messageList);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    
    //setMessages([...messageList, inputValue]);
    console.log('Input value:', inputValue);

    setInputValue('');
  };


  const userId = localStorage.getItem('userId');
  console.log(messageList[0]);
  return (
    <Layout>
      <Sider>
        {/* <ChatSideBar mode={mode} /> */}
        <Button className='userButton' type="primary" onClick={handleClick} >User 3</Button>
        <Button className='userButton' type="primary" onClick={handleClick} >User 4</Button>
      </Sider>
      <Layout>
        <Content>
          <div className='chatApp'>
            <div className='messages' style={{ backgroundImage: `url(${chatBackground})` }}>
              {messages.map((message, index) => (
                message.authorId === Number(userId) ?
                  <div className='sender'>{message.content}</div>
                  : <Receiver message={message} />
              ))}
            </div>
          </div>
        </Content>
        <Footer>
          <Space.Compact style={{ width: '100%' }}>
            <Input
              defaultValue="Combine input and button"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button type="primary" onClick={handleSendMessage}>
              Submit
            </Button>
          </Space.Compact>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Messages;
