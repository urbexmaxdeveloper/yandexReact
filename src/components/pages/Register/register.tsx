import React from "react";
import {
  PasswordInput,
  EmailInput,
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Form } from "../../Form/form";
import { RegisterLinks } from "../../Form/form-links/form-links";
import { useForm } from "../../../hooks/use-form";
import { userRegister } from "../../services/slices/user-slice/auth";

interface IRegisterProps {}

export const Register: React.FC<IRegisterProps> = () => {
  const { formState, onChange, onSubmit } = useForm({
    name: "",
    email: "",
    password: "",
  });

  return (
    <Form
      onSubmit={(e) => onSubmit(e, userRegister)}
      linkComponent={RegisterLinks}
      title="Регистрация"
    >
      <Input
        type="text"
        placeholder="Имя"
        name="name"
        size="default"
        value={formState.name}
        onChange={onChange}
        autoComplete="name"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <EmailInput
        name="email"
        isIcon={false}
        value={formState.email}
        onChange={onChange}
        autoComplete="email"
      />
      <PasswordInput
        name="password"
        value={formState.password}
        onChange={onChange}
        autoComplete="new-password"
      />
      <Button htmlType="submit" type="primary" size="large">
        Зарегистрироваться
      </Button>
    </Form>
  );
};
