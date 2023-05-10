import {PlusOutlined} from '@ant-design/icons';
import {CSSTransition} from 'react-transition-group';
import axios from 'axios';

interface Address {
    formatted_address: string;
}

import {
    Button, Checkbox,
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
  
    const [postcodeValidation, setPostcodeValidation] = useState(false)
    const [postcode, SetPostcode] = useState('')
    const [streetName, SetStreetName] = useState('')
    const [city, setCity] = useState('')
    const [county, setCounty] = useState('')
    const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'


    async function handleSearchPostcode() {
       
        const address = await getAddress(postcode)
        console.log(address)
        if (address[0]['address_components'].length > 5 && address[0]['address_components'][5]['long_name'] === 'United Kingdom') {
            SetStreetName(address[0]['address_components'][1]['long_name'])
            setCity(address[0]['address_components'][2]['long_name'])
            setCounty(address[0]['address_components'][3]['long_name'])
            setPostcodeValidation(true)
        } else setPostcodeValidation(false)

    }

    function handleInputChange(e) {
        e.preventDefault()
        SetPostcode(e.target.value)
    }


    async function getAddress(postCode: string): Promise<string[]> {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${postCode}&key=${apiKey}`;
        try {
            const response = await axios.get(url);
            console.log(response.data.results)
            const address = response.data.results.map((result: Address) => result);

            return address
        } catch (error) {
            console.error(`Error getting addresses from postal code ${postCode}: ${error}`);
            return [];
        }
    }


    return (
        <>
            <h1>Where is your property located?</h1>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: '100vw'}}
            >

                {postcodeValidation ? (

                    <>
                        <Form.Item label="Enter Postcode" hasFeedback validateStatus="success">
                            <Input value={postcode} onChange={(e) => {
                                handleInputChange(e);
                                handleSearchPostcode();
                            }}/>
                        </Form.Item>
                        <Form.Item label="Flat or house number">
                            <h4 style={{position: 'absolute', marginLeft: '-10.5vw'}}>will be kept hidden</h4>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Street address ">
                            <Input value={streetName}/>
                        </Form.Item>
                        <Form.Item label="Address line 2 (optional) ">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Town or city">
                            <Input value={city}/>
                        </Form.Item>
                        <Form.Item label="County">
                            <Input value={county}/>
                        </Form.Item>
                        <h1>Property Details</h1>
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
                        <Form.Item label="Number of bedrooms">
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="Number of bathrooms">
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="Is there a garage?">
                            <Checkbox/>
                        </Form.Item>
                        {/*<Form.Item label="Is there a garden?">*/}
                        {/*    <Checkbox/>*/}
                        {/*</Form.Item>*/}
                        <Form.Item label="Add description">
                            <TextArea rows={4}/>
                        </Form.Item>
                        <Form.Item label="Upload Photos" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload action="/upload.do" listType="picture-card">
                                <div>
                                    <PlusOutlined/>
                                    <div style={{marginTop: 8}}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Youtube URL">
                            <Input/>
                        </Form.Item>
                        <h1>Tenancy Details</h1>
                        <Form.Item label="Monthly rent">
                            <InputNumber/>
                        </Form.Item>
                        {/*<Form.Item label="Earliest Movie In Date">*/}
                        {/*    <DatePicker/>*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label="Minimum Tenancy Length">*/}
                        {/*    <InputNumber/>*/}
                        {/*</Form.Item>*/}
                        {/*<Form.Item label="Maximum Number of Tenants">*/}
                        {/*    <InputNumber/>*/}
                        {/*</Form.Item>*/}
                        <Form.Item label="Are pets allowed?">
                            <Checkbox/>
                        </Form.Item>
                    
                    <Form.Item>
                        <Button style={{margin: '1vw'}}>Discard</Button>
                        <Button style={{margin: '1vw'}}>Save as draft</Button>
                        <Button style={{margin: '1vw'}}>Save and preview</Button>
                    </Form.Item>

                    </>
                ) : (
                    <Form.Item label="Enter Postcode" hasFeedback validateStatus="validating">
                        <Input onChange={(e) => {
                            handleInputChange(e);
                            handleSearchPostcode();
                        }}/>
                    </Form.Item>
                    
                )}
            </Form>

              
            
        </>
);
};

export default () =>
    <AddListingForm/>
;