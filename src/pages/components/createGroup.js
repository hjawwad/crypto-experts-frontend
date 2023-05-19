import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { createGroup, updateGroupById } from "../api/register";
import showErrorAlert from "./utility/showErrorAlert";
import showSuccessAlert from "./utility/showSuccessAlert";

ReactModal.setAppElement("#__next");

function CreateGroup({ isOpen, onRequestClose, group }) {
  const customStyles = {
    content: {
      maxWidth: "500px",
      width: "500px",
      minHeight: "500px",
    },
    overlay: {},
  };
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
      showErrorAlert("Group name and logo is required");
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
            className="w-full bg-black text-xl border border-slate-300 rounded-[16px] bg-black p-2 pl-5"
            id="name"
            placeholder="Name of the group"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="pb-[47px]">
          <input
            type="file"
            onChange={handleFileInputChange}
            className="w-full bg-black text-xl border border-slate-300 rounded-[16px] bg-black p-2 pl-5"
            accept="image/*"
          />
        </div>
        <button
          onClick={onRequestClose}
          className="w-1/3 fixed bottom-0 left-0 mb-8 ml-8 p-4 rounded-[8px] text-black bg-white rounded-[8px] border border-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-1/3 fixed bottom-0 right-0 mb-8 mr-8 p-4 text-white"
        >
          {isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </ReactModal>
  );
}

export default CreateGroup;
