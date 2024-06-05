import costStyles from "./cost.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const Cost = (props) => {
  return (
    <div className={costStyles.cost_label}>
      <p className="text text_type_digits-medium">{props.cost}</p>
      <CurrencyIcon type="primary" />
    </div>
  );
};
Cost.propTypes = {
  cost: PropTypes.number.isRequired,
};

export default Cost;
