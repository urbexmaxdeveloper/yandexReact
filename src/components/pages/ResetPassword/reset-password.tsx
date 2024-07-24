import { FormEvent, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/slices/user-slice/auth";
import { ROUTE } from "../../utils/constants";
import { useForm } from "../../../hooks/use-form";
import { Form } from "../../Form/form";
import { ForgotLinks } from "../../Form/form-links/form-links";
import { IUserResetPassword } from "../../types/user-types";

export const ResetPassword = () => {
  const { formState, onChange } = useForm<IUserResetPassword>({
    token: "",
    password: "",
  });
  const navigate = useNavigate();
  const [requestError, setRequestError] = useState<boolean>(false);
  const forgotSuccess: string | null = localStorage.getItem("forgotSuccess");

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPassword(formState)
      .then((res) => {
        if (res && res.success) {
          localStorage.removeItem("forgotSuccess");
          navigate(`/${ROUTE.mainLayout.login}`);
        }
      })
      .catch((error) => {
        console.error(error);
        setRequestError(true);
      });
  };

  return forgotSuccess ? (
    <Form
      onSubmit={handleReset}
      linkComponent={ForgotLinks}
      title="Восстановление пароля"
    >
      <PasswordInput
        name="password"
        extraClass="mb-2"
        onChange={onChange}
        value={formState.password}
        autoComplete="new-password"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        name="token"
        size="default"
        extraClass="ml-1"
        value={formState.token}
        onChange={onChange}
        error={requestError}
        autoComplete="one-time-code"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <Button htmlType="submit" type="primary" size="large">
        Восстановить
      </Button>
    </Form>
  ) : (
    <Navigate to={`/${ROUTE.mainLayout.forgotPass}`} />
  );
};
