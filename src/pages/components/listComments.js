import DropDownMenu from "./dropDownMenu";
import {
  updateCommentById,
  deleteCommentById,
  getAllComments,
} from "../api/register";
import { useEffect, useState, useContext } from "react";
import CreateComment from "./createComment";
import ThemeContext from "../../ThemeContext";

const ListComments = ({ setChange }) => {
  const [selectedRow, setSelectedRow] = useState({});
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState(null);

  const mode = useContext(ThemeContext);

  const getCommentDate = (currentDate) => {
    const date = new Date(currentDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear().toString().substr(-2);

    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  useEffect(() => {
    async function fetchData() {
      if (selectedRow._id) {
        const response = await getAllComments(selectedRow._id);
        setData(response.data);
      }
    }
    fetchData();
  }, [selectedRow._id]);

  useEffect(() => {
    setSelectedRow(JSON.parse(localStorage.getItem("selectedRow")));
  }, []);

  const onCreateComment = () => {
    setIsModalOpen(true);
  };

  const handleCommentCloseModal = async () => {
    const comments = await getAllComments(selectedRow._id);
    setData(comments.data);
    setIsModalOpen(false);
  };

  const handleDelete = async (contact_id, comment_id) => {
    const data = await deleteCommentById(contact_id, comment_id);
    if (data.status) {
      const response = await getAllComments(selectedRow._id);
      setData(response.data);
    }
    return data;
  };
  return (
    <>
      {data &&
        data.length &&
        data.map((item) => (
          <div
            key={item._id}
            style={{
              color: mode?.darkMode ? "#fff" : "#000",
              border: `1px solid ${mode?.darkMode ? "#3A3A3A" : "#E2E2E2"}`,
            }}
            className={`flex justify-between items-center rounded-[8px] m-3 p-[13px] pl-[46px] pr-[26px] mb-[20px]`}
          >
            <div>
              <p style={{ color: mode?.darkMode ? "#505050" : "#000" }}>
                {getCommentDate(item.created)}
              </p>
              <p
                style={{ color: mode?.darkMode ? "#fff" : "#000" }}
                className="pt-[10px] pb-[13px]"
              >
                {item.comment}
              </p>
            </div>
            <DropDownMenu
              onEditComment={onCreateComment}
              handleEdit={updateCommentById}
              handleDelete={handleDelete}
              item={item}
              setComment={setComment}
              comment={true}
              setChange={setChange}
            ></DropDownMenu>
          </div>
        ))}
      <button
        onClick={onCreateComment}
        style={{ color: mode?.darkMode ? "#fff" : "#000" }}
        className="fixed bottom-0 right-0 mb-8 mr-8 p-4 rounded-full " //
      >
        Create new
      </button>

      <CreateComment
        isOpen={isModalOpen}
        onRequestClose={handleCommentCloseModal}
        onClose={setIsModalOpen}
        comment={comment}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ListComments;
