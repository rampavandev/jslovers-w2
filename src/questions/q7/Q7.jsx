import React from "react";
import Form from "./Form";
import * as yup from "yup";
import "./styles.css";

const Q7 = () => {
  const schema = [
    {
      component: "TEXT_FIELD",
      name: "name",
      label: "Name",
      required: true,
      validate: yup.string().required("Name is required"),
      type: "text",
    },
    {
      component: "TEXT_FIELD",
      name: "email",
      label: "Email",
      required: true,
      validate: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
      type: "email",
    },
    {
      component: "TEXT_FIELD",
      name: "password",
      label: "Password",
      required: true,
      validate: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
      type: "password",
    },
    {
      component: "TEXT_FIELD",
      name: "confirmPassword",
      label: "Confirm Password",
      required: true,
      validate: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      type: "password",
    },
    // {
    //   component: "RADIO_BUTTON",
    //   name: "gender",
    //   required: true,
    //   label: "Gender",
    //   options: ["Male", "Female", "Other"],
    //   validate: yup.string().required("Selecting a gender is required"),
    // },
    {
      component: "CHECKBOX",
      name: "terms",
      label: "I agree to the terms and conditions",
      required: true,
      validate: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions"),
    },
  ];

  const onSubmit = (formData) => {
    console.log("formData =>", formData);
  };
  return (
    <div class="main">
      <h1>Config Driven Form</h1>
      <Form schema={schema} onSubmit={onSubmit} />
    </div>
  );
};

export default Q7;
