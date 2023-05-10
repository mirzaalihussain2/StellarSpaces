import {PlusOutlined} from '@ant-design/icons';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';

interface Address {
    formatted_address: string;
}

import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import React, {useEffect, useState} from 'react';
import {OptGroup} from "rc-select";
import event = google.maps.event;
import {formatResults} from "next/dist/lib/eslint/customFormatter";

const {RangePicker} = DatePicker;
const {TextArea} = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddListingForm: React.FC = () => {
    const [showSelectAddress, setShowSelectAddress] = useState(false)
    const [addresses, setAddresses] = useState([])
    const [postcode, SetPostcode] = useState('')
    const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'

    useEffect(() => {
        const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        document.head.appendChild(script);
    }, []);


    async function handleSearchPostcode() {
        setShowSelectAddress(true)
        const bounds = await getBoundsFromPostalCode(postcode)
        const addresses = await getAddressesFromBounds(bounds)
        console.log(addresses)
    }

    function handleInputChange(e) {
        SetPostcode(e.target.value)
    }

    async function getAddressesFromBounds(bounds) {
        console.log(bounds)
        const northEast = bounds[0].northeast
        const southWest = bounds[0].southwest
        console.log(northEast)
        console.log(southWest)
        const geocoder = new google.maps.Geocoder();
        const LatLngBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(northEast.lat, northEast.lng),
            new google.maps.LatLng(southWest.lat, southWest.lng)
        );
        console.log(LatLngBounds)
        const bounds1 = new google.maps.LatLngBounds(
            new google.maps.LatLng(40.712, -74.227), // southwest corner
            new google.maps.LatLng(40.774, -74.125) // northeast corner
        );

        await geocoder.geocode({'bounds': bounds1 }, (results, status) => {
            if (status === 'OK') {
                console.log(results)
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        })

    }

    async function getBoundsFromPostalCode(postalCode: string): Promise<string[]> {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            console.log(response.data.results)
            const bounds = response.data.results.map((result: Address) => result.geometry.bounds);
            console.log(bounds)
            return bounds;
        } catch (error) {
            console.error(`Error getting addresses from postal code ${postalCode}: ${error}`);
            return [];
        }
    }


    return (
        <>
            <h1>Property details</h1>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: '100vw'}}
            >
                <Form.Item label="Enter Postcode">
                    <Input onChange={handleInputChange}/>
                    <Button onClick={handleSearchPostcode}>Find Address</Button>
                </Form.Item>
                {showSelectAddress && (
                    <Form.Item label="Select address">
                        <Select>
                            {addresses.map((address, index) => (
                                <Select.Option key={index} value={address}>{address}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item label="Flat or house number">
                    <h4>this is kept hidden from listing</h4>
                    <Input/>
                </Form.Item>
                <Form.Item label="Address line 2 (optional) ">
                    <Input/>
                </Form.Item>
                <Form.Item label="Address line 3 (optional) ">
                    <Input/>
                </Form.Item>
                <Form.Item label="Town">
                    <Input/>
                </Form.Item>
                <Form.Item label="Property type">
                    <Select>
                        <OptGroup label='Single Occupancy'>
                            <Select.Option value="Studio Flat">Stuido Flat</Select.Option>
                            <Select.Option value="Bedsit">Bedsit</Select.Option>
                        </OptGroup>
                        <OptGroup label='House'>
                            <Select.Option value="Detached">Detached</Select.Option>
                            <Select.Option value="Semi-Detached">Semi-Detached</Select.Option>
                            <Select.Option value="Terrace">Terrace</Select.Option>
                            <Select.Option value="Bungalow">Bungalow</Select.Option>
                            <Select.Option value="End Terrace">End Terrace</Select.Option>
                        </OptGroup>
                        <OptGroup label='Flat'>
                            <Select.Option value="Flat">Flat</Select.Option>
                            <Select.Option value="Penthouse">Penthouse</Select.Option>
                            <Select.Option value="Maisonette">Maisonette</Select.Option>
                        </OptGroup>
                        <OptGroup label='Other types'>
                            <Select.Option value="Mobile home">Mobile Home</Select.Option>
                            <Select.Option value="House boat">House Boat</Select.Option>
                        </OptGroup>
                    </Select>
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="RangePicker">
                    <RangePicker/>
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Add description">
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            {title: 'Light', value: 'light', children: [{title: 'Bamboo', value: 'bamboo'}]},
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button style={{margin: '1vw'}}>Discard</Button>
                    <Button style={{margin: '1vw'}}>Save as draft</Button>
                    <Button style={{margin: '1vw'}}>Save and preview</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default () => <AddListingForm/>;