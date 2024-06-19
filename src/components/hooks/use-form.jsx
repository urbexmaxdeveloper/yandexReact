import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { ROUTE } from "../utils/constants";

export const useForm = () => {
  const [formState, setFormState] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = useCallback((e) => {
    e.preventDefault();
    setFormState((prevFormState) => ({
      ...prevFormState,
      [e.target.name]: e.target.value,
    }));
  }, []);
  const onSubmit = useCallback(
    (e, func) => {
      e.preventDefault();
      dispatch(func(formState))
        .then(() => {
          navigate(`${ROUTE.userProfile.profile}`, { replace: true });
          setFormState({});
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
        });
    },
    [dispatch, formState, navigate]
  );

  return { formState, onChange, onSubmit, setFormState };
};
