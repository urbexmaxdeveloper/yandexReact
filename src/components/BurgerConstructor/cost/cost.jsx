import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import costStyles from "./cost.module.css";

const Cost = ({ cost }) => (
  <div className={costStyles.cost_label}>
    <p className="text text_type_digits-medium">{cost}</p>
    <CurrencyIcon type="primary" />
  </div>
);

Cost.propTypes = {
  cost: PropTypes.number.isRequired,
};

export default Cost;
