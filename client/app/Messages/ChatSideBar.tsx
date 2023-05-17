'use client'
// import './ChatSideBar.css'
import React, { useState } from 'react';
import {
    AppstoreOutlined,
    CalendarOutlined,
    LinkOutlined,
    MailOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Divider, Menu, Switch } from 'antd';
import type { MenuProps, MenuTheme } from 'antd/es/menu';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('User 1', '1'),
    getItem('User 2', '2'),
    getItem('User 3', '3'),
    getItem('User 4', '4'),
    getItem('User 5', '5'),

];

const ChatSideBar: React.FC = () => {
    const [mode, setMode] = useState<'vertical' | 'inline'>('inline');


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

export default ChatSideBar