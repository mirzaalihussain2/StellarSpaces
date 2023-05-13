import React, {useState} from 'react';

import type {MenuProps} from 'antd';
import {Button, Checkbox, Dropdown, Form, Input, Menu, Select} from 'antd';

import RadiusDropDown from "@/app/components/radiusDropDown";
import PriceRange from "@/app/components/PriceRange"
import BedroomRange from "@/app/components/BedroomRange";
import BathroomRange from "@/app/components/BathroomRange";
import {useDispatch} from 'react-redux'
import {setLocationState} from "@/app/store/locationSlice";
import {setRadiusState} from "@/app/store/radiusSlice";
import {setNumOfBathroomsMaxState} from "@/app/store/numOfBathroomsMaxSlice";
import {setNumOfBathroomsMinState} from "@/app/store/numOfBathroomsMinSlice";
import {setNumOfBedroomsMaxState} from "@/app/store/numOfBedroomsMaxSlice";
import {setNumOfBedroomsMinState} from "@/app/store/numOfBedroomsMinSlice";
import {setHasGarageState} from "@/app/store/hasGarageSlice";
import {setPetsAllowedState} from "@/app/store/petsAllowedSlice";
import {setPriceMaxState} from "@/app/store/priceMaxSlice";
import {setPriceMinState} from "@/app/store/priceMinSlice";
import {setStatusState} from "@/app/store/statusSlice";
import {setPropertyTypeState} from "@/app/store/propertyTypeSlice";
import fetchListings from "@/app/ApiServices/backend/FetchListings";
import {OptGroup} from "rc-select";
import {is} from "@react-spring/shared";
import FormItem from "antd/es/form/FormItem";

const PropertySearchFilter: React.FC = () => {

    const dispatch = useDispatch()
    const [location, setLocation] = useState('');
    const [radius, setRadius] = useState(null)
    const [propertyType, setPropertyType] = useState([])
    const [priceMin, setPriceMin] = useState(null)
    const [priceMax, setPriceMax] = useState(null)
    const [numOfBedroomsMin, setNumOfBedroomsMin] = useState(null)
    const [numOfBedroomsMax, setNumOfBedroomsMax] = useState(null)
    const [numOfBathroomsMin, setNumOfBathroomsMin] = useState(null)
    const [numOfBathroomsMax, setNumOfBathroomsMax] = useState(null)
    const [petsAllowed, setPetsAllowed] = useState(false)
    const [hasGarage, setHasGarage] = useState(false)
    const [status, setStatus] = useState([])
    const [featured, setFeatured] = useState(false)
    const [isAdvanced, setIsAdvanced] = useState(false)

    function handleFilterInput(e, setter) {
        setter(e.target.value)
    }


    function handlePropertyType(e, option) {
        if (option === 'select') setPropertyType(prevPropertyTypes => [...prevPropertyTypes, e]);
        else {
            const newTypes = propertyType.filter((type) => type != e);
            setPropertyType(newTypes);
        }
    }

    function handleCheckbox(e, setter): void {
        console.log(e.target.checked)
        if (e.target.checked) setter(true)
        else setter(false)
    }

    async function handleSearch() {

        const queryObject = {
            priceMin,
            priceMax,
            numOfBedroomsMin,
            numOfBedroomsMax,
            numOfBathroomsMin,
            numOfBathroomsMax,
            petsAllowed,
            hasGarage,
            status,
            propertyType,
            featured,
        }
        console.log(queryObject)
        const listings = await fetchListings(queryObject)
        console.log(listings)
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
                    <Form.Item style={{width: '8vw'}} label="Location">
                        <Input value={location} onChange={(e) => {
                            handleFilterInput(e, setLocation)
                        }}/>
                    </Form.Item>
                    <Button onClick={handleSearch}>Search</Button>
                </>
            ,
            key: 'location'
        },
        {
            label: <RadiusDropDown setRadius={setRadius}></RadiusDropDown>,
            key: 'radius',
        },
        {
            label: <Form.Item style={{width: '18vw'}} label="Property type">
                <Select mode="multiple" onDeselect={(e) => {
                    handlePropertyType(e, 'deselect')
                }} onSelect={(e) => {
                    handlePropertyType(e, 'select')
                }}>
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
            </Form.Item>,
            key: 'Property Type',
        },
        {
            label: (
                <div style={{width: '15vw'}}>Monthly Rent
                    <PriceRange setPriceMin={setPriceMin} setPriceMax={setPriceMax}></PriceRange>
                </div>

            ),
            key: 'moneyrange',
        },
        {
            label: (
                <div style={{width: '12vw'}}> Number of bedrooms
                    <BedroomRange setBedroomMax={setNumOfBedroomsMax}
                                  setBedroomMin={setNumOfBedroomsMin}></BedroomRange>
                </div>

            ),
            key: 'bedrange',
        },
        {
            label: (
                <div style={{width: '12vw'}}> Number of bathrooms
                    <BathroomRange setBathroomMax={setNumOfBathroomsMax}
                                   setBathroomMin={setNumOfBathroomsMin}></BathroomRange>
                </div>

            ),
            key: 'bathrange',
        },
        {
            label: (
                <Button onClick={() => {
                    if (!isAdvanced) setIsAdvanced(true)
                    else setIsAdvanced(false)

                }}>Advanced Filter</Button>
            ),
            key: 'Advanced',
        }
    ];


    return (
        <>
            <Menu mode="horizontal" items={items}></Menu>;

            {isAdvanced && (
                <div style={{
                    backgroundColor: 'white',
                    top: '44.5vw',
                    width: '85vw',
                    height: '17vw',
                    zIndex: '1000',
                    position: 'absolute',
                    display: 'flex'
                }}>

                    <FormItem style={{paddingRight: '1vw'}} label='Pets Allowed'>
                        <Checkbox onChange={(e) => handleCheckbox(e, setPetsAllowed)}></Checkbox>
                    </FormItem>
                    <FormItem style={{paddingRight: '1vw'}} label='Must have garage'>
                        <Checkbox onChange={(e) => handleCheckbox(e, setHasGarage)}></Checkbox>
                    </FormItem>
                    <FormItem style={{paddingRight: '1vw'}} label='Only show featured'>
                        <Checkbox onChange={(e) => handleCheckbox(e, setFeatured)}></Checkbox>
                    </FormItem>
                    <Form.Item style={{paddingRight: '1vw',width:'20vw'}} label="Property Status">
                        <Select onSelect={(e) => {
                            handleFilterInput(e,setStatus)
                        }}>
                            <Select.Option value="live">Live</Select.Option>
                            <Select.Option value="let">Let Agreed</Select.Option>
                            <Select.Option value="dorm">Dormant</Select.Option>
                        </Select>
                    </Form.Item>

                </div>
            )}
        </>)

};

export default PropertySearchFilter;