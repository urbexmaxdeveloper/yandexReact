import { useState, useRef, FC } from "react";
import styles from "./burger-ingredients.module.css";
import tabs from "../../utils/tab-array";
import IngredientCard from "../ingredient-card/ingredient-card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelectorHook } from "../../services/store/hooks";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const ingredients = useSelectorHook((store) => store.ingredients.ingredients);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabsTitle: { [key: string]: React.RefObject<HTMLHeadingElement> } = {
    bun: useRef<HTMLHeadingElement>(null),
    sauce: useRef<HTMLHeadingElement>(null),
    main: useRef<HTMLHeadingElement>(null),
  };

  const handleTabClick = (value: string): void => {
    setCurrent(value);
    tabsTitle[value].current?.scrollIntoView();
  };

  const getIntersectionBlock = (
    tabsTitle: Record<string, React.RefObject<HTMLHeadingElement>>,
    contentRefTop: number
  ) => {
    const distances = Object.keys(tabsTitle).map((key) => ({
      key,
      distance: Math.abs(
        tabsTitle[key].current!.getBoundingClientRect().bottom - contentRefTop
      ),
    }));

    return distances.reduce((prev, curr) =>
      prev.distance < curr.distance ? prev : curr
    ).key;
  };

  const handleScroll = (): void => {
    const contentRefTop = contentRef.current!.getBoundingClientRect().top;
    setCurrent(getIntersectionBlock(tabsTitle, contentRefTop));
  };

  return (
    <section className={`${styles.burgerIngredients} pt-10`}>
      <h1 className="text text_type_main-medium">Соберите бургер</h1>
      <div className={`${styles.tabContainer} `}>
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
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className={styles.ingredientsList}
      >
        {tabs.map(({ id, typeName, value }) => (
          <div key={id} className={styles.ingredientContent}>
            <h2 ref={tabsTitle[value]}>{typeName}</h2>
            <div className={`${styles.ingredientsMenu} `}>
              {ingredients
                ?.filter((card) => card.type === value)
                .map((ingredient) => (
                  <IngredientCard
                    ingredient={ingredient}
                    key={ingredient._id}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
