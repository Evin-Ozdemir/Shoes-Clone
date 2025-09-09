import * as Yup from "yup";

// Kayıt olurken kullanıcak olan schema
const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Adınızı giriniz"),
  lastName: Yup.string().required("Soyadınızı giriniz"),
  email: Yup.string()
    .email("Geçersiz email adresi")
    .required("Email adresinizi giriniz"),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifrenizi giriniz"),
});

// Login için kullanıcak olan schema
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçersiz email adresi")
    .required("Email adresinizi giriniz"),
  password: Yup.string().required("Şifrenizi giriniz"),
});
export { registerSchema, loginSchema };
