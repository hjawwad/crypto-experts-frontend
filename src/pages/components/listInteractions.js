import DropDownMenu from "./dropDownMenu";
import {
  updateInteractionById,
  deleteInteractionById,
  getAllInteractions,
} from "../api/register";
import { useContext, useEffect, useState } from "react";
import CreateInteractions from "./createInteractions";
import ThemeContext from "../utils";

const ListInteractions = ({ setChange }) => {
  const [selectedRow, setSelectedRow] = useState({});
  const [interactions, setInteractions] = useState(null);
  const [interaction, setInteraction] = useState(null);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);

  const mode = useContext(ThemeContext);

  const getInteractionMonth = (currentDate) => {
    const date = new Date(currentDate);
    return date.toLocaleString("default", { month: "short" });
  };

  const getInteractionDate = (currentDate) => {
    const date = new Date(currentDate);
    return date.getDate().toString().padStart(2, "0");
  };

  useEffect(() => {
    async function fetchData() {
      if (selectedRow._id) {
        const interact = await getAllInteractions(selectedRow._id);
        setInteractions(interact.data);
      }
    }
    fetchData();
  }, [selectedRow._id]);

  useEffect(() => {
    setSelectedRow(JSON.parse(localStorage.getItem("selectedRow")));
  }, []);

  const onCreateInteractions = () => {
    setIsInteractionModalOpen(true);
  };

  const handleInteractionCloseModal = async () => {
    const interact = await getAllInteractions(selectedRow._id);
    setInteractions(interact.data);
    setIsInteractionModalOpen(false);
  };

  const handleDelete = async (contact_id, interaction_id) => {
    const data = await deleteInteractionById(contact_id, interaction_id);
    if (data.status) {
      const response = await getAllInteractions(selectedRow._id);
      setInteractions(response.data);
    }
    return data;
  };

  return (
    <>
      {interactions &&
        interactions.length &&
        interactions.map((item) => (
          <div
            key={item._id}
            style={{ color: mode?.darkMode ? "#fff" : "#000" }}
            className="flex justify-between items-center m-3 border border-[#303030] rounded-[8px]"
          >
            <div className="flex items-center m-2">
              <div className="mr-[19px] text-center rounded-[8px] border border-[#313131] pl-[20px] pr-[20px]">
                <p className="text-[#F66363] text-[18px]">
                  {getInteractionMonth(item.date)}
                </p>
                <p className="text-[18px]">{getInteractionDate(item.date)}</p>
              </div>
              <div className="pb-[20px]">
                <p className="text-l pt-[20px]">{item.name}</p>
                <span>{item.description}. </span>
              </div>
            </div>
            <DropDownMenu
              handleEdit={updateInteractionById}
              handleDelete={handleDelete}
              item={item}
              onCreateInteractions={onCreateInteractions}
              setInteraction={setInteraction}
              interaction={true}
              setChange={setChange}
            ></DropDownMenu>
          </div>
        ))}
      <button
        onClick={onCreateInteractions}
        style={{ color: mode?.darkMode ? "#fff" : "#000" }}
        className="fixed bottom-0 right-0 mb-8 mr-8 p-4 rounded-full" //</TabPanel>"
      >
        Create new
      </button>
      <CreateInteractions
        isOpen={isInteractionModalOpen}
        onRequestClose={handleInteractionCloseModal}
        selectedRow={selectedRow}
        interaction={interaction}
      />
    </>
  );
};

export default ListInteractions;
