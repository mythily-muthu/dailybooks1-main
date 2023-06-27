import React, { useEffect, useState } from "react";
import DrawerWrapper from "../DrawerWrapper";
import {
  CloseCircleFilled,
  DownOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";

const EditPayment = ({
  open,
  setOpen,
  handleOptionClick,
  handleStatusClick,
  statusOpen,
  isOpen,
  statusOptions,
  selectedStatusOption,
  selectedRowDetails,
  selectedOption,
}) => {
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(true);
  const options = ["select", "INR", "USD", "CAD"];

  console.log("row details:", paymentData);

  useEffect(() => {
    setLoading(true);
    setPaymentData(selectedRowDetails.val);
    setLoading(false);
  }, []);
  return (
    <DrawerWrapper open={open} setOpen={() => setOpen(false)}>
      {/* children */}
      <div className="w-full h-full flex">
        <CloseCircleFilled
          type="primary"
          className={`text-4xl text-white absolute top-[50%] -left-[45px]`}
          onClick={() => setOpen(false)}
        />
        {/* edit page */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full flex overflow-auto p-5 gap-x-5 ">
            {/* left */}
            <div className="flex flex-col lg:w-1/3 sm:w-2/5 w-full border border-border-color h-screen p-5 gap-y-5">
              <div className="flex flex-col w-full items-start gap-y-5">
                <h1 className="flex items-start  text-primary text-base font-bold w-full">
                  Add Payment Grievances
                </h1>
                <div className="flex flex-col items-start gap-y-2 w-full">
                  <p className="text-text-light text-base font-medium">
                    Reason
                  </p>
                  <input
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        reason: e.target.value,
                      })
                    }
                    value={paymentData.reason}
                    className="text-gray-400 text-sm border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue"
                    placeholder="reason"
                    style={{ paddingBottom: "10px" }}
                  />
                </div>
              </div>
              <div className="flex w-[90%] flex-col gap-y-5">
                <p className="flex text-text-light items-start text-base font-medium">
                  Invoice (Optional)
                </p>
                <div className="flex w-full  gap-x-3 items-center ">
                  <div className="w-full border border-dashed border-blue-600 flex md:flex-row sm:flex-col  items-center justify-between py-2 px-1 text-blue-600">
                    <div className="whitespace-nowrap">No File Chosen</div>
                    <div className="flex ">
                      <label
                        htmlFor="fileInput"
                        className="bg-bg-blue text-white whitespace-nowrap text-xs md:text-justify py-1 px-[6px] rounded-sm text-[12px] cursor-default"
                      >
                        Browse File
                        <Input id="fileInput" type="file" className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="">
                    <DownloadOutlined className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="  w-full flex flex-col gap-y-3">
              {/* buttons */}
              <div className="flex justify-end gap-x-2">
                <button className="bg-gray-200  px-3 py-1 rounded-sm">
                  <span className="text-text-gray font-semibold">Cancel</span>
                </button>

                <button className="bg-bg-blue  px-3 py-1 rounded-sm">
                  <span className="text-white">Save</span>
                </button>
              </div>
              <div className="flex w-full gap-x-10">
                <div className="w-1/3  flex items-start flex-col gap-y-2">
                  <p className="text-text-color text-base">Refunded Amount</p>
                  <input
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        refunded_amount: e.target.value,
                      })
                    }
                    value={paymentData.refunded_amount}
                    className="text-gray-400 text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue"
                    placeholder="Amount"
                    style={{ paddingBottom: "10px" }}
                  />
                </div>
                <div className="w-1/2 flex items-start flex-col gap-y-2">
                  <p className="text-text-color text-base">Currency</p>
                  <div className="relative w-full cursor-default">
                    <input
                      value={paymentData.currency_type}
                      className="w-full text-sm md:text-base cursor-default text-gray-400 border-0 border-b border-light-gray  focus:outline-none focus:border-bg-blue pr-8"
                      placeholder="select"
                      style={{ paddingBottom: "10px" }}
                      onClick={() => isOpen.set(!isOpen.val)}
                      // value={selectedOption.val}
                      readOnly
                    />
                    <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
                      <DownOutlined className="text-gray-400" />
                    </div>
                    {isOpen.val && (
                      <div className="absolute w-full mt-1 bg-white border border-black shadow-lg">
                        {options.map((option, index) => (
                          <div
                            key={index}
                            className="px-1 flex items-start cursor-pointer text-gray-400 hover:bg-blue-500 hover:text-white"
                            onClick={() => {
                              setPaymentData({
                                ...paymentData,
                                currency_type: option,
                              });
                              handleOptionClick(option);
                            }}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-1/3  flex items-start flex-col gap-y-2">
                  <p className="text-text-color text-base">Issue</p>
                  <input
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        issue: e.target.value,
                      })
                    }
                    value={paymentData.issue}
                    className="text-gray-400 text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue"
                    placeholder="Issue"
                    style={{ paddingBottom: "10px" }}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full ">
                <h1 className=" text-primary text-lg font-bold w-full flex items-start py-5">
                  Client
                </h1>
                <div className="w-full  flex items-start flex-col gap-y-2">
                  <p className="text-text-color text-base">Customer</p>
                  <input
                    onChange={(e) =>
                      setPaymentData({
                        ...paymentData,
                        customer_name: e.target.value,
                      })
                    }
                    value={paymentData.customer_name}
                    className="text-gray-400 text-sm md:text-base border-0 border-b border-light-gray w-full focus:outline-none focus:border-bg-blue"
                    placeholder="customer's name"
                    style={{ paddingBottom: "10px" }}
                  />
                </div>
              </div>
              <div className="w-1/2 flex items-start flex-col gap-y-2">
                <p className="text-text-color text-base py-2">Description</p>
                <p className="text-text-color text-base pt-6">Status</p>
                <div className="relative w-full cursor-default">
                  {/* <input
                  className="w-full text-sm md:text-base cursor-default text-gray-400 border-0 border-b border-light-gray  focus:outline-none focus:border-bg-blue pr-8"
                  placeholder="select"
                  style={{ paddingBottom: "10px" }}
                  onClick={() => statusOpen.set(!isOpen)}
                  value={selectedStatusOption.val}
                  readOnly
                /> */}
                  <div className="absolute right-0 top-0 bottom-0 flex items-center pointer-events-none">
                    <DownOutlined className="text-gray-400" />
                  </div>
                  {/* {true && (
                  <div className="absolute w-full mt-1 bg-white border border-black shadow-lg">
                    {statusOptions.map((statusOption, index) => (
                      <div
                        key={index}
                        className="px-1 flex items-start cursor-pointer text-gray-400 hover:bg-blue-500 hover:text-white"
                        onClick={() => handleStatusClick(statusOption)}
                      >
                        {statusOption}
                      </div>
                    ))}
                  </div>
                )} */}
                  <Select value={paymentData.status} style={{ width: "100%" }}>
                    {statusOptions.map((statusOption, index) => (
                      <Select.Option
                        value={statusOption}
                        // onClick={() => {
                        //   setPaymentData({
                        //     ...paymentData,
                        //     status: statusOption,
                        //   });
                        // }}
                      />
                    ))}
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DrawerWrapper>
  );
};

export default EditPayment;
