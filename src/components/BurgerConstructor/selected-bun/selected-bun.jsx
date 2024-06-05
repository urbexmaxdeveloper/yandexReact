import styles from "./selected-bun.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

export const SelectedBun = ({
  isHover,
  selectedBun,
  position,
  ingredientType,
}) => {
  return selectedBun ? (
    <div className={styles.bun}>
      <ConstructorElement
        type={position}
        isLocked
        text={`${selectedBun?.name} (${position === "top" ? "верх" : "низ"})`}
        price={selectedBun?.price}
        thumbnail={selectedBun?.image}
      />
    </div>
  ) : (
    <div
      className={`${styles.element} ${
        position === "top" ? styles.positionTop : styles.positionBottom
      } ${isHover && ingredientType === "bun" && styles.borderClass}`}
    >
      <p className="text text_type_main-medium">Выберите булку</p>
    </div>
  );
};
