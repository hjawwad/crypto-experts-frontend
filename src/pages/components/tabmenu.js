import React, { useState, useEffect, useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styled from "styled-components";

import "react-tabs/style/react-tabs.css";
import ListComments from "./listComments";
import ListInteractions from "./listInteractions";
import CreateComment from "./createComment";
import CreateInteractions from "./createInteractions";
import { getAllComments, getAllInteractions } from "../api/register";
import ThemeContext from "../utils";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const mode = useContext(ThemeContext);

  const [data, setData] = useState(null);
  const [interactions, setInteractions] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (selectedRow._id) {
        const response = await getAllComments(selectedRow._id);
        setData(response.data);
        const interact = await getAllInteractions(selectedRow._id);
        setInteractions(interact.data);
      }
    }
    fetchData();
  }, [selectedRow._id]);

  useEffect(() => {
    setSelectedRow(JSON.parse(localStorage.getItem("selectedRow")));
  }, []);

  const handleTabClick = (index) => {
    setSelectedIndex(index);
  };
  return (
    <Tabs selectedIndex={selectedIndex} onSelect={handleTabClick}>
      <TabList disabledTabClassName="react-tabs__tab--selected">
        {/* <Tab>Reminders</Tab> */}
        <TabButton isConditionMet={mode.darkMode}>Reminder</TabButton>
        <TabButton isConditionMet={mode.darkMode}>Comments</TabButton>
        <TabButton isConditionMet={mode.darkMode}>Interactions</TabButton>
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
