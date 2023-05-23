import * as React from "react";
import { useContext } from "react";
import ThemeContext from "../../../ThemeContext";

function KIcon(props) {
  const mode = useContext(ThemeContext);
  return (
    <svg
      width={28}
      height={24}
      viewBox="0 0 28 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x={0.5}
        y={0.5}
        width={27}
        height={23}
        rx={3.5}
        fill={mode?.darkMode ? "#141414" : "#FFFAF0"}
      />
      <path
        d="M10.233 17V6.818h1.233v5.051h.12l4.573-5.05h1.61l-4.275 4.593L17.77 17h-1.492l-3.54-4.733-1.272 1.432V17h-1.233z"
        fill="gray"
      />
      <rect x={0.5} y={0.5} width={27} height={23} rx={3.5} stroke="#2B2B2B" />
    </svg>
  );
}

export default KIcon;
