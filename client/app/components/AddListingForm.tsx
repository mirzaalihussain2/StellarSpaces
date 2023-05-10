import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import React, {useState} from 'react';

const {RangePicker} = DatePicker;
const {TextArea} = Input;

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddListingForm: React.FC = () => {
    return (
        <>
            <h1>Property details</h1>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                style={{maxWidth: '100vw'}}
            >
                <Form.Item label="What are you listing?">
                    <Radio.Group>
                        <Radio value="apple">Whole property</Radio>
                        <Radio value="pear">Room only</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Enter Postcode">
                    <Input/>
                </Form.Item>
                <Form.Item label="Select address">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Flat or house number">
                    <h4>this is kept hidden from listing</h4>
                    <Input/>
                </Form.Item>
                <Form.Item label="Address line 2 (optional) ">
                    <Input/>
                </Form.Item>
                <Form.Item label="Address line 3 (optional) ">
                    <Input/>
                </Form.Item>
                <Form.Item label="Town">
                    <Input/>
                </Form.Item>
                <Form.Item label="Property type">
                    <Select>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option >Demo</Select.Option>
                        <h1>House</h1>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="demo">Demo</Select.Option>
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                   
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker/>
                </Form.Item>
                <Form.Item label="RangePicker">
                    <RangePicker/>
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber/>
                </Form.Item>
                <Form.Item label="Add description">
                    <TextArea rows={4}/>
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch/>
                </Form.Item>
                <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                        ]}
                    />
                </Form.Item>
                <Form.Item >
                    <Button style={{margin:'1vw'}}>Discard</Button>
                    <Button style={{margin:'1vw'}}>Save as draft</Button>
                    <Button style={{margin:'1vw'}}>Save and preview</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default () => <AddListingForm/>;