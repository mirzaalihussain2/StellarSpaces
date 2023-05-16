import React, {useEffect, useState} from 'react';

import type {MenuProps} from 'antd';
import {Button, Checkbox, Dropdown, Form, Input, Menu, Select} from 'antd';


import PriceRange from "@/app/components/PriceRange"
import BedroomRange from "@/app/components/BedroomRange";
import BathroomRange from "@/app/components/BathroomRange";
import {useDispatch, useSelector} from 'react-redux'
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
import {setPropertyListState} from "@/app/store/propertyListSlice";
import fetchListings from "@/app/ApiServices/backend/FetchListings";
import {OptGroup} from "rc-select";
import FormItem from "antd/es/form/FormItem";


const PropertySearchFilter: React.FC = () => {
    
    const Storelocation = useSelector(state => state.location.locationState)
    const StoreRadius =  useSelector(state => state.radius.radiusState)
    const dispatch = useDispatch()
    const [location, setLocation] = useState(Storelocation);
    const [radius, setRadius] = useState(StoreRadius === 1609.34 ? '1609.34' : '16093.4');
    const [propertyType, setPropertyType] = useState([])
    const [priceMin, setPriceMin] = useState(null)
    const [priceMax, setPriceMax] = useState(null)
    const [numOfBedroomsMin, setNumOfBedroomsMin] = useState(null)
    const [numOfBedroomsMax, setNumOfBedroomsMax] = useState(null)
    const [numOfBathroomsMin, setNumOfBathroomsMin] = useState(null)
    const [numOfBathroomsMax, setNumOfBathroomsMax] = useState(null)
    const [petsAllowed, setPetsAllowed] = useState(0)
    const [hasGarage, setHasGarage] = useState(0)
    const [status, setStatus] = useState([])
    const [isAdvanced, setIsAdvanced] = useState(false)
    const [isCustom, setIsCustom] = useState(false)
    

    useEffect(() => {
        
        setRadius(StoreRadius === 1609.34 ? '1609.34' : '16093.4')
        if(StoreRadius){
            console.log(StoreRadius)
            console.log(radius)
        async function fetchData() {
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
                location,
                radius:JSON.stringify(StoreRadius)
            }
            const listings = await fetchListings(queryObject)
            dispatch(setPropertyListState(listings))
            dispatch(setHasGarageState(hasGarage))
            dispatch(setLocationState(location))
           // dispatch(setRadiusState(radius))
            dispatch(setPropertyTypeState(propertyType))
            dispatch(setPetsAllowedState(petsAllowed))
            dispatch(setNumOfBedroomsMaxState(numOfBedroomsMax))
            dispatch(setNumOfBedroomsMinState(numOfBedroomsMin))
            dispatch(setNumOfBathroomsMaxState(numOfBathroomsMax))
            dispatch(setNumOfBathroomsMinState(numOfBathroomsMin))
            dispatch(setStatusState(status))
            dispatch(setPriceMinState(priceMin))
            dispatch(setPriceMaxState(priceMax))
        }
        fetchData()}
        
    },[StoreRadius] ) // this occurs agan when the Store radius is updated, since this page is rendered before the map is initalized and the radius is determined in the map page

    function filterByRadius() {
        
        let newListings = []
        for (let listing of listings) {
            const latLng = new google.maps.LatLng(listing.addressLatitude, listing.addressLongitude);
            const distance = google.maps.geometry.spherical.computeDistanceBetween(center, latLng)
            
            if (distance <= radius) newListings.push(listing)
        }

    }
    
    function handleFilterInput(e, setter) {
        if (setter === setRadius) setter(e.target.value * 1609.34)
        else {
            setter(e.target.value)
        }

    }

    function handleRadius(e) {
        if (e === 'custom') setIsCustom(true)
        else {
            setIsCustom(false)
            setRadius(e)
        }
    }

    function handleMultiple(e, state, setter, option) {
        if (option === 'select') setter((prev => [...prev, e]));
        else {
            const newInputs = state.filter((type) => type != e);
            setter(newInputs);
        }
    }

    function handleReset() {

        setPropertyType([])
        setPriceMax(null);
        setPriceMin(null)
        setNumOfBathroomsMax(null)
        setNumOfBedroomsMin(null)
        setNumOfBedroomsMax(null)
        setNumOfBathroomsMin(null)
        setPetsAllowed(0)
        setHasGarage(0)
        setStatus([])
    }


    function handleCheckbox(e, setter): void {
        console.log(e.target.checked)
        if (e.target.checked) setter(1)
        else setter(0)
    }

    async function handleSearch() {
    console.log(radius)
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
            location,
            radius
        }
        console.log(queryObject)
        const listings = await fetchListings(queryObject)
        console.log(listings)
        dispatch(setPropertyListState(listings))
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
                    <Form.Item
                        labelCol={{span: 24}}
                        style={{width: '8vw'}} label="Location:">
                        <Input value={location} onChange={(e) => {
                            handleFilterInput(e, setLocation)
                        }}/>
                    </Form.Item>
                    <div style={{paddingTop: '8vw'}}>
                        <Button className={'button'} style={{backgroundColor: 'lightblue', zIndex: '20'}}
                                onClick={handleSearch}>Search</Button>
                        <Button className={'button'} style={{
                            position: 'absolute',
                            zIndex: '20',
                            marginTop: '0.5vw',
                            left: '7vw',
                            backgroundColor: '#ffcccb'
                        }} onClick={handleReset}>Reset
                            Filters</Button>
                        <Button className={'button'}
                                style={{position: 'absolute', zIndex: '20', marginTop: '0.5vw', left: '15.5vw'}}
                                onClick={() => {

                                    if (!isAdvanced) setIsAdvanced(true)
                                    else setIsAdvanced(false)
                                }}>Advanced Filter</Button>
                    </div>
                </>
            ,
            key: 'location'
        },
        {
            label:
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Form.Item
                        labelCol={{span: 24}}
                        style={{width: '13vw'}} label="Radius:">
                        <Select value={radius as any} onSelect={(e) => {
                            handleRadius(e)
                        }}>
                            <Select.Option value="1609.34">1 mile</Select.Option>
                            <Select.Option value="8046.72">5 miles</Select.Option>
                            <Select.Option value="16093.4">10 miles</Select.Option>
                            <Select.Option value="32186.9">20 miles</Select.Option>
                            <Select.Option value="48280.3">30 miles</Select.Option>
                            <Select.Option value="64373.8">40 miles</Select.Option>
                            <Select.Option value="custom">Custom Radius</Select.Option>
                        </Select>
                    </Form.Item>
                    {isCustom && (
                        <FormItem style={{width: "13vw"}} label={'Custom Radius (miles)'}>
                            <span>
                                  <Input
                                      onChange={(e) => {
                                          handleFilterInput((e), setRadius)
                                      }}></Input>
                            </span>
                        </FormItem>
                    )}
                </div>,
            key: 'radius',
        },
        {
            label: <Form.Item labelCol={{span: 24}} style={{width: '15vw'}} label="Property type">
                <Select value={propertyType as null} mode="multiple" onDeselect={(e) => {
                    handleMultiple(e, propertyType, setPropertyType, 'deselect')
                }} onSelect={(e) => {
                    handleMultiple(e, propertyType, setPropertyType, 'select')
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
                    <PriceRange priceMin={priceMin} priceMax={priceMax} setPriceMin={setPriceMin}
                                setPriceMax={setPriceMax}></PriceRange>
                </div>

            ),
            key: 'moneyrange',
        },
        {
            label: (
                <div style={{width: '12vw'}}> Number of bedrooms
                    <BedroomRange bedroomMax={numOfBedroomsMax} bedroomMin={numOfBedroomsMin}
                                  setBedroomMax={setNumOfBedroomsMax}
                                  setBedroomMin={setNumOfBedroomsMin}></BedroomRange>
                </div>

            ),
            key: 'bedrange',
        },
        {
            label: (
                <div style={{width: '12vw'}}> Number of bathrooms
                    <BathroomRange bathroomMax={numOfBathroomsMax} bathroomMin={numOfBathroomsMin}
                                   setBathroomMax={setNumOfBathroomsMax}
                                   setBathroomMin={setNumOfBathroomsMin}></BathroomRange>
                </div>

            ),
            key: 'bathrange',
        },

    ];


    return (
        <>
            <Menu mode="horizontal" items={items}></Menu>;

            {isAdvanced && (
                <div style={{
                    backgroundColor: 'white',
                    top: '44.5vw',
                    width: '90vw',
                    height: '17vw',
                    zIndex: '10',
                    position: 'absolute',
                    display: 'flex'
                }}>

                    <FormItem labelCol={{span: 24}} style={{paddingRight: '1vw'}} label='Pets Allowed'>
                        <Checkbox checked={!!petsAllowed} onChange={(e) => handleCheckbox(e, setPetsAllowed)}></Checkbox>
                    </FormItem>
                    <FormItem labelCol={{span: 24}} style={{paddingRight: '1vw'}} label='Must have garage'>
                        <Checkbox checked={!!hasGarage} onChange={(e) => handleCheckbox(e, setHasGarage)}></Checkbox>
                    </FormItem>
                    <Form.Item labelCol={{span: 24}} style={{paddingRight: '1vw', width: '20vw'}}
                               label="Property Status">
                        <Select value={status as null} mode="multiple" onDeselect={(e) => {
                            handleMultiple(e, status, setStatus, 'deselect')
                        }} onSelect={(e) => {
                            handleMultiple(e, status, setStatus, 'select')
                        }}>
                            <Select.Option value="live">Live</Select.Option>
                            <Select.Option value="let agreed">Let Agreed</Select.Option>
                            <Select.Option value="dormant">Dormant</Select.Option>
                        </Select>
                    </Form.Item>

                </div>
            )}
        </>)

};

export default PropertySearchFilter;