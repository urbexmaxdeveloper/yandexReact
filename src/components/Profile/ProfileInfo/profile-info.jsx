import {
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/use-form";
import { Buttons } from "../Buttons/buttons";
import { editUser } from "../../services/slices/user-slice/auth";

export const ProfileInfo = () => {
  const { formState, onChange, setFormState, onSubmit } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector((store) => store.user.user);

  useEffect(() => {
    if (user.name && user.email) {
      setFormState({ name: user.name, email: user.email });
    }
  }, [user.name, user.email]);

  useEffect(() => {
    if (
      formState.name !== user.name ||
      formState.email !== user.email ||
      formState.password
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [formState, user.name, user.email]);

  const onCancel = () => {
    setFormState({
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  return (
    <form onSubmit={(e) => onSubmit(e, editUser)}>
      <Input
        placeholder={"Имя"}
        onChange={onChange}
        icon={"EditIcon"}
        value={formState?.name || ""}
        name={"name"}
        size={"default"}
        extraClass="mb-6"
        autoComplete="name"
      />
      <EmailInput
        onChange={onChange}
        value={formState?.email || ""}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
        autoComplete="email"
      />
      <PasswordInput
        onChange={onChange}
        value={formState?.password || ""}
        name={"password"}
        icon="EditIcon"
        autoComplete="new-password"
      />
      <Buttons onCancel={onCancel} isVisible={isVisible} />
    </form>
  );
};
