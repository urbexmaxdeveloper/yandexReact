import {
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useState } from "react";
import { useSelectorHook } from "../../services/store/hooks";
import { useForm } from "../../hooks/use-form";
import { Buttons } from "../Buttons/buttons";
import { editUser } from "../../services/slices/user-slice/auth";

type TProfileInfo = {
  name: string;
  email: string;
  password: string;
};

export const ProfileInfo: FC = () => {
  const { formState, onChange, setFormState, onSubmit } = useForm<TProfileInfo>(
    {
      name: "",
      email: "",
      password: "",
    }
  );
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelectorHook((store) => store.user.user);

  useEffect(() => {
    if (user) {
      setFormState({ name: user.name, email: user.email, password: "" });
    }
  }, [user, setFormState]);

  useEffect(() => {
    if (
      formState.name !== user?.name ||
      formState.email !== user?.email ||
      formState.password
    ) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [formState, user]);

  const onCancel = (): void => {
    setFormState({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
    });
  };

  return (
    <form onSubmit={(e) => onSubmit(e, editUser)}>
      <Input
        placeholder={"Имя"}
        onChange={onChange}
        icon={"EditIcon"}
        value={formState.name || ""}
        name={"name"}
        size={"default"}
        extraClass="mb-6"
        autoComplete="name"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <EmailInput
        onChange={onChange}
        value={formState.email || ""}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
        autoComplete="email"
      />
      <PasswordInput
        onChange={onChange}
        value={formState.password || ""}
        name={"password"}
        icon="EditIcon"
        autoComplete="new-password"
      />
      <Buttons onCancel={onCancel} isVisible={isVisible} />
    </form>
  );
};
