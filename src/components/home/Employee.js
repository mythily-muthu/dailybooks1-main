import React, { useState } from 'react';
import { Button, Dropdown, Space, Table, Input } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import Employeedata from '../home/Employeedata';

export default function Employee() {
  const employeeData = Employeedata;
  const { Search } = Input;

  const columns = [
    {
      title: 'Invoice',
      dataIndex: 'Invoice',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
    },
    {
      title: 'Company',
      dataIndex: 'Company',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
    },
    {
      title: 'Customer',
      dataIndex: 'Customer',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
    },
    {
      title: 'Action',
      dataIndex: 'Action',
    },
  ];

  const [searchedText, setSearchText] = useState([]);
  const [textVal, setTextVal] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const filterData = () => {
    const filteredData = employeeData.filter(
      (employee) =>
        employee.Invoice.toLowerCase().includes(textVal.toLowerCase()) &&
        (!selectedOption || employee.Company === selectedOption)
    );
    setSearchText(filteredData);
  };

  const handleSearch = (e) => {
    setTextVal(e.target.value);
    filterData();
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    filterData();
  };

  return (
    <div>
      <div className='flex justify-between items-center py-3 mx-5 border-b-2'>
        <div>
          <h1 className='text-xl font-semibold'>Orders</h1>
          <p className='text-slate-400'>Manage the details of your all kind of orders</p>
        </div>
        <div>
          <button className='text-3xl py-1 px-5 bg-blue-600 rounded-md text-white hover:bg-blue-50'>+</button>
        </div>
      </div>
      <div>
        <div className='flex justify-between items-center mx-5 my-5'>
          <div>
            <Search
              placeholder='input search text'
              allowClear
              onChange={handleSearch}
              style={{
                width: 200,
              }}
            />
          </div>
          <div>
            <select value={selectedOption} onChange={handleOptionChange}>
              
              {employeeData.map((employee) => (
                <option key={employee.Company} value={employee.Company}>
                  {employee.Company}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='mx-5'>
        <Table columns={columns} dataSource={searchedText.length ? searchedText : employeeData} />
      </div>
    </div>
  );
}