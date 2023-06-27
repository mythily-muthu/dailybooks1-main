
import React, { useState } from 'react'
import { Divider, Input, Select, Tabs } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const Settings = () => {
    //diff value for each state
    const [select1Value, setSelect1Value] = useState('');
    const [select2Value, setSelect2Value] = useState('');
    const [select3Value, setSelect3Value] = useState('');
    //for individual designing of tabs tabpane used
    const { TabPane } = Tabs;
    const { Option } = Select;
    const options = [
        { value: '1', label: 'Demo' }

    ];
    // clicked send test mail button
    const handleSendTestMail = () => {
        // Logic for sending test mail
        console.log('Sending test mail...');
    };
    const handleSelectChange = (value) => {
        console.log('Selected value:', value);
    };
    const handleSelect1Change = (value) => {
        setSelect1Value(value);
    };

    const handleSelect2Change = (value) => {
        setSelect2Value(value);
    };
    const handleSelect3Change = (value) => {
        setSelect3Value(value);
    };


    const onChange = (activeKey) => {
        console.log(activeKey); // Handle tab change event if needed
    };
    const options1 = [
        { value: '1', label: '$100' },
        { value: '2', label: '$100.00' }

    ];

    const options2 = [
        { value: '1', label: '$100(left)' },
        { value: '2', label: '$100(right)' }
    ];
    const options3 = [
        { value: '1', label: '$1.000,00' },
        { value: '2', label: '$1.000,00' }
    ];

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    const RequiredInput = ({ label }) => {
        return (
            <div className="w-full gap-y-2 flex flex-col">
                <div className="flex">
                    <span style={{ color: 'red', marginRight: '4px' }}>*</span>
                    <span className='text-sm'>{label}</span>
                </div>
                <div className="w-full">
                    <Input className="rounded-sm" />
                </div>
            </div>
        );
    };

    return (
        <div className='w-full p-5 h-full'>
            <Tabs defaultActiveKey="1" onChange={onChange} className=''>
                {/* general settings */}
                <TabPane tab={<p className='font-bold hover:bg-slate-100 hover:text-"#45a64" p-2 rounded-full text-base text-"#45a64"'>General Settings</p>} key="1" className="w-full gap-4 flex">
                    {/* left */}
                    <div className='w-full md:w-8/12 shadow-md hover:shadow-md px-3'>
                        <p className="flex items-start  text-primary text-base font-bold w-full">Update Settings</p>
                        <Divider className='border-gray-200' />
                        {/* uploads */}
                        <div className='flex w-full justify-between items-center'>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </div>
                        {/* antform left*/}
                        <div className='pt-8 flex flex-col gap-y-6 pb-8 '>
                            <div className='w-full flex flex-col gap-y-2'>
                                <div className="flex">
                                    <span className='text-red-600 mr-1'>*</span>
                                    <span className='text-sm'>Mail Protocol</span>
                                </div>
                                <Select defaultValue="" onChange={handleSelectChange}>
                                    {options.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </div>

                            <RequiredInput label="Mail Title" />
                            <RequiredInput label="Mail Title" />
                            <RequiredInput label="Mail host" />
                            <RequiredInput label="Mail port" />
                            <div className='w-full flex flex-col gap-y-2'>
                                <div className="flex">
                                    <span className='text-red-600 mr-1'>*</span>
                                    <span className='text-sm'>Mail Encryption</span>
                                </div>
                                <Select defaultValue="" onChange={handleSelectChange}>
                                    {options.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                                <p className='text-primary text-sm font-bold'>'SSL' is used for port 465/25, 'TLS' is used for port 587</p>
                            </div>
                            <RequiredInput label="Mail Username" />
                            <RequiredInput label="Mail password" />

                            <div className='flex'>
                                <button type="primary" className='bg-gray-100  border-gray-200 hover:bg-white px-4 py-1 border hover:border-blue-500  hover:text-blue-500 rounded-full text-black' onClick={handleSendTestMail}>
                                    Send Test Mail
                                </button>
                            </div>

                        </div>

                    </div>
                    {/* right */}
                    <div className='w-full md:w-4/12 flex flex-col '>
                        <p className="flex items-start  text-primary text-base font-bold w-full ">Price Settings</p>
                        <Divider className='border-gray-200' />
                        {/* antform */}
                        <div className='flex flex-col w-full gap-y-10'>


                            <div className='flex flex-col w-full gap-y-6 shadow-md hover:shadow-md p-3 pb-8'>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>

                                    <Select defaultValue="" onChange={handleSelect1Change}>
                                        {options1.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelect2Change}>
                                        {options2.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelect1Change}>
                                        {options1.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelect3Change}>
                                        {options3.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className='flex flex-col w-full gap-y-6 shadow-md hover:shadow-md p-3 pb-8'>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelect3Change}>
                                        {options3.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                            </div>
                            <div className='flex flex-col w-full gap-y-6 shadow-md hover:shadow-md p-3 pb-8'>

                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelect3Change}>
                                        {options3.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>


                    </div>

                </TabPane>
                {/* email settings */}
                <TabPane tab={<p className='font-bold hover:bg-slate-100 hover:text-"#45a64" p-2 rounded-full text-base text-"#45a64"'>Email Settings</p>} key="2" className="w-full gap-4 flex">

                    {/* left */}
                    <div className='w-full md:w-8/12 shadow-md hover:shadow-md px-3'>
                        <p className="flex items-start  text-primary text-base font-bold w-full">Update Settings</p>
                        <Divider className='border-gray-200' />
                        {/* texts */}
                        <div className='flex flex-col w-full p-5 border-l-8 border-border-gray rounded-lg '>
                            <p className='text-primary text-base font-bold'>Gmail Setup</p>
                            <p className='text-primary text-sm font-bold'>Gmail host: smtp.gmail.com</p>
                            <p className='text-primary text-sm font-bold'>Gmail port: 465</p>
                            <p className='text-text-green py-3 text-sm font-bold'>If you are using gmail smtp please make sure you have set below settings before sending mail</p>
                            <p className='text-primary text-sm font-semibold'>Two factor authentication off</p>
                            <p className='text-primary text-sm py-3 font-semibold'>Less secure app on</p>

                        </div>
                        {/* antform */}
                        <div className='pt-8 flex flex-col gap-y-6 '>

                            <RequiredInput label="Mail Title" />
                            <RequiredInput label="Mail Title" />
                            <RequiredInput label="Mail host" />
                            <RequiredInput label="Mail port" />
                            <RequiredInput label="Mail username" />
                            <RequiredInput label="Mail password" />
                            <RequiredInput label="Mail password" />
                            <RequiredInput label="Mail password" />

                        </div>
                        <div className='flex py-5'>
                            <button type="primary" className='bg-gray-100  border-gray-200 hover:bg-white px-4 py-1 border hover:border-blue-500  hover:text-blue-500 rounded-full text-black' onClick={handleSendTestMail}>
                                Send Test Mail
                            </button>
                        </div>

                    </div>
                    {/* right */}
                    <div className='w-full md:w-4/12 flex flex-col '>
                        <p className="flex items-start  text-primary text-base font-bold w-full ">Price Settings</p>
                        <Divider className='border-gray-200' />
                        {/* antform */}
                        <div className='flex flex-col w-full gap-y-10'>


                            <div className='flex flex-col w-full gap-y-6 shadow-md hover:shadow-md p-3 pb-8'>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelectChange}>
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelectChange}>
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelectChange}>
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelectChange}>
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <div className='flex flex-col w-full gap-y-6 shadow-md hover:shadow-md p-3 pb-8'>
                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelectChange}>
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                            </div>
                            <div className='flex flex-col w-full gap-y-6 shadow-md hover:shadow-md p-3 pb-8'>

                                <div className='w-full flex flex-col gap-y-2'>
                                    <div className="flex">

                                        <span className='text-sm'>Mail Encryption</span>
                                    </div>
                                    <Select defaultValue="" onChange={handleSelectChange}>
                                        {options.map((option) => (
                                            <Option key={option.value} value={option.value}>
                                                {option.label}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>


                    </div>
                </TabPane>
            </Tabs >
        </div >
    )
};
export default Settings;