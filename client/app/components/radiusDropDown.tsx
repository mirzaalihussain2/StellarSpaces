import React, {useState} from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {Button, Dropdown, Form, Input, Space} from 'antd';
import {selectRadiusState,setRadiusState} from "@/app/store/radiusSlice";
import {useDispatch, useSelector} from 'react-redux'






const RadiusDropDown: React.FC = ({setRadius}) => {

  
   
    
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button onClick={()=>{setRadius(1609.34)}}>1 mile</Button>
            ),
        },

        {
            key: '2',
            label: (
                <Button onClick={()=>{setRadius(8046.72)}}>5 miles</Button>
            ),
        },
        {
            key: '3',
            label: (
                <Button onClick={()=>{setRadius(16093.4)}}>10 miles</Button>
            ),
        },
        {
            key: '4',
            label: (
                <Button onClick={()=>{setRadius(32186.9)}}>20 miles</Button>
            ),

        },
        {
            key: '5',
            label: (
                <Button onClick={()=>{setRadius(48280.3)}}>30 miles</Button>
            ),
        },
        {
            key: '5',
            label: (
                <Button onClick={()=>{setRadius(64373.8)}}>40 miles</Button>
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
    
    
    return(
    <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                Choose radius
                <DownOutlined />
            </Space>
        </a>
    </Dropdown>
)};

export default RadiusDropDown;