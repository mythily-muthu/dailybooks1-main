
import React, { useState, useEffect } from 'react'
import { SearchOutlined, ArrowDownOutlined, ArrowUpOutlined, CloseCircleFilled } from '@ant-design/icons';
import { Divider, Input, Table, Checkbox, Menu, Dropdown, Typography, Space } from 'antd'
import { PlusOutlined, DownOutlined } from '@ant-design/icons'
import { Drawer, theme } from 'antd';
import { dataSource } from '../../data/ReportData';
const Reports = () => {

    const [showFilter, setShowFilter] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // dropdown in add page
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [open, setOpen] = useState(false);
    const [filterOptions, setFilterOptions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const options = ['Shareholder 1', 'Shareholder 2', 'Shareholder 3'];



    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    const { token } = theme.useToken();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const pageSize = 5;




    const totalRecords = filteredData.length;

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // const paginatedData = currentPage === 1 ? filteredData.slice(0, 5) : filteredData.slice(5, 8);
    const paginationConfig = {
        pageSize: pageSize,
        current: currentPage,
        total: filteredData.length,
        onChange: handlePageChange,
        showTotal: (total, range) =>
            <div className='w-full flex justify-center h-full'>
                <span className='text-sm flex justify-center items-center h-full'>
                    {`No of records: ${range[0]}-${range[1]} of ${total}`}
                </span>
            </div>
    };
    const columns = [

        {
            title: <p className="font-medium">INVOICE</p>,
            dataIndex: 'INVOICE',
            key: 'INVOICE',
            defaultSortOrder: 'descend',
            // sorter: true,
            sorter: (report1, report2) => {
                return report1.INVOICE.localeCompare(report2.INVOICE)
            },
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium">DATE</p>,
            dataIndex: 'DATE',
            key: 'DATE',
            defaultSortOrder: 'descend',

            sorter: (a, b) => new Date(a.DATE) - new Date(b.DATE),
            render: (text) => {
                let fontSize = 'text-sm';
                return <p className={`${fontSize}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium">REPORTER</p>,
            dataIndex: 'REPORTER',
            key: 'REPORTER',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text) => {
                let fontSize = 'text-sm';
                return <p className={`${fontSize}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium">INCOME</p>,
            dataIndex: 'INCOME',
            key: 'INCOME',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text, record) => {
                let fontSize = 'text-sm';
                const isCancel = record.STATUS === 'Cancel';
                const icon = isCancel ? (
                    <ArrowDownOutlined style={{ color: "#ef4444" }} />
                ) : (
                    <ArrowUpOutlined style={{ color: "#22c55e" }} />
                );
                return <div className='flex items-center gap-x-1 ' >
                    <p className={`${fontSize}`}>{text}</p>
                    {icon}
                </div>
            }
        },
        {
            title: <p className="font-medium">COMPANY</p>,
            dataIndex: 'COMPANY',
            key: 'COMPANY',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text) => {
                let fontSize = 'text-sm';
                return <p className={`${fontSize}`}>{text}</p>
            }
        },

        {
            title: <p className="font-medium">STATUS</p>,
            dataIndex: 'STATUS',
            key: 'STATUS',
            defaultSortOrder: 'descend',
            sorter: true,
            filters: [
                {
                    text: 'Pending',
                    value: 'pending',
                },
                {
                    text: 'Paid',
                    value: 'paid',
                },
            ],
            render: (text) => {
                let backgroundColor = '';
                let color = '';
                switch (text) {
                    case 'Paid':
                        // backgroundColor = 'rgb(34 197 94)';
                        // color = "rgb(187 247 208)"
                        backgroundColor = '#bbf7d0';
                        color = "#22c55e"
                        break;
                    case 'Cancel':
                        backgroundColor = "#fecaca";
                        color = "#ef4444"
                        break;
                    case 'Pending':
                        backgroundColor = '#eaefff';
                        color = "#6E78AC"
                        break;
                    default:
                        color = '';
                }
                return <p className=' py-1 w-24 flex justify-center items-center text-sm rounded-md' style={{ backgroundColor, color }}>{text}</p>;
            },
        },
    ];
    const containerStyle = {
        position: 'relative',
        height: "100vh",
        // padding: 10,
        overflow: 'hidden',
        textAlign: 'center',
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleFilter = (option) => {
        // Check if the option already exists in the filterOptions array
        const optionIndex = filterOptions.indexOf(option);

        if (optionIndex === -1) {
            // If the option doesn't exist, add it to the array
            setFilterOptions([...filterOptions, option]);
        } else {
            // If the option exists, remove it from the array
            const updatedOptions = [...filterOptions];
            updatedOptions.splice(optionIndex, 1);
            setFilterOptions(updatedOptions);
        }
    }

    const items = [
        {
            key: 'paid',
            label: <Checkbox onClick={() => handleFilter("Paid")}>Paid </Checkbox>,
        },
        {
            key: 'cancel',
            label: <Checkbox onClick={() => handleFilter("Cancel")}>Cancel </Checkbox>,
        },
        {
            key: 'pending',
            label: <Checkbox onClick={() => handleFilter("Pending")}>Pending </Checkbox>,
        },

    ];

    // get filtered data using status
    const getFilteredData = (data) => {
        if (filterOptions.length === 0) {
            // If no filter options are selected, return the original dataSource array
            return data;
        } else {
            // Filter the dataSource array based on the filterOptions
            let filtered = data.filter(item => filterOptions.includes(item.STATUS));
            // setFilteredData(filtered)
            return filtered
        }
    }

    useEffect(() => {

        setFilteredData(
            dataSource.filter((data) => {
                return Object.values(data).some((value) =>
                    value ? value.toString().toLowerCase().includes(searchText.toLowerCase()) : false
                );
            })
        );
    }, [searchText, filterOptions])





    return (
        <div style={containerStyle}>
            <div className='flex  flex-col w-screen h-screen overflow-auto p-5 px-10  items-center'>
                {/* antd drawer */}
                <Divider />
                {/* top */}
                <div className='flex w-full justify-between items-center'>
                    {/* left */}
                    <div className='flex items-start flex-col gap-y-1 md:gap-y-1'>
                        <h1 className=' text-primary text-xl md:text-3xl font-semibold'
                            style={{
                                fontFamily: "apple-system,BlinkMacSystemFont"
                            }}>Reports</h1>
                        <p className='text-base text-gray-400'>Manage the details of your reports from all kind of compaines</p>
                    </div>
                    {/* right */}
                    <div onClick={showDrawer} className='flex w-10 h-10 bg-blue-500 hover:bg-blue-400 rounded md:rounded-md cursor-pointer items-center justify-center '>
                        <PlusOutlined className='text-white text-base md:text-xl md:font-bold'
                            // onClick={handleAddReport}
                            type='primary'
                        />
                    </div>
                </div>
                <Divider />

                {/* bottom */}
                <div className='flex w-full flex-col gap-y-8'>
                    {/* inputs */}
                    <div className='flex w-full items-center justify-between'>
                        <div className='flex items-center w-full sm:w-auto rounded'>
                            <Input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder='Search'
                                className='h-10 md:h-12 px-4 outline-none rounded text-base md:text-xl w-full'
                                prefix={<SearchOutlined className='text-gray-500 md:text-2xl cursor-pointer' style={{ marginRight: '8px' }} />}
                            />
                        </div>
                        <div className='flex relative items-center w-full sm:w-auto rounded'>
                            <Dropdown
                                menu={{
                                    items,
                                }}
                                trigger={["click"]}
                            >

                                <Input

                                    placeholder='Filter'
                                    className='h-10 md:h-12 px-4 outline-none rounded text-base md:text-xl w-full text-primary'
                                    suffix={<DownOutlined className='text-gray-600 md:text-base cursor-pointer' />}
                                />
                            </Dropdown>
                        </div>
                    </div>
                    {/* tables */}
                    <div className='table-container'>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={getFilteredData(filteredData)}
                            pagination={paginationConfig}
                        />
                    </div>
                </div>

            </div>
            <Drawer
                maskClosable={false}
                placement="right"
                closable={false}
                onClose={onClose}
                open={open}
                getContainer={false}
                width="65%"
            >
                <div className='flex w-full h-full  '>
                    <CloseCircleFilled type='primary' className={`text-4xl text-white absolute top-[50%] -left-[45px]`} onClick={() => setOpen(false)} />
                    <div className='w-full flex overflow-auto p-5 gap-x-5 '>
                        {/* left */}
                        <div className='flex flex-col lg:w-1/3 sm:w-2/5 w-full border border-border-color h-screen p-5 gap-y-5'>
                            <div className='flex flex-col w-full items-start gap-y-5'>
                                <h1 className='flex items-start  text-primary text-base font-bold w-full'>Add reports</h1>
                                <div className='flex flex-col items-start gap-y-2 w-full'>
                                    <p className='text-text-light text-base font-medium'>Reason</p>
                                    <input className=' text-sm border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder='Summary' style={{ paddingBottom: '10px' }} />
                                </div>
                            </div>
                            <div className='flex w-full flex-col gap-y-5'>
                                <p className='flex text-text-light items-start text-base font-medium'>Invoice (Optional)</p>
                                <div className='w-[100%] border border-dashed border-blue-600 flex md:flex-row sm:flex-col justify-between items-center py-1 px-1 text-blue-600'>
                                    <div>No File Chosen</div>
                                    <div>
                                        <label htmlFor="fileInput" className='bg-bg-blue text-white flex-nowrap text-xs md:text-justify py-1 px-[6px] rounded-sm text-[12px] cursor-default'>
                                            Browse Files
                                            <input
                                                id="fileInput"
                                                type="file"
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* right */}
                        <div className='lg:w-2/3 sm:w-3/5  w-full flex flex-col'>
                            {/* buttons */}
                            <div className='flex justify-end gap-x-2'>
                                <button className='bg-gray-200  px-3 py-1 rounded-sm'>
                                    <span className='text-text-gray font-semibold'>Cancel</span>
                                </button>

                                <button className='bg-bg-blue  px-3 py-1 rounded-sm' >
                                    <span className='text-white'>Save</span>
                                </button>
                            </div>
                            <div className='flex w-full flex-col items-start gap-y-6'>
                                <h1 className=' flex items-start text-primary font-bold text-lg w-full'>Income</h1>
                                <div className='w-full flex justify-between gap-x-10'>
                                    <div className='w-1/2  flex items-start flex-col gap-y-2'>
                                        <p className='text-text-color text-base'>Amount</p>
                                        <input className='  text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder='Amount' style={{ paddingBottom: '10px' }} />

                                    </div>
                                    <div className='w-1/2 flex items-start flex-col gap-y-2'>
                                        <p className='text-text-color text-base'>Refunded amount</p>
                                        <div className='relative w-full cursor-default'>
                                            <input
                                                className='w-full text-sm md:text-base cursor-default text-gray-400 border-0 border-b border-light-gray  focus:outline-none focus:border-bg-blue pr-8'
                                                placeholder='Shareholder 1'
                                                style={{ paddingBottom: '10px' }}
                                                onClick={() => setIsOpen(!isOpen)}
                                                value={selectedOption}
                                                readOnly
                                            />
                                            <div className='absolute right-0 top-0 bottom-0 flex items-center pointer-events-none'>
                                                <DownOutlined className='text-gray-400' />
                                            </div>
                                            {isOpen && (
                                                <div className='absolute w-full mt-1 bg-white border border-black shadow-lg'>
                                                    {options.map((option, index) => (
                                                        <div
                                                            key={index}
                                                            className='px-1 flex items-start cursor-pointer text-gray-400 hover:bg-blue-500 hover:text-white'
                                                            onClick={() => handleOptionClick(option)}
                                                        >
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <div className='w-full  flex items-start flex-col gap-y-2'>
                                    <p className='text-text-color text-base'>Reporter</p>
                                    <input className=' text-sm md:text-base border-0 border-b border-light-gray w-[30%] focus:outline-none focus:border-bg-blue' placeholder='Summary' style={{ paddingBottom: '10px' }} />

                                </div>
                                <h1 className=' text-primary text-lg font-bold w-full flex items-start'>Client</h1>
                                <div className='w-full  flex items-start flex-col gap-y-2'>
                                    <p className='text-text-color text-base'>Customer</p>
                                    <input className=' text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder='Select from customer' style={{ paddingBottom: '10px' }} />

                                </div>
                                <div className='w-full  flex items-start flex-col gap-y-2'>
                                    <p className='text-text-color text-base'>Description</p>
                                    <input className='  text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder='Summary' style={{ paddingBottom: '10px' }} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Drawer >
        </div >

    )
}

export default Reports