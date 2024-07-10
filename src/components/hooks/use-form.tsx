import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ROUTE } from "../utils/constants";

export interface FormState {
  [key: string]: string;
}

export const useForm = <T extends FormState>(initialState: T) => {
  const [formState, setFormState] = useState<T>(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    async (
      e: React.FormEvent<HTMLFormElement>,
      func: (formState: T) => any
    ) => {
      e.preventDefault();
      try {
        await dispatch(func(formState));
        navigate(`${ROUTE.userProfile.profile}`, { replace: true });
        setFormState(initialState);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    [dispatch, formState, navigate, initialState]
  );

  return { formState, onChange, onSubmit, setFormState };
};
