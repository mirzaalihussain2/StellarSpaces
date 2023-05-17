import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined, HomeOutlined, MessageOutlined,
    PieChartOutlined, SettingOutlined, StarOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import UserListings from "@/app/components/UserListings";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
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
    
    getItem('Profile Details', '1', <UserOutlined />),
    getItem('Messages', '2', <MessageOutlined />),
    getItem('My Listings', '3', <HomeOutlined />),
    getItem('Favourites', '4', <StarOutlined />),
    getItem('Account Settings', '5', <SettingOutlined />),
    
];

const AccountSideNavigation: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('1');
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleMenuClick = (item: MenuItem) => {
        setActiveMenuItem(item.key);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={[activeMenuItem]}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout>
                {activeMenuItem === '3' && <UserListings />} {/* Render UserListings only when activeMenuItem is '3' */}
                {}
            </Layout>
        </Layout>
    );

};

export default AccountSideNavigation;