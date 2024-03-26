import * as Yup from "yup";

export const EditSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required").min(3),
    price: Yup.number().required("Price is required").positive("Price must be a positive number"),
    photos: Yup.array().of(Yup.string().url().required()),
})