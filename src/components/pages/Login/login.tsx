import { FC, FormEvent } from "react";
import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../utils/constants";
import { IUserLogin } from "../../types/user-types";
import { useForm } from "../../hooks/use-form";
import { useDispatchHook } from "../../services/store/hooks";
import { LoginLinks } from "../../Form/form-links/form-links";
import { Form } from "../../Form/form";
import { userLogin } from "../../services/slices/user-slice/auth";

export const Login: FC = () => {
  const { formState, onChange } = useForm<IUserLogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatchHook();

  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userLogin(formState))
      .then(() => navigate(ROUTE.main))
      .catch((error: Error) => console.error(error));
  };

  return (
    <Form onSubmit={onLogin} linkComponent={LoginLinks} title="Вход">
      <EmailInput
        onChange={onChange}
        value={formState.email || ""}
        name={"email"}
        isIcon={false}
        autoComplete="email"
      />
      <PasswordInput
        onChange={onChange}
        value={formState.password || ""}
        name={"password"}
        extraClass="mb-2"
        autoComplete="current-password"
      />
      <Button htmlType="submit" type="primary" size="large">
        Войти
      </Button>
    </Form>
  );
};
