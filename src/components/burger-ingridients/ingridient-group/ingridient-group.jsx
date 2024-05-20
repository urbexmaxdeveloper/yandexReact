import IngredientCard from "../ingridient-card/ingridient-card";
import ingridientsStyle from "./ingridient-group.module.css";

const IngridientGroup = ({ title, ingridients }) => {
  return (
    <>
      <>
        <h1>{title}</h1>
      </>
      <div className={ingridientsStyle.items}>
        {ingridients.length > 0 &&
          ingridients.map((ingridient) => (
            <IngredientCard ingridient={ingridient} key={ingridient._id} />
          ))}
      </div>
    </>
  );
};

export default IngridientGroup;
