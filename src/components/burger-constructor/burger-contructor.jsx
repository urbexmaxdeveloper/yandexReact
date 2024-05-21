import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-contructor.module.css";
import data from "../../sample-data/sample-data.json";
import Cost from "./cost/cost";
import BurgerComponent from "./burger-component/burger-component";

export default function BurgerConstructor() {
  const filteredBuns = data.filter((item) => item.type === "bun");
  const filteredSauces = data.filter((item) => item.type === "sauce");
  const filteredMains = data.filter((item) => item.type === "main");
  return (
    <>
      <div className=""></div>
      <BurgerComponent component={filteredBuns[0]} type="top" />
      <div className={styles.container}>
        <BurgerComponent component={filteredSauces[0]} isDrag={true} />
        <BurgerComponent component={filteredMains[0]} isDrag={true} />
        <BurgerComponent component={filteredSauces[0]} isDrag={true} />
        <BurgerComponent component={filteredSauces[1]} isDrag={true} />
        <BurgerComponent component={filteredMains[1]} isDrag={true} />
        <BurgerComponent component={filteredSauces[1]} isDrag={true} />
        <BurgerComponent component={filteredSauces[2]} isDrag={true} />
        <BurgerComponent component={filteredMains[2]} isDrag={true} />
        <BurgerComponent component={filteredSauces[2]} isDrag={true} />
      </div>
      <BurgerComponent component={filteredBuns[0]} type="bottom" />
      <div className={styles.cost_block}>
          <Cost cost="600" />
          <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>      
      </div>
    </>
  );
}
