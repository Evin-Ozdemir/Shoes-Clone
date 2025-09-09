import type { FC } from "react";
import useAuth from "../../hooks/useAuth";
import type { RegisterValues } from "../../types";
import { Form, Formik } from "formik";
import { initialRegisterValues } from "../../utils/constants";
import { registerSchema } from "../../utils/schemas";
import Input from "../../components/form/input";
import { Link } from "react-router-dom";

const Register: FC = () => {
  const { register } = useAuth();

  const onSubmit = (values: RegisterValues) => {
    register.mutate(values);
  };
  return (
    <div className="flex h-screen w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="/logo.svg" alt="KICKS" className="mx-auto h-10 w-auto" />
        <h2 className="text-center mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">
          Hesabınızı Oluşturunuz
        </h2>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-10">
        <Formik
          initialValues={initialRegisterValues}
          onSubmit={onSubmit}
          validationSchema={registerSchema}
        >
          <Form className="space-y-8">
            <Input label="Adınız" name="firstName" type="text" />
            <Input label="Soyadınız" name="lastName" type="text" />
            <Input label="Email Adresiniz" name="email" type="email" />
            <Input label="Şifreniz" name="password" type="password" />

            <div>
              <button
                disabled={register.isPending}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {register.isPending ? "Kayıt Olunuyor..." : "Üye Ol"}
              </button>
            </div>
          </Form>
        </Formik>

        <div className="mt-10 text-center">
          <p className="text-sm/6 text-gray-500 inline">
            Hesabınız Var mı?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
