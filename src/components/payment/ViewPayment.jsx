import React, { useState } from "react";
import DrawerWrapper from "../DrawerWrapper";
import { CloseCircleFilled } from "@ant-design/icons";
const ViewPayment = ({ open, setOpen, selectedRowDetails }) => {
  const [activeTab, setActiveTab] = useState("company_details");
  console.log("view row details:", selectedRowDetails);

  console.log(open);
  const TitleDetailsContainer = ({ title, desc }) => {
    return (
      <div className="flex flex-col w-full ">
        <p className=" text-primary text-base font-semibold">{title}</p>
        <p className="text-text-light text-sm font-medium">{desc}</p>
      </div>
    );
  };
  return (
    <DrawerWrapper open={open} setOpen={() => setOpen(false)}>
      <div className="w-full h-full flex">
        <CloseCircleFilled
          type="primary"
          className={`text-4xl text-white absolute top-[50%] -left-[45px]`}
          onClick={() => setOpen(false)}
        />
        {/* view page */}
        <div className="w-full flex overflow-auto p-5 gap-x-5 ">
          {/* left */}
          <div className="flex flex-col lg:w-1/3 sm:w-2/5 w-full border border-gray-400 h-screen p-5 gap-y-5">
            <div className="flex flex-col w-full items-start gap-y-3">
              <div className="w-full">
                <img
                  className="w-full h-full object-contain"
                  alt="logo"
                  src="data:image/png;base64,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"
                />
              </div>
              <h1 className="flex items-start  text-primary text-sm font-bold w-full">
                Company
              </h1>
              <p className="text-text-light text-sm font-medium">TCS</p>
            </div>
            <div className="flex flex-col w-full items-start gap-y-3">
              <h1 className="flex items-start  text-primary text-sm font-bold w-full">
                Information
              </h1>
              <p className="text-text-light text-sm font-medium">
                TCS - IT solution provider it is expanded many countries to
                provide IT solution to many sectors.
              </p>
            </div>
          </div>
          {/* right */}
          <div className=" w-full flex flex-col gap-y-3">
            <div className="flex w-full justify-between items-center">
              <div className="flex ">
                <h1 className="flex items-start  text-primary text-xl font-bold w-full">
                  Development Team
                </h1>
              </div>
              {/* buttons */}
              <div className="flex justify-end gap-x-2">
                <button className="bg-gray-200  px-3 py-1 rounded-sm">
                  <span className="text-red-600 font-semibold">Cancel</span>
                </button>

                <button className="bg-bg-blue  px-3 py-1 rounded-sm">
                  <span className="text-white">Edit</span>
                </button>
              </div>
            </div>
            <p className="text-text-light text-sm font-medium">
              California, USA
            </p>
            <div className="w-full flex ">
              <button
                onClick={() => setActiveTab("company_details")}
                className={`w-1/2 flex items-center justify-center h-10 ${
                  activeTab === "company_details"
                    ? "bg-transparent text-bg-blue"
                    : "bg-gray-200 text-primary"
                } rounded-md `}
              >
                Company Details
              </button>
              <button
                onClick={() => setActiveTab("people")}
                className={`w-1/2 flex items-center justify-center h-10 rounded-md 
                ${
                  activeTab === "people"
                    ? "bg-transparent text-bg-blue"
                    : "bg-gray-200 text-primary"
                }
                `}
              >
                People
              </button>
            </div>
            {activeTab === "company_details" ? (
              <div className="flex flex-col w-full items-start gap-y-3 py-4">
                <div className="flex w-full flex-col gap-y-2 ">
                  <p className="flex items-start  text-primary text-base font-bold w-full">
                    Resources who worked on this company’s project
                  </p>
                  <div className="flex flex-col w-full pt-6">
                    <p className=" text-primary text-base font-semibold">
                      TCS - Official website redesign
                    </p>
                    <p className="text-text-light text-sm font-medium">
                      TCS - Official website redesign
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4 w-full">
                  <TitleDetailsContainer
                    title="Project Lead"
                    desc="Yasmine Valdez."
                  />
                  <TitleDetailsContainer
                    title="Design Lead"
                    desc="Yasmine Valdez."
                  />
                  <TitleDetailsContainer
                    title="Development Lead"
                    desc="Yasmine Valdez."
                  />
                  <TitleDetailsContainer
                    title="Testing Lead"
                    desc="Yasmine Valdez."
                  />
                </div>
              </div>
            ) : (
              <div>people</div>
            )}
          </div>
        </div>
      </div>
    </DrawerWrapper>
  );
};

export default ViewPayment;
