import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Password must match")
})

export default RegisterSchema;