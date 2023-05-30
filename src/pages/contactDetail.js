import ReactModal from "react-modal";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import TabMenu from "./components/tabmenu";
import { getCompany } from "./api/register";
import withAuth from "./components/withAuth";
import { useRouter } from "next/router";
import showSuccessAlert from "./components/utility/showSuccessAlert";
import showErrorAlert from "./components/utility/showErrorAlert";
import { updateContactByGroup, deleteContactsById } from "./api/register";
import CreateContact from "./components/createContact";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import GroupsIcon from "@mui/icons-material/Groups";
import CakeIcon from "@mui/icons-material/Cake";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BusinessIcon from "@mui/icons-material/Business";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonCircleIcon from "./components/svg-icons/person-icon";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ThemeContext from "../ThemeContext";

var moment = require("moment");

ReactModal.setAppElement("#__next");

const CompanyName = ({ companyId }) => {
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (companyId) {
      const fetchData = async () => {
        const company = await getCompany(companyId);
        setCompanyName(company.name);
      };
      fetchData();
    }
  }, [companyId]);

  return <p className="text-left text-l">{companyName}</p>;
};

function ContactDetail({ setTableShow, setShowDetail }) {
  const router = useRouter();
  useEffect(() => {
    console.log("ROUTER", router.query.selectedRow); // Alerts 'Someone'
  }, [router.query]);

  const [selectedRow, setSelectedRow] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const [value, setValue] = useState("");

  const [isAddModal, setIsAddModal] = useState(false);
  const [fields, setFields] = useState([]);
  const [addField, setAddField] = useState(false);
  const [dropdown, setDropDown] = useState(true);
  const mode = useContext(ThemeContext);

  const rowStyle = {
    backgroundColor: mode?.darkMode ? mode?.color.dark : mode?.color.white,
    color: mode?.darkMode ? "#808080" : "#FFFFF",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseContact = await updateContactByGroup(
        selectedRow.group_id,
        { newField: [...selectedRow.newField, ...fields] },
        selectedRow._id
      );
      if (responseContact.status) {
        showSuccessAlert(responseContact.message);
        setAdded(true);

        // Save updated fields to local storage
        localStorage.setItem(
          "selectedRow",
          JSON.stringify(responseContact.data.data)
        );
        setFields([]);
      } else {
        showErrorAlert("Something went wrong!");
        return;
      }
    } catch (error) {
      showErrorAlert(error);
      return;
    }
  };

  const handleDelete = async () => {
    try {
      const responseContact = await deleteContactsById(
        selectedRow.group_id,
        selectedRow._id
      );
      if (responseContact.status) {
        showSuccessAlert(responseContact.message);
        localStorage.removeItem("selectedRow");
        router.push("/dashboard");
      } else {
        showErrorAlert("Something went wrong!");
        return;
      }
    } catch (error) {
      showErrorAlert(error);
      return;
    }
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    setFields((prevState) => {
      const newState = [...prevState];
      newState[index][name] = value;
      return newState;
    });
  };

  const handleAddField = () => {
    setFields((prevState) => [...prevState, { name: "", value: "" }]);
  };

  useEffect(() => {
    setSelectedRow(JSON.parse(localStorage.getItem("selectedRow")));
  }, []);

  useEffect(() => {
    if (added) {
      setSelectedRow(JSON.parse(localStorage.getItem("selectedRow")));
      setAdded(false);
    }
  }, [added]);

  useEffect(() => {
    if (updated) {
      setSelectedRow(JSON.parse(localStorage.getItem("selectedRow")));
      setUpdated(false);
    }
  }, [updated]);

  const handleOpenModal = (item) => {
    setSelectedRow(item);
    localStorage.setItem("selectedRow", JSON.stringify(item));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDropDown = () => {
    setDropDown(!dropdown);
  };

  const tagList =
    selectedRow?.tag === "" ? [] : selectedRow?.tag?.split(" ") || [];

  const handleAddOpenModal = () => setIsAddModal(true);

  const handleAddCloseModal = () => setIsAddModal(false);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div
      className=" w-full"
      style={{
        backgroundColor: mode?.darkMode
          ? mode?.color?.dark
          : mode?.color?.white,
      }}
    >
      {selectedRow && (
        <>
          <div className="flex w-full">
            <div className="w-[50%] ">
              <div
                style={{
                  height: "85px",
                  padding: "20px",
                }}
              >
                <div className="flex w-full text-[#fffff] text-[28px] border-bottom">
                  <div>
                    {selectedRow?.image ? (
                      selectedRow.image
                    ) : (
                      <PersonCircleIcon />
                    )}
                  </div>
                  <div
                    className="pl-5 pt-1"
                    style={{
                      fontWeight: "500px",
                      fontFamily: "Inter",
                      color: mode?.darkMode ? "white" : "black",
                    }}
                  >
                    {selectedRow?.name ? selectedRow.name : "Gabriele Morace"}
                  </div>
                </div>
                {/* <button className="mb-[25px] ml-[70px] bg-[#0353CC] p-2 rounded-xl">
                  Send Email
                </button> */}
              </div>

              <div
                className="grid grid-cols-2 divide-x w-full"
                style={{
                  borderTop: `1px solid ${
                    mode?.darkMode ? "#3A3A3A" : "#E2E2E2"
                  }`,
                  borderRight: `1px solid ${
                    mode?.darkMode ? "#3A3A3A" : "#E2E2E2"
                  }`,
                }}
              >
                <div className="items-center justify-center pt-[22px]">
                  <div className="flex text-[25px] ml-5">
                    <div onClick={handleDropDown}>
                      {dropdown ? (
                        <KeyboardArrowDownIcon
                          style={{
                            fontSize: 40,
                            color: mode?.darkMode ? "white" : "black",
                          }}
                        />
                      ) : (
                        <KeyboardArrowUpIcon
                          style={{
                            fontSize: 40,
                            color: mode?.darkMode ? "white" : "black",
                          }}
                        />
                      )}
                    </div>
                    <div
                      onClick={handleDropDown}
                      style={{ color: mode?.darkMode ? "white" : "black" }}
                    >
                      Record details
                    </div>
                  </div>
                  {dropdown && (
                    <>
                      <div className="w-full p-[20px]">
                        <div className="items-center justify-center ">
                          <form onSubmit="" className="text-left">
                            <div>
                              <div className="border-none border-0 ">
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex", fontSize: "1rem" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <PersonIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    id="name"
                                    value={
                                      selectedRow?.name || "Name & Surname"
                                    }
                                  />
                                </div>

                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A] mr-5">
                                    <LocalOfferIcon />
                                  </div>
                                  {tagList.length > 0 ? (
                                    tagList.map((tag, index) => (
                                      <div
                                        key={index}
                                        className="text-xm border-slate-300 rounded-md ml-2"
                                        style={{
                                          backgroundColor: getRandomColor(),
                                          display: "inline-block",
                                          padding: "0 8px",
                                          marginBottom: "5px",
                                        }}
                                      >
                                        {tag}
                                      </div>
                                    ))
                                  ) : (
                                    <input
                                      disabled="true"
                                      type="text"
                                      className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md"
                                      style={rowStyle}
                                      value={selectedRow?.tag || "Tags"}
                                    />
                                  )}
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <GroupsIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={
                                      selectedRow?.meet || "Where did we meet?"
                                    }
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <CakeIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    value={
                                      selectedRow?.dob
                                        ? moment(selectedRow?.dob).format(
                                            "DD-MM-YYYY"
                                          )
                                        : "" || "Birthday"
                                    }
                                    className="pb-[6px] pt-[5px] pl-2 text-xm text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <LocalPhoneIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={selectedRow?.phone || "Phone"}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <PlaceIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={selectedRow?.city || "City"}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <PlaceIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={selectedRow?.country || "Country"}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <LinkedInIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={selectedRow?.linkedin || "LinkedIn"}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <TwitterIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={selectedRow?.twitter || "Twitter"}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <AlternateEmailIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="email"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5 "
                                    style={rowStyle}
                                    value={selectedRow?.email || "Email"}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className="pb-[6px] text-[#6A6A6A]">
                                    <WorkOutlineIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={selectedRow?.job || "Job"}
                                  />
                                </div>
                                <div
                                  className="pb-[10px] mr-[5px]"
                                  style={{ display: "flex" }}
                                >
                                  <div className=" text-[#6A6A6A]">
                                    <BusinessIcon />
                                  </div>
                                  <input
                                    disabled="true"
                                    type="text"
                                    className="text-xm pl-2 text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                                    style={rowStyle}
                                    value={selectedRow?.company || "Company"}
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      {selectedRow.newField &&
                        selectedRow.newField.map((field, index) => (
                          <div key={index} style={{ display: "flex" }}>
                            <label
                              style={rowStyle}
                              htmlFor={`name-${index}`}
                              className="text-l text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                            >
                              {field[Object.keys(field)[0]]}
                            </label>
                            <p
                              style={rowStyle}
                              className="text-l text-[#6A6A6A] border-slate-300 rounded-md ml-5"
                            >
                              {field[Object.keys(field)[1]]}
                            </p>
                          </div>
                        ))}

                      <form onSubmit={handleSubmit}>
                        {fields.map((field, index) => (
                          <div key={index} className="ml-[70px] ">
                            <label style={rowStyle} htmlFor={`name-${index}`}>
                              Name:
                            </label>
                            <input
                              className="w-full bg-[#1f1f1f] text-l text-white border border-slate-300 rounded-[16px] bg-[#1f1f1f] p-2 pl-5"
                              type="text"
                              id={`name-${index}`}
                              name="name"
                              style={rowStyle}
                              value={field.name}
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                            />
                            <label style={rowStyle} htmlFor={`value-${index}`}>
                              Value:
                            </label>
                            <input
                              type="text"
                              className="w-full bg-[#1f1f1f] text-white text-l border border-slate-300 rounded-[16px] bg-[#1f1f1f] p-2 pl-5"
                              id={`value-${index}`}
                              name="value"
                              style={rowStyle}
                              value={field.value}
                              onChange={(event) =>
                                handleInputChange(event, index)
                              }
                            />

                            <button
                              style={{
                                width: "100px",
                                backgroundColor: mode?.darkMode
                                  ? "#0353CC"
                                  : "#008C5A",
                              }}
                              className="text-l border border-slate-300 mt-3 rounded-md p-2 w-full border-none"
                              type="submit"
                            >
                              Save
                            </button>
                          </div>
                        ))}
                        {!fields.length && (
                          <button
                            className="text-[15px] text-white ml-[70px] border border-slate-300  rounded-[15px] p-2 w-full border-none"
                            type="button"
                            style={{
                              width: "100px",
                              // color: "#FFFFF",
                              backgroundColor: mode?.darkMode
                                ? "#0353CC"
                                : "#008C5A",
                            }}
                            onClick={handleAddField}
                          >
                            New Field
                          </button>
                        )}
                      </form>

                      <div style={{ display: "inline-flex" }}>
                        <button
                          className="text-l border border-slate-300 rounded-md p-2 w-full border-none"
                          style={{
                            color: mode?.darkMode ? "white" : "black",
                          }}
                          onClick={() => handleAddOpenModal()}
                        >
                          Edit
                        </button>
                        <button
                          className="text-l border border-slate-300 rounded-md p-2 w-full border-none"
                          style={{
                            color: mode?.darkMode ? "white" : "black",
                          }}
                          onClick={handleDelete}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}

                  {isAddModal && (
                    <CreateContact
                      isOpen={isAddModal}
                      onRequestClose={handleAddCloseModal}
                      selectedRow={selectedRow}
                      setAdded={setAdded}
                      setUpdated={setUpdated}
                      buttonText="Update"
                      setSelectedRow={setSelectedRow}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-[50%] " style={{ display: "flex" }}>
              <TabMenu selectedRow={selectedRow} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default withAuth(ContactDetail);
