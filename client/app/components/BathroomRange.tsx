import React, {useState} from 'react';
import {InputNumber, Slider} from 'antd';
import FormItem from "antd/es/form/FormItem";




const BathroomRange: React.FC = ({bathroomMax,bathroomMin,setBathroomMax,setBathroomMin}) => {
    
    const onChange = (value: [number, number]) => {
        setBathroomMin(value[0])
        setBathroomMax(value[1])
     
    };

    const onAfterChange = (value: number | [number, number]) => {
        console.log('onAfterChange: ', value);
    };
 
    return (
        <>
            <Slider
                value ={[bathroomMin,bathroomMax]}
                range
                min={0}
                max={10}
                step={1}
                defaultValue={[bathroomMin, bathroomMax]}
                onChange={onChange}
                onAfterChange={onAfterChange}
              
            />
            <FormItem label ='Minimum'>
                <InputNumber onChange={(value)=>{{setBathroomMin(value)}}}  value ={bathroomMin} ></InputNumber>
            </FormItem>
            <FormItem label = 'Maximum'>
                <InputNumber onChange={(value)=>{{setBathroomMax(value)}}}  value = {bathroomMax}></InputNumber>
            </FormItem>
        </>

    )}

export default BathroomRange;