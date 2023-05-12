import React, {useState} from 'react';
import {
    AppstoreOutlined,
    CiCircleOutlined,
    CloseCircleOutlined,
    MailOutlined,
    SettingOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Form, Input, Menu} from 'antd';

import RadiusDropDown from "@/app/components/radiusDropDown";
import PriceRange from "@/app/components/PriceRange"
import BedroomRange from "@/app/components/BedroomRange";
import BathroomRange from "@/app/components/BathroomRange";

const items: MenuProps['items'] = [
    {
        label: <Form.Item label="Location">
            <Input/>
             </Form.Item>,
        key: 'location'
    },
    {
        label: <RadiusDropDown></RadiusDropDown>,
        key: 'radius',
    },
    {
        label: 'Property Type',
        key: 'Property Type',
        children: [
            {
                type: 'group',
                label: 'Single Occupancy',
                children: [
                    {
                        label: 'Studio Flat',
                        key: 'SF',
                    },
                    {
                        label: 'Bedsit',
                        key: 'BD',
                    },
                ],
            },
            {
                type: 'group',
                label: 'House',
                children: [
                    {
                        label: 'Detached',
                        key: 'setting:3',
                    },
                    {
                        label: 'Semi-Detached',
                        key: 'SD',
                    },
                    {
                        label: 'Terrace',
                        key: 'TE',
                    },
                    {
                        label: 'Bungalow',
                        key: 'BG',
                    },
                    {
                        label: 'End Terrace',
                        key: 'ET',
                    },
                ],
            },
            {
                type: 'group',
                label: 'other',
                children: [
                    {
                        label: 'Mobile Home',
                        key: 'MH',
                    },
                    {
                        label: 'House Boat',
                        key: 'HB',
                    },
                ],
            },
        ],
    },
    {
        label: (
            <div style={{width:'15vw'}}>Monthly Rent
                <PriceRange styles={{height:'20vw'}}></PriceRange>
            </div>
            
        ),
        key: 'moneyrange',
    },
    {
        label: (
            <div style={{width:'15vw'}}> Number of bedrooms
               <BedroomRange></BedroomRange>
            </div>

        ),
        key: 'bedrange',
    },
    {
        label: (
            <div style={{width:'15vw'}}> Number of bathrooms
               <BathroomRange></BathroomRange>
            </div>

        ),
        key: 'bathrange',
    },
];

const PropertySearchFilter: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}/>;
};

export default PropertySearchFilter;