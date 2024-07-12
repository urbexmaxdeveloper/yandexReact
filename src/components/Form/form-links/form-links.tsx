import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../utils/constants";
import styles from "./form-link.module.css";

interface LinkBlockProps {
  textBeforeLink: string;
  linkText: string;
  to: string;
}

const LinkBlock: FC<LinkBlockProps> = ({ textBeforeLink, linkText, to }) => {
  return (
    <div className={styles.linkContent}>
      <span className="text text_type_main-default text_color_inactive mr-2">
        {textBeforeLink}
      </span>
      <Link className={styles.link} to={`/${to}`}>
        {linkText}
      </Link>
    </div>
  );
};

export const LoginLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <LinkBlock
        textBeforeLink="Вы - новый пользователь?"
        linkText="Зарегистрироваться"
        to={ROUTE.mainLayout.register}
      />
      <LinkBlock
        textBeforeLink="Забыли пароль?"
        linkText="Восстановить пароль"
        to={ROUTE.mainLayout.forgotPass}
      />
    </main>
  );
};

export const RegisterLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <LinkBlock
        textBeforeLink="Уже зарегистрированы?"
        linkText="Войти"
        to={ROUTE.mainLayout.login}
      />
    </main>
  );
};

export const ForgotLinks: FC = (): JSX.Element => {
  return (
    <main className={styles.links}>
      <LinkBlock
        textBeforeLink="Вспомнили пароль?"
        linkText="Войти"
        to={ROUTE.mainLayout.login}
      />
    </main>
  );
};
