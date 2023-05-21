import React, { useState, useEffect, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";

import "react-tabs/style/react-tabs.css";
import ListComments from "./listComments";
import ListInteractions from "./listInteractions";
import { ThemeContext } from "../dashboard";

const TabButton = styled.button`
  position: relative;
  /* Other button styles... */
  color: ${(props) =>
    props.isConditionMet ? "#6a6a6a !important" : "#6a6a6a !important"};
  padding: 6px 12px;

  &:focus::after {
    content: "";
    position: absolute;
    color: ${(props) =>
      props.isConditionMet ? "#ffffff !important" : "#3d9c2e !important"};
    height: 5px;
    left: -4px;
    right: -4px;
    bottom: -5px;
    background: ${(props) =>
      props.isConditionMet ? "#ffffff !important" : "#3d9c2e !important"};
  }
`;

function TabMenu() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState({});
  const mode = useContext(ThemeContext);

  useEffect(() => {
    setSelectedRow(JSON.parse(localStorage.getItem("selectedRow")));
  }, []);

  const handleTabClick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <Tabs selectedIndex={selectedIndex} onSelect={handleTabClick}>
      <TabList disabledTabClassName="react-tabs__tab--selected">
        <Tab isConditionMet={mode?.darkMode}>Comments</Tab>
        <Tab isConditionMet={mode?.darkMode}>Interactions</Tab>
        <Tab isConditionMet={mode?.darkMode}>Reminders</Tab>
      </TabList>
      <h1 className="border border-[#3A3A3A]"></h1>

      <TabPanel>
        <ListComments />
      </TabPanel>

      <TabPanel>
        <ListInteractions />
      </TabPanel>
    </Tabs>
  );
}

export default TabMenu;
