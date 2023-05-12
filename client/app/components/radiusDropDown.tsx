import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Button, Dropdown, Form, Input, Space} from 'antd';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Button>1 mile</Button>
        ),
    },
    
    {
        key: '2',
        label: (
            <Button>5 miles</Button>
        ),
    },
    {
        key: '3',
        label: (
            <Button>10 miles</Button>
        ),
    },
    {
        key: '4',
        label: (
            <Button>20 miles</Button>
        ),
        
    },
    {
        key: '5',
        label: (
            <Button>30 miles</Button>
        ),
    },
    {
        key: '5',
        label: (
            <Button>40 miles</Button>
        ),
    },
    {
        key: '6',
        label: (
            <Form.Item label="Custom radius">
                <Input />
            </Form.Item>
        ),
    }
    
];

const RadiusDropDown: React.FC = () => (
    <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                Choose radius
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
);

export default RadiusDropDown;