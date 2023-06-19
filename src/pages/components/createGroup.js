import ReactModal from "react-modal";
import { useEffect, useState, useContext } from "react";
import { createGroup, updateGroupById } from "../api/register";
import showErrorAlert from "./utility/showErrorAlert";
import showSuccessAlert from "./utility/showSuccessAlert";
import ThemeContext from "../../ThemeContext";

ReactModal.setAppElement("#__next");

function CreateGroup({ isOpen, onRequestClose, group }) {
  const mode = useContext(ThemeContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      const img = document.createElement("img");
      img.src = event.target.result;
      document.body.appendChild(img);
      img.style.display = "none";
      setSelectedFile(img.src);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      showErrorAlert("Group name is required");
      return;
    }
    setIsLoading(true);

    try {
      let response = "";
      if (!group) {
        response = await createGroup(name, selectedFile);
      } else {
        response = await updateGroupById(group._id, {
          name,
          icon: selectedFile,
        });
      }

      if (response.status) {
        showSuccessAlert(response.message);
        setIsLoading(false);
        setName("");
        setSelectedFile(null);
      } else {
        showErrorAlert("Something went wrong!");
        return;
      }
    } catch (error) {
      showErrorAlert("Group Creation failed. Please try again later.");
    }
    onRequestClose();
  };

  useEffect(() => {
    if (group) {
      setName(group?.name);
    }
  }, [group]);

  const customStyles = {
    content: {
      maxWidth: "500px",
      width: "500px",
      height: "200px",
      backgroundColor: mode?.darkMode ? "#191919" : "white",
    },
    overlay: {},
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form onSubmit={handleSubmit}>
        <div className="pb-[47px]">
          <input
            type="name"
            className={`w-full text-xl border border-slate-300 rounded-[16px] p-2 pl-5 ${
              mode?.darkMode ? "bg-[#191919]" : ""
            }`}
            id="name"
            placeholder="Name of the group"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <button
          onClick={onRequestClose}
          className={`w-[120px] fixed bottom-0  mb-8 ml-8 p-4 rounded-[10px] border border-white ${
            mode?.darkMode ? "text-white" : "bg-[#000] text-white"
          }`}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`w-[120px] fixed bottom-0 rounded-[10px] right-0 mb-8 mr-8 p-4 border border-white ${
            mode?.darkMode ? "text-white" : "bg-[#008C5A] text-white"
          }`}
        >
          {isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </ReactModal>
  );
}

export default CreateGroup;
