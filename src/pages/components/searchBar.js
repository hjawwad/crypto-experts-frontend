import { useRef, useContext } from "react";
import CommandIcon from "./svg-icons/command-icon";
import KIcon from "./svg-icons/k-icon";
import ThemeContext from "./utils";

const SearchBar = () => {
  const clickPoint = useRef();
  const mode = useContext(ThemeContext);
  const handleFocus = () => {
    clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
    clickPoint.current.style.display = "block";
  };

  return (
    <div
      className="items-center px-4 flex justify-center mb-5"
      style={{ marginBottom: "40px" }}
    >
      <div className="relative mr-5  border-slate-300 rounded-md  ml-5 ">
        <div className="absolute top-3 left-3 items-center " ref={clickPoint}>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          className="block pl-10 w-50 h-10 text-white-900  rounded-lg   "
          style={{ backgroundColor: mode?.darkMode ? "#292929" : "#FFFAF0" }}
          placeholder="Search Here..."
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div
          className="absolute border-slate-300 rounded-md  ml-5"
          style={{
            right: 5,
            top: 7,
          }}
        >
          <KIcon />
        </div>
        <div
          className="absolute border-slate-300 rounded-md  ml-5"
          style={{
            right: 35,
            top: 7,
          }}
        >
          <CommandIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
