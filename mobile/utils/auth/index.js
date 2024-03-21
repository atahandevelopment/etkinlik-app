import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  city: Yup.string().required("City is required"),
  password: Yup.string()
    .min(8, "Parolanız minimum 8 karakterden oluşmalı")
    .matches(/[A-Z]/, "Parolanız en az 1 büyük harf içermelidir.")
    .matches(/[\W_]/, "Parolanız en az 1 özel karakter içermelidir")
    .required("Password is required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
