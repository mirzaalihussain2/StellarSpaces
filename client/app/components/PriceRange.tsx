import React, {useState} from 'react';
import {InputNumber, Slider} from 'antd';
import FormItem from "antd/es/form/FormItem";




const PriceRange: React.FC = ({priceMin,priceMax,setPriceMin,setPriceMax}) => {
   
    const onChange = (value: [number, number]) => {
        setPriceMin(value[0]);
        setPriceMax(value[1]);
    };
    
    const onAfterChange = (value: number | [number, number]) => {
        console.log('onAfterChange: ', value);
    };
    const tipFormatter = (value: number) => `£${value}`;
return (
    <>
        <Slider
            value={[priceMin,priceMax]}
            range
            min={0}
            max={3000}
            step={100}
            defaultValue={[priceMin,priceMax]}
            onChange={onChange}
            onAfterChange={onAfterChange}
            tipFormatter={tipFormatter}
        />
        <FormItem label='Minimum'>
            <InputNumber  onChange={(value)=>{{setPriceMin(value)}}} value ={priceMin}  style={{
                position: 'relative',
                paddingLeft: '24px',
            }}
                         addonBefore={<span style={{
                             position: 'absolute',
                             top: '50%',
                             left: '8px',
                             transform: 'translateY(-50%)',
                         }}>£</span>}></InputNumber>
        </FormItem>
        <FormItem label ="Maximum">
            <InputNumber onChange={(value)=>{{setPriceMax(value)}}} value = {priceMax}  style={{
                position: 'relative',
                paddingLeft: '24px',
            }}
                         addonBefore={<span style={{
                             position: 'absolute',
                             top: '50%',
                             left: '8px',
                             transform: 'translateY(-50%)',
                         }}>£</span>}></InputNumber>
        </FormItem>
    </>
    
)}

export default PriceRange;