import { CloseCircleFilled, DownOutlined, DownloadOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Drawer, Dropdown, Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { paymentData } from '../data/PaymentGrievancesData';

const PaymentGrievances = () => {

    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isStatusOpen, setStatusIsOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [searchText, setSearchText] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [filterOptions, setFilterOptions] = useState([])
    const options = ['select', 'INR', 'USD', 'CAD'];
    const statusOptions = ["select", "Paid", "Pending", "Cancelled"]

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    const handleStatusClick = (option) => {
        setSelectedStatusOption(option);
        setStatusIsOpen(false);
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const paginationConfig = {
        pageSize: 5,
        current: currentPage,
        total: filteredData.length,
        onchange: handlePageChange,
        showTotal: (total, range) =>
            <div className='w-full flex justify-center h-full'>
                <span className='text-sm flex justify-center items-center h-full'>
                    {`No of records: ${range[0]}-${range[1]} of ${total}`}
                </span>
            </div>
    }

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
            label: <Checkbox
                onClick={() => handleFilter("Paid")}
            >Paid </Checkbox>,
        },
        {
            key: 'cancel',
            label: <Checkbox
                onClick={() => handleFilter("Cancelled")}
            >Cancelled </Checkbox>,
        },
        {
            key: 'pending',
            label: <Checkbox
                onClick={() => handleFilter("Pending")}
            >Pending </Checkbox>,
        },

    ];
    let columns = [
        {
            title: <p className="font-medium uppercase">Invoice id</p>,
            dataIndex: 'invoice_id',
            key: 'invoice_id',
            defaultSortOrder: 'descend',
            // sorter: true,
            sorter: (a, b) => a.invoice_id.localeCompare(b.invoice_id),
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium uppercase">Customer name</p>,
            dataIndex: 'customer_name',
            key: 'customer_name',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.customer_name.length - b.customer_name.length,
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium uppercase">Issue</p>,
            dataIndex: 'issue',
            key: 'issue',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.issue.localeCompare(b.issue),
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium uppercase">Reason</p>,
            dataIndex: 'reason',
            key: 'reason',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium uppercase">Refunded amout</p>,
            dataIndex: 'refunded_amount',
            key: 'refunded_amount',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium uppercase">currency type</p>,
            dataIndex: 'currency_type',
            key: 'currency_type',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium uppercase">Description</p>,
            dataIndex: 'description',
            key: 'description',
            defaultSortOrder: 'descend',
            sorter: true,
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        },
        {
            title: <p className="font-medium uppercase">status</p>,
            dataIndex: 'status',
            key: 'status',
            defaultSortOrder: 'descend',
            sorter: true,
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
                    case 'Cancelled':
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
        {
            title: <p className="font-medium uppercase">Action</p>,
            dataIndex: 'action',
            key: 'action',
            render: (text) => {
                let fontSize = 'text-sm';
                let fontColor = "text-primary"
                return <p className={`${fontSize}  ${fontColor}`}>{text}</p>
            }
        }
    ]
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log(newSelectedRowKeys)
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys: ["1", "2"],
        onchange: onSelectChange,
    }

    // getting filtered data using status
    const getFilteredData = (data) => {
        if (filterOptions.length === 0)
            return data;
        else {
            return data.filter((item) => filterOptions.includes(item.status))
        }


    }

    useEffect(() => {
        setFilteredData(
            paymentData.filter((data) => {
                return Object.values(data).some((value) => {
                    return value ? value.toString().toLowerCase().includes(searchText.toLowerCase()) : false
                })
            })
        )
    }, [searchText])


    return (
        <div
        // style={containerStyle}
        >
            <div className='flex  flex-col w-screen h-screen overflow-auto  px-10  items-center'>

                <Divider />
                {/* title container */}
                <div className='flex w-full justify-between items-center'>
                    {/* left */}
                    <div className='flex items-start flex-col gap-y-1 md:gap-y-1'>
                        <h1 className=' text-primary text-xl md:text-3xl font-semibold'
                            style={{
                                fontFamily: "apple-system,BlinkMacSystemFont"
                            }}>Payment Grievances</h1>
                        <p className='text-base text-gray-400'>Manage the details of your payment grievances from all kind of compaines</p>
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
                {/* search filter  */}
                <div className='w-full flex flex-col gap-y-5'>
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
                    {/* table */}
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={getFilteredData(filteredData)}
                        pagination={paginationConfig}
                    />
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

                <div className='w-full h-full flex'>
                    <CloseCircleFilled type='primary' className={`text-4xl text-white absolute top-[50%] -left-[45px]`} onClick={() => setOpen(false)} />
                    {/* edit page */}
                    <div className='w-full flex overflow-auto p-5 gap-x-5 '>
                        {/* left */}
                        <div className='flex flex-col lg:w-1/3 sm:w-2/5 w-full border border-border-color h-screen p-5 gap-y-5'>
                            <div className='flex flex-col w-full items-start gap-y-5'>
                                <h1 className='flex items-start  text-primary text-base font-bold w-full'>Add Payment Grievances</h1>
                                <div className='flex flex-col items-start gap-y-2 w-full'>
                                    <p className='text-text-light text-base font-medium'>Reason</p>
                                    <input className=' text-sm border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder='reason' style={{ paddingBottom: '10px' }} />
                                </div>
                            </div>
                            <div className='flex w-[90%] flex-col gap-y-5'>
                                <p className='flex text-text-light items-start text-base font-medium'>Invoice (Optional)</p>
                                <div className='flex w-full  gap-x-3 items-center '>
                                    <div className='w-full border border-dashed border-blue-600 flex md:flex-row sm:flex-col  items-center justify-between py-2 px-1 text-blue-600'>

                                        <div className='whitespace-nowrap'>No File Chosen</div>
                                        <div className='flex '>
                                            <label htmlFor="fileInput" className='bg-bg-blue text-white whitespace-nowrap text-xs md:text-justify py-1 px-[6px] rounded-sm text-[12px] cursor-default'>
                                                Browse File
                                                <Input
                                                    id="fileInput"
                                                    type="file"
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <DownloadOutlined className='text-2xl' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* right */}
                        <div className='  w-full flex flex-col gap-y-3'>
                            {/* buttons */}
                            <div className='flex justify-end gap-x-2'>
                                <button className='bg-gray-200  px-3 py-1 rounded-sm'>
                                    <span className='text-text-gray font-semibold'>Cancel</span>
                                </button>

                                <button className='bg-bg-blue  px-3 py-1 rounded-sm' >
                                    <span className='text-white'>Save</span>
                                </button>
                            </div>
                            <div className='flex w-full gap-x-10'>
                                <div className='w-1/3  flex items-start flex-col gap-y-2'>
                                    <p className='text-text-color text-base'>Refunded Amount</p>
                                    <input className=' text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder='Amount' style={{ paddingBottom: '10px' }} />

                                </div>
                                <div className='w-1/2 flex items-start flex-col gap-y-2'>
                                    <p className='text-text-color text-base'>Currency</p>
                                    <div className='relative w-full cursor-default'>
                                        <input
                                            className='w-full text-sm md:text-base cursor-default text-gray-400 border-0 border-b border-light-gray  focus:outline-none focus:border-bg-blue pr-8'
                                            placeholder='select'
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
                                <div className='w-1/3  flex items-start flex-col gap-y-2'>
                                    <p className='text-text-color text-base'>Issue</p>
                                    <input className=' text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder='Issue' style={{ paddingBottom: '10px' }} />

                                </div>

                            </div>
                            <div className='flex flex-col w-full '>
                                <h1 className=' text-primary text-lg font-bold w-full flex items-start py-5'>Client</h1>
                                <div className='w-full  flex items-start flex-col gap-y-2'>
                                    <p className='text-text-color text-base'>Customer</p>
                                    <input className=' text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue' placeholder="customer's name" style={{ paddingBottom: '10px' }} />

                                </div>

                            </div>
                            <div className='w-1/2 flex items-start flex-col gap-y-2'>
                                <p className='text-text-color text-base py-2'>Description</p>
                                <p className='text-text-color text-base pt-6'>Status</p>
                                <div className='relative w-full cursor-default'>
                                    <input
                                        className='w-full text-sm md:text-base cursor-default text-gray-400 border-0 border-b border-light-gray  focus:outline-none focus:border-bg-blue pr-8'
                                        placeholder='select'
                                        style={{ paddingBottom: '10px' }}
                                        onClick={() => setStatusIsOpen(!isOpen)}
                                        value={selectedStatusOption}
                                        readOnly
                                    />
                                    <div className='absolute right-0 top-0 bottom-0 flex items-center pointer-events-none'>
                                        <DownOutlined className='text-gray-400' />
                                    </div>
                                    {isStatusOpen && (
                                        <div className='absolute w-full mt-1 bg-white border border-black shadow-lg'>
                                            {statusOptions.map((statusOption, index) => (
                                                <div
                                                    key={index}
                                                    className='px-1 flex items-start cursor-pointer text-gray-400 hover:bg-blue-500 hover:text-white'
                                                    onClick={() => handleStatusClick(statusOption)}
                                                >
                                                    {statusOption}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default PaymentGrievances