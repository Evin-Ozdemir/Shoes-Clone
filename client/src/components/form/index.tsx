import type { FC } from "react";
import type { Shoe, ShoeFormValues } from "../../types";
import { Field, Formik, Form as FormikForm } from "formik";
import Input from "./input";

interface Props {
  data?: Shoe;
  onSubmit: (values: ShoeFormValues) => void;
}
const Form: FC<Props> = ({ onSubmit, data }) => {
  const initialValues: ShoeFormValues = {
    name: data?.name || "",
    price: String(data?.price) || "",
    discount: String(data?.discount) || "",
    color: data?.color || "",
    size: data?.size || "",
    description: data?.description || "",
    isNew: data?.isNew || false,
    gender: data?.gender || "",
  };

  const handleSubmit = (values: ShoeFormValues) => {
    onSubmit(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <FormikForm className="flex flex-col gap-5">
        <Input label="İsim" name="name" type="text" />
        <Input label="Fiyat" name="price" type="number" />
        <Input label="İndirim" name="discount" type="number" />
        <Input label="Renk" name="color" type="text" />
        <Input label="Beden" name="size" type="text" />
        <Input label="Açıklama" name="description" type="textarea" />
        <Input label="Yeni" name="isNew" type="checkbox" />

        <div className="flex items-center gap-2">
          <Field type="radio" name="gender" value="men" id="men" />
          <label htmlFor="men">Erkek</label>
          <Field type="radio" name="gender" value="women" id="women" />
          <label htmlFor="women">Kadın</label>
        </div>

        <button
          type="submit"
          className="bg-my-blue text-white px-4 py-1 rounded-md transition hover:bg-my-blue/80 cursor-pointer"
        >
          Gönder
        </button>
      </FormikForm>
    </Formik>
  );
};

export default Form;
