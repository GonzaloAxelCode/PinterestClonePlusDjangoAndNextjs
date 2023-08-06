import { useEffect, useState } from "react";
import {
  validarEmail,
  validatePassword,
  validateRePassword,
  validateUsername,
} from "../utilities/verify-auth";

const useFormAuth = () => {
  const [isSubmitDisable, submitDisable] = useState(false);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [validations, setValidations] = useState({
    usernameError: "",
    passwordError: "",
    emailError: "",
    re_passwordError: "",
  });

  useEffect(() => {
    setValidations({
      ...validations,
      emailError: validarEmail(formState.email),
    });
  }, [formState.email]);

  useEffect(() => {
    setValidations({
      ...validations,
      passwordError: validatePassword(formState.password),
      re_passwordError: validateRePassword(
        formState.password,
        formState.re_password
      ),
    });
  }, [formState.password, formState.re_password]);

  useEffect(() => {
    setValidations({
      ...validations,
      usernameError: validateUsername(formState.username),
    });
  }, [formState.username]);

  const onSubmit = (e: any, sendDataF: any) => {
    e.preventDefault();
    
    if (formState.re_password === "") {
      setValidations({
        ...validations,
        re_passwordError: "Empty re-password",
      });
    }
    if (formState.password === "") {
      setValidations({
        ...validations,
        passwordError: "Empty password",
      });
    }
    if (formState.username === "") {
      setValidations({
        ...validations,
        usernameError: "Empty username",
      });
    }
    if (formState.email === "") {
      setValidations({
        ...validations,
        emailError: "Empty email",
      });
    }

    if (
      validations.emailError === "" &&
      validations.passwordError === "" &&
      validations.re_passwordError === "" &&
      validations.usernameError === "" &&
      formState.email !== "" &&
      formState.password !== "" &&
      formState.re_password !== "" &&
      formState.username !== ""
    ) {
      sendDataF(formState);
    }
  };

  const setValues = (values: any) => {
    setFormState({
      ...formState,
      ...values,
    });
  };

  return {
    validations,
    onSubmit,
    formState,
    isSubmitDisable,
    setValues,
    setValidations,
  };
};

export default useFormAuth;
