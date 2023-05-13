import React, {useState} from 'react';
import {InputNumber, Slider} from 'antd';
import FormItem from "antd/es/form/FormItem";




const BathroomRange: React.FC = ({setBathroomMax,setBathroomMin}) => {
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

    const onChange = (value: [number, number]) => {
        setBathroomMin(value[0])
        setBathroomMax(value[1])
        setMinValue(value[0]);
        setMaxValue(value[1]);
    };

    const onAfterChange = (value: number | [number, number]) => {
        console.log('onAfterChange: ', value);
    };
 
    return (
        <>
            <Slider
                range
                min={0}
                max={10}
                step={1}
                defaultValue={[minValue, maxValue]}
                onChange={onChange}
                onAfterChange={onAfterChange}
              
            />
            <FormItem label ='Minimum'>
                <InputNumber value ={minValue} ></InputNumber>
            </FormItem>
            <FormItem label = 'Maximum'>
                <InputNumber value = {maxValue}></InputNumber>
            </FormItem>
        </>

    )}

export default BathroomRange;