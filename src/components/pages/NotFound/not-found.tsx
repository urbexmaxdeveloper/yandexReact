import { Link } from "react-router-dom";
import styles from "./not-found.module.css";
import { ROUTE } from "../../utils/constants";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Упс! Страница не найдена</p>
        <Link to={ROUTE.main} className={styles.link}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
