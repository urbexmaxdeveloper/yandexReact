import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingridient-card.module.css";

const IngredientCard = ({ ingridient }) => {
  if (!ingridient) {
    return null;
  }
  return (
    <div className={styles.details} key={ingridient._id}>
      <img src={ingridient.image} alt={ingridient.name} />
      <div className={styles.cost_block}>
        <p className="text text_type_main-default ">{ingridient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <div >
        <p  align="center" className="text text_type_main-default">{ingridient.name}</p>
      </div>
    </div>
  );
};

export default IngredientCard;
