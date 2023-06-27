import { CloseCircleFilled, DownOutlined, DownloadOutlined, EditOutlined, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Checkbox, Divider, Drawer, Dropdown, Input, Menu, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { paymentData } from '../data/PaymentGrievancesData';
import AddPayment from './payment/AddPayment';
import EditPayment from './payment/EditPayment';
import { Option } from 'antd/es/mentions';
import ViewPayment from './payment/ViewPayment';

const PaymentGrievances = () => {

    const [open, setOpen] = useState(false);
    const [EditDrawerOpen, setEditDrawerOpen] = useState(false);
    const [viewDrawerOpen, setViewDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isStatusOpen, setStatusIsOpen] = useState(false);
    const [selectedStatusOption, setSelectedStatusOption] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [searchText, setSearchText] = useState("")
    const [filteredData, setFilteredData] = useState([])
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedRowDetails, setSelectedRowDetails] = useState({});
    const statusOptions = ["select", "Paid", "Pending", "Cancelled"];

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
        onChange: handlePageChange,
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
    console.log(viewDrawerOpen)
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
            sorter: true,
            render: (_, record) => {
                return <Dropdown overlay={renderMenu(record)} trigger={["click"]}>
                    <div className='flex items-center gap-x-3 cursor-pointer'>
                        <p className={`text-sm  text-primary`} onClick={e => e.preventDefault()}>
                            View
                        </p>
                        <DownOutlined />
                    </div>
                </Dropdown>
            }
        }
    ];
    const handleEditAction = (record) => {
        console.log("inedit")
        setEditDrawerOpen(true);
        setSelectedRowDetails(record);
    }
    const handleViewAction = (record) => {
        console.log("inview")
        setViewDrawerOpen(true);
        setSelectedRowDetails(record)
    }
    const renderMenu = (record) => {
        console.log(record)
        return <Menu>
            <Menu.Item key="edit" onClick={() => handleEditAction(record)} icon={<EditOutlined />}>
                Edit
            </Menu.Item>
            <Menu.Item key="view" onClick={() => handleViewAction(record)} icon={<EyeOutlined />} >
                View
            </Menu.Item>
        </Menu>
    }




    const showDrawer = () => {
        setOpen(true);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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
            <AddPayment
                open={open}
                setOpen={setOpen}
                handleOptionClick={handleOptionClick}
                handleStatusClick={handleStatusClick}
                statusOpen={{ val: isStatusOpen, set: setStatusIsOpen }}
                isOpen={{ val: isOpen, set: setIsOpen }}
                statusOptions={statusOptions}
                selectedStatusOption={{ val: selectedStatusOption, set: setSelectedOption }}
                selectedOption={{ val: selectedOption, set: setSelectedOption }}
            />
            <EditPayment
                open={EditDrawerOpen}
                setOpen={setEditDrawerOpen}
                selectedRowDetails={{ val: selectedRowDetails, set: setSelectedRowDetails }}
                selectedOption={{ val: selectedOption, set: setSelectedOption }}
                handleOptionClick={handleOptionClick}
                handleStatusClick={handleStatusClick}
                statusOpen={{ val: isStatusOpen, set: setStatusIsOpen }}
                isOpen={{ val: isOpen, set: setIsOpen }}
                statusOptions={statusOptions}
                selectedStatusOption={{ val: selectedStatusOption, set: setSelectedOption }}

            />

            <ViewPayment
                open={viewDrawerOpen}
                setOpen={setViewDrawerOpen}
                selectedRowDetails={{ val: selectedRowDetails, set: setSelectedRowDetails }}
            />
        </div>
    )
}

export default PaymentGrievances