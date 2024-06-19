import React, { useState } from "react";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks/use-form";
import { ROUTE } from "../../utils/constants";
import { Form } from "../../Form/form";
import { ForgotLinks } from "../../Form/form-links/form-links";
import { forgotPassword } from "../../services/slices/user-slice/auth";

export const ForgotPassword = () => {
  const { formState, onChange } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    forgotPassword(formState.forgot)
      .then((res) => {
        navigate(ROUTE.mainLayout.resetPass);
        localStorage.setItem("forgotSuccess", JSON.stringify(res.message));
      })
      .catch((err) => {
        setError(err.message || "Произошла ошибка при восстановлении пароля.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <p>Загрузка</p>
      ) : (
        <Form
          onSubmit={onSubmit}
          linkComponent={ForgotLinks}
          title="Восстановление пароля"
        >
          <Input
            type="email"
            placeholder={"Укажите e-mail"}
            name={"forgot"}
            size={"default"}
            extraClass="ml-1"
            value={formState.forgot || ""}
            onChange={onChange}
            autoComplete="email"
          />
          <Button htmlType="submit" type="primary" size="large">
            Восстановить
          </Button>
        </Form>
      )}
      {error && <p className="error-message">{error}</p>}{" "}
    </>
  );
};
