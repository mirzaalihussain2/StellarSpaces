import {PlusOutlined} from '@ant-design/icons';
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
    Upload,
} from 'antd';
import React, {useEffect, useState} from 'react';
import {OptGroup} from "rc-select";


const {RangePicker} = DatePicker;
const {TextArea} = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddListingForm: React.FC = () => {
    const [postcodeValidation, SetPostcodeValidation] = useState(false)
    const [postcode, SetPostcode] = useState('')
    const [streetName, SetStreetName] = useState('')
    const [city, SetCity] = useState('')
    const [county, SetCounty] = useState('')
    const [flatOrHouseNumb,SetFlatOrHouseNumb] = useState(null)
    const [propertyType,SetPropertyType] =useState('')
    const [addressLine2,SetAddressLine2] =useState('')
    const [description,SetDescription] = useState('')
    const [petsAllowed,SetPetsAllowed] = useState(false)
    const [hasGarage,SetHasGarage] = useState(false)
    const [monthlyRent,SetMonthlyRent] = useState(null)
    const [bedroomNumb,SetBedroomNumb] =useState(null)
    const [bathroomNumb,SetBathroomNumb] =useState(null)
    const [images,SetImages] = useState([])
    const [youtubeURL,SetYoutubeURL] = useState('')
    
    
    const apiKey = 'AIzaSyAGpf3gwawGK3DfP6JwycdkT4G_okHONm4'

    async function handleSearchPostcode() {
        const address = await getAddress(postcode)
        console.log(address)
        if(address.length===0) return // if post code is not valid, then adress is an empty array, so we want to return here to stop any error
        if (address[0]['address_components'].length > 5 && address[0]['address_components'][5]['long_name'] === 'United Kingdom') {      // makes sure the post code is a valid UK post code
            SetStreetName(address[0]['address_components'][1]['long_name'])
            SetCity(address[0]['address_components'][2]['long_name'])
            SetCounty(address[0]['address_components'][3]['long_name'])
            SetPostcodeValidation(true)
        } else SetPostcodeValidation(false)
    }
    
    function onSave(){
        const Obj = {postcode,streetName,city,county,flatOrHouseNumb,propertyType,addressLine2,description,petsAllowed,hasGarage,monthlyRent,bedroomNumb,bathroomNumb,youtubeURL}
        
        console.log(Obj)
    }
    
    function handleNumberInput(value:Number|null,setter):void{
        if(value){
            setter(value) 
        }
        
    }
    function handleInputChange(e,setter) {
        e.preventDefault()
        setter(e.target.value)
        console.log(propertyType,'test')
        console.log(images)
        
    }
    
    function handlePropertySelect(value)
    {
        SetPropertyType(value)
    }
    
    function handleCheckbox(e,setter):void{
        console.log(e.target.checked)
        if(e.target.checked) setter(true)
        else setter(false)
    }
    
    function handleImageInput(newImage){
        if(newImage.file.status==='removed'){
            const newImages = images.filter((file) => file.uid != newImage.file.uid);
            SetImages(newImages);
        }
        else{
            SetImages(prevImages => [...prevImages, newImage.file]);
        }
  
        
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
                                    handleInputChange(e,SetPostcode);
                                    handleSearchPostcode();
                                }}/>
                            </Form.Item>
                            <Form.Item label="Flat or house number">
                                <h4 style={{position: 'absolute', marginLeft: '-10.5vw'}}>will be kept hidden</h4>
                                <Input value={flatOrHouseNumb} onChange={(e) => {
                                    handleInputChange(e,SetFlatOrHouseNumb)}} />
                            </Form.Item>
                            <Form.Item label="Street address ">
                                <Input value={streetName} onChange={(e) => {
                                    handleInputChange(e,SetStreetName)}}/>
                            </Form.Item>
                            <Form.Item label="Address line 2 (optional) ">
                                <Input value ={addressLine2} onChange={(e) => {
                                    handleInputChange(e,SetAddressLine2)}}/>
                            </Form.Item>
                            <Form.Item label="Town or city">
                                <Input value={city} onChange={(e) => {
                                    handleInputChange(e,SetCity)}}/>
                            </Form.Item>
                            <Form.Item label="County">
                                <Input value={county} onChange={(e) => {
                                    handleInputChange(e,SetCounty)}}/>
                            </Form.Item>
                            <h1>Property Details</h1>
                            <Form.Item label="Property type">
                                <Select onSelect={(value)=>{handlePropertySelect(value)}}>
                                    <OptGroup label='Single Occupancy'>
                                        <Select.Option value="studio flat">Studio Flat</Select.Option>
                                        <Select.Option value="bedsit">Bedsit</Select.Option>
                                    </OptGroup>
                                    <OptGroup label='House'>
                                        <Select.Option value="detached">Detached</Select.Option>
                                        <Select.Option value="demi-detached">Semi-Detached</Select.Option>
                                        <Select.Option value="terrace">Terrace</Select.Option>
                                        <Select.Option value="bungalow">Bungalow</Select.Option>
                                        <Select.Option value="end terrace">End Terrace</Select.Option>
                                    </OptGroup>

                                    <OptGroup label='Flat'>
                                        <Select.Option value="flat">Flat</Select.Option>
                                        <Select.Option value="penthouse">Penthouse</Select.Option>
                                        <Select.Option value="maisonette">Maisonette</Select.Option>
                                    </OptGroup>
                                    <OptGroup label='other types'>
                                        <Select.Option value="mobile home">Mobile Home</Select.Option>
                                        <Select.Option value="house boat">House Boat</Select.Option>
                                    </OptGroup>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Number of bedrooms">
                                <InputNumber value={bedroomNumb} onChange={(value)=>{handleNumberInput(value,SetBedroomNumb)}} />
                            </Form.Item>
                            <Form.Item label="Number of bathrooms">
                                <InputNumber value ={bathroomNumb} onChange={(value)=>{handleNumberInput(value,SetBathroomNumb)}}  />
                            </Form.Item>
                            <Form.Item label="Is there a garage?">
                                <Checkbox checked={hasGarage} onChange={(e)=>{handleCheckbox(e,SetHasGarage)}}/>
                            </Form.Item>
                            {/*<Form.Item label="Is there a garden?">*/}
                            {/*    <Checkbox/>*/}
                            {/*</Form.Item>*/}
                            <Form.Item label="Add description">
                                <TextArea value ={description} onChange={(e) => {
                                    handleInputChange(e,SetDescription)}} rows={4}/>
                            </Form.Item>
                            <Form.Item label="Upload Photos" valuePropName="fileList" getValueFromEvent={normFile}>
                                <Upload beforeUpload={() => false} onChange={(e)=>{handleImageInput(e)}}  listType="picture-card">
                                    <div>
                                        <PlusOutlined/>
                                        <div style={{marginTop: 8}}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item label="Youtube URL">
                                <Input value= {youtubeURL} onChange={(e) => {
                                    handleInputChange(e,SetYoutubeURL)}}/>
                            </Form.Item>
                            <h1>Tenancy Details</h1>
                            <Form.Item label="Monthly rent">
                                <InputNumber value={monthlyRent} onChange={(value)=>{handleNumberInput(value,SetMonthlyRent)}}/>
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
                                <Checkbox checked={petsAllowed} onChange={(e)=>{handleCheckbox(e,SetPetsAllowed)}}/>
                            </Form.Item>

                            <Form.Item>
                                <Button style={{margin: '1vw'}}>Discard</Button>
                                <Button onClick={onSave} style={{margin: '1vw'}}>Save as draft</Button>
                                <Button style={{margin: '1vw'}}>Save and preview</Button>
                            </Form.Item>

                        </>
                    ) : (
                        <Form.Item label="Enter Postcode" hasFeedback validateStatus={postcode ? "validating" : ""}>
                            <Input value={postcode}  onChange={(e) => {
                                handleInputChange(e,SetPostcode);
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