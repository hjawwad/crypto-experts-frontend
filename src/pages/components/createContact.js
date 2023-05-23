import ReactModal from "react-modal";
import { useState, useRef, useEffect, useContext } from "react";
import { createContactByGroup, updateContactByGroup } from "../api/register";
import showErrorAlert from "./utility/showErrorAlert";
import showSuccessAlert from "./utility/showSuccessAlert";
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
import "react-datepicker/dist/react-datepicker.css";
var moment = require("moment");
import DatePicker from "react-datepicker";
import ThemeContext from "../../ThemeContext";
import Cross from "./../../../public/cross.svg";
import Image from "next/image";

ReactModal.setAppElement("#__next");

function CreateContact({
  isOpen,
  onRequestClose,
  selectedGroup,
  selectedRow,
  setAdded,
  setUpdated,
  buttonText,
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [university, setUniversity] = useState("");
  const [meet, setMeet] = useState("");
  const [dob, setDOB] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [twitter, setTwitter] = useState("");
  const [company, setCompany] = useState("");
  const mode = useContext(ThemeContext);

  const customStyles = {
    content: {
      maxWidth: "495px",
      width: "700px",
      backgroundColor: mode?.darkMode ? mode?.color.dark : "white",
    },
    overlay: {},
  };

  const customBackground = {
    backgroundColor: mode?.darkMode ? mode?.color.dark : mode?.color.white,
  };

  useEffect(() => {
    if (buttonText === "Update" && selectedRow) {
      setName(selectedRow.name || "");
      setImage(selectedRow.image || "");
      setPhone(selectedRow.phone || "");
      setTag(selectedRow.tag || "");
      setJob(selectedRow.job || "");
      setEmail(selectedRow.email || "");
      setStatus(selectedRow.status || "");
      setCountry(selectedRow.country || "");
      setCity(selectedRow.city || "");
      setUniversity(selectedRow.university || "");
      setMeet(selectedRow.meet || "");
      setTwitter(selectedRow.twitter || "");
      setLinkedIn(selectedRow.linkedin || "");
      setCompany(selectedRow.company_name || "");
      setDOB(selectedRow.dob === "" ? "" : new Date(selectedRow.dob) || "");
      // setConnections(selectedRow.connections || []);
      // setCompanies(selectedRow.companies || [{ name: "", logo: null }]);
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      document.body.appendChild(img);
      setImage(img.src);
      img.style.display = "none";
    };
    reader.readAsDataURL(file);
  };

  const handleCompanyLogoInputChange = (index, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      document.body.appendChild(img);
      img.style.display = "none";
      const companiesCopy = [...companies];

      // Modify the copy at the specified index
      companiesCopy[index].logo = img.src;

      // Update the state with the modified copy
      setCompanies(companiesCopy);
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const contactData = {
        name: name,
        company_name: company,
        email: email,
        tag: tag,
        city: city,
        country: country,
        job: job,
        phone: phone,
        linkedin: linkedin,
        twitter: twitter,
        dob: dob,
        meet: meet,
        group_id: selectedGroup?._id,
      };

      let responseContact;
      if (buttonText != "Update") {
        responseContact = await createContactByGroup(
          selectedGroup?._id,
          contactData
        );
        setName("");
        setImage("");
        setTag("");
        setPhone("");
        setJob("");
        setEmail("");
        setStatus("");
        setUniversity("");
        setMeet("");
        setDOB("");
        // setConnections("");
      } else {
        responseContact = await updateContactByGroup(
          selectedRow?.group_id,
          contactData,
          selectedRow._id
        );
      }

      setIsLoading(false);
      if (responseContact.status) {
        if (buttonText !== "Update") setAdded(true);
        else {
          localStorage.setItem(
            "selectedRow",
            JSON.stringify(responseContact.data.data)
          );
          setUpdated(true);
        }
        showSuccessAlert(responseContact.message);
      } else {
        showErrorAlert("Something went wrong!");
        return;
      }
    } catch (error) {
      showErrorAlert(error);
      return;
    }

    setIsLoading(false);
    onRequestClose();
  };

  const handleBOD = (dateStr) => {
    setDOB(dateStr);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      overlayClassName="p-0"
    >
      <div
        className=" w-full pt-1 pl-2 "
        style={{
          overflow: "hidden",
          backgroundColor: mode?.darkMode
            ? mode?.color.dark
            : mode?.color.white,
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: mode?.darkMode ? mode?.color.dark : "#ABABAB",
          }}
        >
          Create persona
        </h1>
        <div className="w-full p-[20px] pb-[5px]">
          <div className="items-center justify-center  pb-[22px]">
            <form onSubmit={handleFormSubmit} className="text-left pt-5">
              <div>
                <div className=" border-none border-0 ">
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <PersonIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      placeholder="Name & Surname"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <AlternateEmailIcon />
                    </div>
                    <input
                      type="email"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5 "
                      style={customBackground}
                      id="name"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Email"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <LocalOfferIcon />
                    </div>

                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="name"
                      onChange={(e) => setTag(e.target.value)}
                      value={tag}
                      placeholder="Tags"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <GroupsIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="name"
                      onChange={(e) => setMeet(e.target.value)}
                      value={meet}
                      placeholder="Where did we meet?"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <CakeIcon />
                    </div>
                    <DatePicker
                      dateFormat="dd-MM-yyyy"
                      selected={dob}
                      value={
                        dob !== ""
                          ? moment(dob).format("DD-MM-YYYY")
                          : "Birthday"
                      }
                      onChange={(date) => handleBOD(date)}
                      className={`pb-[6px] pt-[5px] pl-2 text-xl text-[#ABABAB] border-slate-300 rounded-md  ml-5 ${
                        mode?.darkMode ? "bg-[#1f1f1f]" : "bg-white"
                      }`}
                      // useWeekdaysShort={true}
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <LocalPhoneIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      placeholder="Phone"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <PlaceIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="city"
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      placeholder="City"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <PlaceIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="country"
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      placeholder="Country"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <LinkedInIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="linkedin"
                      onChange={(e) => setLinkedIn(e.target.value)}
                      value={linkedin}
                      placeholder="LinkedIn"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <TwitterIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="twitter"
                      onChange={(e) => setTwitter(e.target.value)}
                      value={twitter}
                      placeholder="Twitter"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <WorkOutlineIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="job"
                      onChange={(e) => setJob(e.target.value)}
                      value={job}
                      placeholder="Job"
                    />
                  </div>
                  <div
                    className="pb-[25px] mr-[5px]"
                    style={{ display: "flex" }}
                  >
                    <div className="pb-[6px] text-[#ABABAB]">
                      <BusinessIcon />
                    </div>
                    <input
                      type="text"
                      className="text-xm text-[#ABABAB] pl-2 border-slate-300 rounded-md  ml-5"
                      style={customBackground}
                      id="company"
                      onChange={(e) => setCompany(e.target.value)}
                      value={company}
                      placeholder="Company"
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <button
                      type="submit"
                      className="text-xm text-[#fff] border border-slate-300 rounded-md p-2  border-none"
                      style={{
                        customBackground,
                        backgroundColor: mode?.darkMode ? "" : "#008C5A",
                      }}
                    >
                      {isLoading ? "Creating" : buttonText}
                    </button>
                    <button
                      onClick={onRequestClose}
                      className="text-xm text-[#fff]  border border-slate-300 rounded-md p-2 border-none"
                      style={{
                        backgroundColor: mode?.darkMode ? "" : "#000",
                        marginLeft: "2vh",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

export default CreateContact;
