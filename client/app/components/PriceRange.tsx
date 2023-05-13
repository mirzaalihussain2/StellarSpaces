import React, {useState} from 'react';
import {InputNumber, Slider} from 'antd';
import FormItem from "antd/es/form/FormItem";




const PriceRange: React.FC = ({setPriceMin,setPriceMax}) => {
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);

    const onChange = (value: [number, number]) => {
        console.log(value[0])
        setMinValue(value[0]);
        setMaxValue(value[1]);
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
            range
            min={0}
            max={3000}
            step={100}
            defaultValue={[minValue, maxValue]}
            onChange={onChange}
            onAfterChange={onAfterChange}
            tipFormatter={tipFormatter}
        />
        <FormItem label='Minimum'>
            <InputNumber value ={minValue}  style={{
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
            <InputNumber value = {maxValue}  style={{
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