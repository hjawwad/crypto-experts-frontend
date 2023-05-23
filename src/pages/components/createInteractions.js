import ReactModal from "react-modal";
import { useEffect, useState, useContext } from "react";
import { createInteraction, updateInteractionById } from "../api/register";
import ThemeContext from "../utils";

ReactModal.setAppElement("#__next");

function CreateInteractions({
  isOpen,
  onRequestClose,
  selectedRow,
  interaction,
}) {
  const customStyles = {
    content: {
      maxWidth: "600px",
      width: "600px",
      minHeight: "700px",
    },
    overlay: {},
  };
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const mode = useContext(ThemeContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = "";
    try {
      if (!interaction) {
        response = await createInteraction(selectedRow._id, {
          name: eventName,
          date: date,
          location: location,
          description: description,
        });

        setSuccessMessage("Create Interaction successful!");
        setError(null);
        handleLoginClick();
      } else {
        response = await updateInteractionById(
          selectedRow._id,
          {
            name: eventName,
            date: date,
            location: location,
            description: description,
          },
          interaction._id
        );

        setSuccessMessage("Update Interaction successfully!");
        setError(null);
        handleLoginClick();
      }
    } catch (error) {
      setError("Create Interaction failed. Please try again later.");
      setSuccessMessage(null);
    }
    onRequestClose();
  };

  useEffect(() => {
    if (interaction) {
      setDate(interaction.date);
      setEventName(interaction.name);
      setLocation(interaction.location);
      setDescription(interaction.description);
    }
  }, [interaction]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit} className="p-[16px] pl-[55px] pr-[55px] ">
        <div className="pb-[47px]">
          <label className="pb-[6px] text-[#999999] text-xl " htmlFor="email">
            Event Name
          </label>
          <input
            style={{
              backgroundColor: mode?.darkMode ? "#000" : "#fff",
              color: mode?.darkMode ? "#fff" : "#000",
            }}
            type="name"
            className="w-full text-xl border border-slate-300 rounded-[8px] p-2 pl-5"
            id="name"
            placeholder="Name of the event"
            onChange={(event) => setEventName(event.target.value)}
            value={eventName}
          />
        </div>
        <div className="pb-[13px]">
          <label
            className="pb-[6px] text-[#999999] text-xl mr-[17px]"
            htmlFor="email"
          >
            Date
          </label>
          <input
            style={{
              backgroundColor: mode?.darkMode ? "#000" : "#fff",
              color: mode?.darkMode ? "#fff" : "#000",
            }}
            type="date"
            className="mr-[-30px] text-center  bg-black text-xl border border-slate-300 rounded-[8px] p-2 pl-5"
            id="name"
            placeholder="date"
            onChange={(event) => setDate(event.target.value)}
            value={date}
          />
        </div>
        <div className="pb-[57px]">
          <label
            style={{ width: "300px" }}
            className="pb-[6px] text-[#999999] text-xl mr-[17px]"
            htmlFor="email"
          >
            Location
          </label>
          <input
            style={{
              backgroundColor: mode?.darkMode ? "#000" : "#fff",
              color: mode?.darkMode ? "#fff" : "#000",
            }}
            type="name"
            className="text-center bg-black text-xl border border-slate-300 rounded-[8px] bg-black p-2 pl-5"
            id="name"
            placeholder="location"
            onChange={(event) => setLocation(event.target.value)}
            value={location}
          />
        </div>
        <div>
          <label className="pb-[6px] text-[#999999] text-xl " htmlFor="email">
            Description
          </label>
          <textarea
            style={{
              backgroundColor: mode?.darkMode ? "#000" : "#fff",
              color: mode?.darkMode ? "#fff" : "#000",
            }}
            className="w-full bg-black p-[13px] pl-[34px] pr-[34px] rounded-[8px]  border border-slate-300"
            id="message"
            name="message"
            rows="5"
            placeholder="Description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          ></textarea>
        </div>
        <button
          style={{
            backgroundColor: mode?.darkMode ? "#fff" : "#000",
            color: mode?.darkMode ? "#000" : "#fff",
          }}
          onClick={onRequestClose}
          className="w-[100px] fixed bottom-0  mb-8 ml-8 p-4 rounded-[8px] text-black bg-white border border-white"
        >
          Cancel
        </button>
        <button
          style={{
            backgroundColor: mode?.darkMode ? "#000" : "#008C5A",
            color: "#fff",
          }}
          onClick={handleSubmit}
          className="w-[100px] fixed bottom-0 rounded-[8px] right-0 mb-8 mr-8 p-4 text-white"
        >
          Save
        </button>
      </form>
    </ReactModal>
  );
}

export default CreateInteractions;
