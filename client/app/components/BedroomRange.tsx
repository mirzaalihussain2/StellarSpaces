import React, {useState} from 'react';
import {InputNumber, Slider} from 'antd';
import FormItem from "antd/es/form/FormItem";




const BedroomRange: React.FC = ({bedroomMin,bedroomMax,setBedroomMax,setBedroomMin}) => {
   
    const onChange = (value: [number, number]) => {
        setBedroomMin(value[0])
        setBedroomMax(value[1])
    };

    const onAfterChange = (value: number | [number, number]) => {
        console.log('onAfterChange: ', value);
    };
   
    return (
        <>
            <Slider
                value={[bedroomMin,bedroomMax]}
                range
                min={0}
                max={10}
                step={1}
                defaultValue={[bedroomMin, bedroomMax]}
                onChange={onChange}
                onAfterChange={onAfterChange}
                
            />
            <FormItem label ="Minimum">
                <InputNumber onChange={(value)=>{{setBedroomMin(value)}}} value ={bedroomMin}></InputNumber>
            </FormItem>
            <FormItem label = 'Maximum'>
                <InputNumber onChange={(value)=>{{setBedroomMax(value)}}} value = {bedroomMax}></InputNumber>
            </FormItem>
        </>

    )}

export default BedroomRange;