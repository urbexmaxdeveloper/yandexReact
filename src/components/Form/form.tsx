import React, { FC, ReactNode, FormEvent } from "react";
import styles from "./form.module.css";

type FormProps = {
  title: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  linkComponent?: React.ElementType;
  children: ReactNode;
};

export const Form: FC<FormProps> = ({
  children,
  title,
  onSubmit,
  linkComponent: Links,
}) => {
  return (
    <section>
      <div className={`${styles.sign}`}>
        <form onSubmit={onSubmit} className={styles.signForm}>
          <h1 className={`${styles.heading} text text_type_main-medium`}>
            {title}
          </h1>
          {children}
        </form>
        {Links && <Links />}
      </div>
    </section>
  );
};
