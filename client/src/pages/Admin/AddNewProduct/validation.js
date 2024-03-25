import * as Yup from "yup";

export const CreateSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().min(3),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
})