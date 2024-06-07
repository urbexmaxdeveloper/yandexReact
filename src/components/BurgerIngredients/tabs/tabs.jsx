import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabs from "../../utils/tab-array";
import styles from "./tabs.module.css";
import PropTypes from "prop-types";

const Tabs = ({ current, handleTabClick }) => {
  return (
    <div className={`${styles.tabContainer}`}>
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

Tabs.propTypes = {
  current: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default Tabs;
