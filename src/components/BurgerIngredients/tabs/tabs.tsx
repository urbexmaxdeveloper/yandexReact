import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabs from "../../utils/tab-array";
import styles from "./tabs.module.css";

interface TabsProps {
  current: string;
  handleTabClick: (value: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ current, handleTabClick }) => {
  return (
    <div className={styles.tabContainer}>
      {tabs.map(({ id, typeName, value }) => (
        <Tab
          key={id}
          value={value}
          active={current === value}
          onClick={() => handleTabClick(value)}
        >
          {typeName}
        </Tab>
      ))}
    </div>
  );
};

export default Tabs;
