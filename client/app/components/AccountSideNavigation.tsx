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
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (<>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <UserListings>fdf</UserListings>
               
            </Layout>
            <UserListings></UserListings>
        </Layout>
    
    <UserListings></UserListings>
        </>
    );
};

export default AccountSideNavigation;