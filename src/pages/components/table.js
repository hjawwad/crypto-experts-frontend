import Image from "next/image";
import Modal from "./modal";
import CreateContact from "./createContact";
import { useState, useEffect } from "react";
import { getCompany } from "../api/register";
import { useRouter } from "next/router";
var moment = require("moment");

const CompanyName = ({ companyId }) => {
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (companyId) {
        const company = await getCompany(companyId);
        setCompanyName(company?.name);
        setCompanyLogo(company?.icon);
      }
    };
    fetchData();
  }, [companyId]);

  return (
    <>
      {companyLogo === "" ? (
        <></>
      ) : (
        <Image
          src={`https://crypto-experts-backend.herokuapp.com/${companyLogo}`}
          alt="Sidebar Logo"
          className="inline-flex rounded-full w-[20px] h-[20px] mr-[5px]"
          width={20}
          height={20}
          priority
        />
      )}
      {companyName ? companyName : ""}
    </>
  );
};

const Table = ({
  data,
  selectedGroup,
  setAdded,
  setTableShow,
  setShowDetail,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModal, setIsAddModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  if (selectedGroup?.count > 1) {
    selectedGroup = selectedGroup.data;
  }
  console.log("selectedGroup", selectedGroup);
  const handleOpenModal = (item) => {
    setSelectedRow(item);
    setTableShow(false);
    setShowDetail(true);
    localStorage.setItem("selectedRow", JSON.stringify(item));
    // router.push({
    //   pathname: "/contactDetail",
    //   query: { selectedGroup: selectedGroup._id },
    // });
    // setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddOpenModal = () => {
    if (selectedGroup._id) {
      setIsAddModal(true);
    }
  };

  const handleAddCloseModal = () => {
    setIsAddModal(false);
  };

  const statusColor = (status) => {
    if (status.toLowerCase() === "to contact") {
      return "bg-[#D688631A] text-[#D68863]";
    } else if (status.toLowerCase() === "phoned") {
      return "bg-[#5DB5271A] text-[#5DB527]";
    } else if (status.toLowerCase() === "meet-up") {
      return "bg-[#2169D61A] text-[#2169D6]";
    }
    return "bg-[#D688631A] text-[#D68863]";
  };

  return (
    <div style={{ marginTop: "-20px" }}>
      <header className="flex justify-between items-center p-3  pl-[50px]">
        {/* <div className="border border-10 border-[#303030] p-[8px] inline-flex rounded-[8px]"> */}
        {/* <div className="flex-shrink-0 inline-flex">
            <Image
              src="/list-icon.svg"
              alt="List Icon"
              width={24}
              height={24}
              priority
            />
            <div className="m-auto">&nbsp; List</div>
          </div> */}
        {/* <nav className="ml-6 flex space-x-4 bg-[#292929] rounded-[8px] p-[4px]">
            <div className="font-medium">{`${data?.length} PEOPLE`}</div>
          </nav> */}
        {/* </div> */}
        <div className="ml-auto flex items-center">
          {/* <span className="ml-2 text-gray-800 font-medium pr-[10px] inline-flex text-white">
            <div className="m-auto text-[#808080]">Filter by &nbsp;</div>
            <div className="border border-10 border-[#303030] rounded-[8px] p-[4px] pl-[8px] pr-[8px] text-white">
              Email all
            </div>
          </span> */}
          <div
            onClick={handleAddOpenModal}
            className="cursor-pointer text-md text-right flex-1 border border-10 border-[#303030] rounded-[8px] p-[4px] pl-[8px] pr-[8px]"
          >
            &#43; &nbsp; contact
          </div>
        </div>
      </header>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        selectedRow={selectedRow}
      />
      <CreateContact
        isOpen={isAddModal}
        onRequestClose={handleAddCloseModal}
        selectedGroup={selectedGroup}
        setAdded={setAdded}
        buttonText="Create"
      />
      <div className="ml-3">
        {data?.length ? (
          <table className="table-fixed w-full border-collapse border border-[#303030] ">
            <thead>
              <tr>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  PEOPLE
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  EMAIL
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  DOB
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  CITY
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  COUNTRY
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  JOB
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  COMPANY
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  PHONE
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  TWITTER
                </th>
                <th className="text-left p-[10px] border border-[#303030] text-[#808080]">
                  LINKEDIN
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="cursor-pointer"
                  onClick={() => handleOpenModal(item)}
                >
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.name ? item.name : ""}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030] whitespace-nowrap overflow-hidden">
                    {item.email ? item.email : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030] whitespace-nowrap overflow-hidden">
                    {item.dob ? moment(item.dob).format("DD-MM-YYYY") : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.city ? item.city : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.country ? item.country : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.job ? item.job : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.company_name ? item.company_name : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.phone ? item.phone : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.twitter ? item.twitter : "-"}
                  </td>
                  <td className="fontSize p-[10px] border border-[#303030]">
                    {item.linkedin ? item.linkedin : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full text-center pt-[40px]">No Records Found!</div>
        )}
      </div>
    </div>
  );
};

export default Table;
