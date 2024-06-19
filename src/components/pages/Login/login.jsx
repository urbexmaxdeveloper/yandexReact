import {
  PasswordInput,
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/use-form";
import { userLogin } from "../../services/slices/user-slice/auth";
import { ROUTE } from "../../utils/constants";
import { LoginLinks } from "../../Form/form-links/form-links";
import { Form } from "../../Form/form";

export const Login = () => {
  const { formState, onChange } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin(formState))
      .then(() => navigate(ROUTE.main))
      .catch((error) => console.error(error));
  };

  return (
    <Form onSubmit={(e) => onLogin(e)} linkComponent={LoginLinks} title="Вход">
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
