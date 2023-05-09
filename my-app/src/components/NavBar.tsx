import React, {useState} from 'react';
import {AppstoreOutlined, HomeOutlined, LoginOutlined,  SettingOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import { Menu} from 'antd';


const items: MenuProps['items'] = [
    {
        label: 'StellarHomes',
        key: 'HomeOutlined',
        icon: <HomeOutlined style={{fontSize:'3vw'}}  />,
    },

    {
        label: <h1 style= {{right:'-25vw',fontSize:'1vw',position:'absolute'}} >About</h1>,
        key: 'SubMenu',
        
        children: [
            {
                type: 'group',
                label: 'Item 1',
                children: [
                    {
                        label: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        label: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                label: 'Item 2',
                children: [
                    {
                        label: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        label: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        label: (
            <h1 style= {{right:'-16vw',fontSize:'1vw',position:'absolute'}} > 
                Help
            </h1>
        ),
        key: 'alipay',
    },
    {
        label:  <h1 style= {{right:'-8vw',fontSize:'1vw',position:'absolute'}}> Sign in</h1>,
        key: 'LoginOutlined',
       
    },
    {
        label: <h1 style={{right:0,fontSize:'1vw',position:'absolute'}} > Sign up</h1>,
        key: 'app',
        

    },
];

const NavBar: React.FC = () => {
    const [current, setCurrent] = useState('mail');


    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (

        < Menu  style={{display:'flex',justifyContent:'space-between', marginLeft:'2vw',fontSize:'2vw', height:'4vw',backgroundColor: 'white'}} onClick={onClick} selectedKeys={[current]} mode="horizontal"
               items={items}/>

    )

}

export default NavBar;