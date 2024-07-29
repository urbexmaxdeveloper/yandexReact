import { FC } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import costStyles from "./cost.module.css";

interface CostProps {
  cost: number;
}

const Cost: FC<CostProps> = ({ cost }) => (
  <div data-cy="total-price" className={costStyles.cost_label}>
    <p className="text text_type_digits-medium">{cost}</p>
    <CurrencyIcon type="primary" />
  </div>
);

export default Cost;
