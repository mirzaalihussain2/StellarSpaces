import React, {useState} from 'react';

import type {MenuProps} from 'antd';
import {Button, Dropdown, Form, Input, Menu} from 'antd';

import RadiusDropDown from "@/app/components/radiusDropDown";
import PriceRange from "@/app/components/PriceRange"
import BedroomRange from "@/app/components/BedroomRange";
import BathroomRange from "@/app/components/BathroomRange";
import {useDispatch} from 'react-redux'
import {setLocationState} from "@/app/store/locationSlice";
import {setRadiusState} from "@/app/store/radiusSlice";
import{setNumOfBathroomsMaxState} from "@/app/store/numOfBathroomsMaxSlice";
import {setNumOfBathroomsMinState} from "@/app/store/numOfBathroomsMinSlice";
import {setNumOfBedroomsMaxState} from "@/app/store/numOfBedroomsMaxSlice";
import{setNumOfBedroomsMinState} from "@/app/store/numOfBedroomsMinSlice";
import{setHasGarageState} from "@/app/store/hasGarageSlice";
import{setPetsAllowedState} from "@/app/store/petsAllowedSlice";
import{setPriceMaxState} from "@/app/store/priceMaxSlice";
import {setPriceMinState} from "@/app/store/priceMinSlice";
import {setStatusState} from "@/app/store/statusSlice";
import {setPropertyTypeState} from "@/app/store/propertyTypeSlice";

const PropertySearchFilter: React.FC = () => {
    
    const dispatch = useDispatch()
    const [location, setLocation] = useState('');
    const [radius,setRadius] = useState(null)
    const [propertyType,setPropertyType] =useState([])
    const [priceMin,setPriceMin] =useState(null)
    const [priceMax,setPriceMax] =useState(null)
    const [numOfBedroomsMin,setNumOfBedroomsMin] =useState(null)
    const [numOfBedroomsMax,setNumOfBedroomsMax] =useState(null)
    const [numOfBathroomsMin,setNumOfBathroomsMin] =useState(null)
    const [numOfBathroomsMax,setNumOfBathroomsMax] =useState(null)
    const [petsAllowed,setPetsAllowed] =useState(false)
    const [hasGarage,setHasGarage] = useState(false)
    const [status,setStatus]=useState([])
    
    function handleFilterInput(e,setter){
        setter(e.target.value)
    }

    
    function handleSearch(){
        
        const queryObject ={
            priceMin,
            priceMax,
            numOfBedroomsMin,
            numOfBedroomsMax,
            numOfBathroomsMin,
            numOfBathroomsMax,
            status,
            hasGarage,
            propertyType,
            petsAllowed,
            radius,
            location
        }
        console.log(queryObject)
        
        dispatch(setRadiusState(radius));
        dispatch(setLocationState(location))
        dispatch(setPriceMaxState(priceMax))
        dispatch(setPriceMinState(priceMin))
        dispatch(setStatusState(status))
        dispatch(setPetsAllowedState(petsAllowed))
        dispatch(setHasGarageState(hasGarage))
        dispatch(setNumOfBathroomsMinState(numOfBathroomsMin))
        dispatch(setNumOfBathroomsMaxState(numOfBathroomsMax))
        dispatch(setNumOfBedroomsMaxState(numOfBedroomsMax))
        dispatch(setNumOfBedroomsMinState(numOfBedroomsMin))
        dispatch(setPropertyTypeState(propertyType))
    }
    const items: MenuProps['items'] = [
        {
            label:
                <>
                    <Form.Item label="Location">
                        <Input value ={location} onChange={(e) => {
                            handleFilterInput(e,setLocation)}}/>
                    </Form.Item>
                    <Button onClick={handleSearch}>Search</Button>
                </>
            ,
            key: 'location'
        },
        {
            label: <RadiusDropDown setRadius = {setRadius}></RadiusDropDown>,
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
                    <PriceRange setPriceMin ={setPriceMin} setPriceMax ={setPriceMax} ></PriceRange>
                </div>

            ),
            key: 'moneyrange',
        },
        {
            label: (
                <div style={{width:'15vw'}}> Number of bedrooms
                    <BedroomRange setBedroomMax = {setNumOfBedroomsMax} setBedroomMin ={setNumOfBedroomsMin} ></BedroomRange>
                </div>

            ),
            key: 'bedrange',
        },
        {
            label: (
                <div style={{width:'15vw'}}> Number of bathrooms
                    <BathroomRange setBathroomMax = {setNumOfBathroomsMax} setBathroomMin = {setNumOfBathroomsMin}></BathroomRange>
                </div>

            ),
            key: 'bathrange',
        },
    ];


    

    return <Menu  mode="horizontal" items={items}/>;
};

export default PropertySearchFilter;