import { useState, useEffect } from "react";
import Image from "next/image";
import CreateGroup from "./createGroup";
import { getAllGroups } from "../api/register";
import Cookies from "js-cookie";

const { API_ENDPOINT } =
  process.env || "https://crypto-experts-backend.herokuapp.com/";
const Sidebar = ({ setSelectedGroup, selectedGroup, added, setTitle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [addGroup, setAddGroup] = useState(false);
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("session_token");

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

  return (
    <div className="w-[307px] min-w-[307px] p-[50px] pl-[40px] pr-[40px] border border-[#303030]">
      <div className="flex w-full pb-[30px]">
        <div className="text-xl flex-1 cursor-pointer" onClick={toggleDropdown}>
          &#9660;&nbsp; <span>Contact</span>
        </div>
        <div
          className="text-xl text-right flex-1 cursor-pointer"
          onClick={handleAddGroup}
        >
          &#43;
        </div>
      </div>
      {isOpen && (
        <div>
          {data &&
            data.length &&
            data.map((item) => (
              <div
                className={`p-[10px] mt-[20px] mb-[20px] cursor-pointer ${isSelected(
                  item.data
                )}`}
                key={item.data.name}
              >
                <div
                  className="flex w-full"
                  onClick={() => setSelectedGroup(item.data)}
                >
                  <div className="text-base ">
                    {item.data.icon === "" ? (
                      <></>
                    ) : (
                      <Image
                        src={`https://crypto-experts-backend.herokuapp.com/${item.data.icon}`}
                        alt="Sidebar Logo"
                        className="inline-flex rounded-full"
                        width={20}
                        height={20}
                        priority
                      />
                    )}
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
      <CreateGroup isOpen={addGroup} onRequestClose={handleAddGroup} />
    </div>
  );
};

export default Sidebar;
