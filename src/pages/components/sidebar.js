import { useState, useEffect } from "react";
import Image from "next/image";
import CreateGroup from "./createGroup";
import { getAllGroups } from "../api/register";
import Cookies from "js-cookie";
import SearchBar from "./searchBar";
import GroupIcon from "./svg-icons/group-icon";
import ProfileIcon from "./svg-icons/profile-icon";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import LogoutCard from "./svg-icons/logout-card";

const Sidebar = ({
  setSelectedGroup,
  selectedGroup,
  added,
  setTitle,
  setTableShow,
  setShowDetail,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addGroup, setAddGroup] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("session_token");
  const [selected, setSelected] = useState(false);

  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    getAllGroupNames();
  };

  const handleAddGroup = () => {
    setAddGroup(!addGroup);
    getAllGroupNames();
  };

  const isSelected = (current) => {
    if (selectedGroup._id === current._id) {
      setTitle(selectedGroup?.name);
      setShowDetail(false);
      return "bg-[#1A1A1A] rounded";
    }
    return "";
  };
  const getAllGroupNames = async () => {
    setIsLoading(true);

    try {
      const response = await getAllGroups();
      await setData(response.data);
      await setSelectedGroup(response.data[0].data);
      setError(null);
    } catch (error) {
      //
    }

    setIsLoading(false);
  };
  useEffect(() => {
    async function fetchData() {
      await getAllGroupNames();
    }
    console.log("fetxh data", token);
    if (token) {
      fetchData();
    }
  }, [added]);

  const handleLogout = (e) => {
    e.preventDefault();
    // clear the token from cookies
    destroyCookie(null, "session_token");
    // redirect to the login page
    router.push("/");
  };

  return (
    <div
      className="w-[250px] min-w-[250px] bg-[#1f1f1f] border border-[#303030]"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ justifyContent: "flex-start" }}>
        <div
          className="text-[20px] pl-2 pt-2 text-[#808080] ml-[22px] mt-[30px] cursor-pointer bg-[#292929] rounded-md border border-[#303030] w-[200px] h-[45px] "
          style={{
            display: "inline-flex",
          }}
        >
          <div>
            <ProfileIcon />
          </div>
          <div>Gabriele M.</div>
        </div>
        <div className="mt-[10px] ml-[2px] " style={{ fontSize: "13.5px" }}>
          <SearchBar />
        </div>
        <div>
          <div
            className="text-[#808080] ml-[30px]"
            style={{
              fontWeight: "500px",
              fontSize: "16px",
              marginBottom: "20px",
            }}
          >
            CRM
          </div>
          <div className="ml-[25px]">
            <div className="flex w-full pb-[10px]">
              <div>
                <GroupIcon />
              </div>
              <div
                className="text-[14px] text-[#808080] pl-2 flex-1 cursor-pointer"
                onClick={toggleDropdown}
              >
                <span>Groups</span>
              </div>
            </div>

            {isOpen && (
              <div className="pl-5">
                {data?.map((item) => (
                  <div
                    className={`p-[8px] w-[24vh] mb-[10px] cursor-pointer  ${isSelected(
                      item.data
                    )}`}
                    key={item.data.name}
                  >
                    <div
                      className="flex w-full "
                      onClick={() => {
                        setSelectedGroup(item.data);
                        setTableShow(true);
                      }}
                    >
                      <div className="text-base text-[#808080]">
                        &nbsp; <span>{item.data.name}</span>
                      </div>
                      <div className="text-base text-right text-[#808080] flex-1">
                        {item?.count}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className=" flex">
              <div className="text-xl  flex-[0.2] cursor-pointer text-[#808080] ">
                &#43;
              </div>
              <div
                className=" text-[#808080] pt-1 pr-5 "
                onClick={handleAddGroup}
              >
                New Group
              </div>
            </div>
            <CreateGroup isOpen={addGroup} onRequestClose={handleAddGroup} />
          </div>
        </div>
      </div>
      <div style={{ justifyContent: "flex-end" }}>
        <div className="ml-3 text-[18px] mb-5  text-[#808080]">Settings</div>
        <div className="ml-auto flex items-center pr-[15px] cursor-pointer">
          <span className="ml-2 text-gray-800 font-medium pr-[15px] text-white">
            <LogoutCard />
          </span>
          <div onClick={handleLogout} className=" text-[#808080]">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
