import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {Input, Button, Flex, Box, FormControl, FormLabel, VStack} from "@chakra-ui/react";
import RegisterSchema from "./validation.js";
import ErrorMessage from "../../../components/ErrorMessage/index.jsx";
import AuthAPI from "../../../apis/AuthAPI.js";

export default function Register(){
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            try{
                const response = await AuthAPI.Register({
                    email: values.email,
                    password: values.password,
                });

                if(response.status === 201){
                    console.log(response.data)
                    navigate("/signin");
                }
            }catch(error){
                console.error(error);
            }
        }
    })

    return (
        <Flex bg="gray.100" h="100vh" align="center" justify="center">
            <Box bg="white" p="6" rounded="md" width="30rem">
                <form method="post" onSubmit={formik.handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                variant="filled"
                                autoComplete="off"
                            />
                            { (formik.errors.email && formik.touched.email) && <ErrorMessage message={formik.errors.email} /> }
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            { (formik.errors.password && formik.touched.password) && <ErrorMessage message={formik.errors.password} /> }
                        </FormControl>

                        <FormControl>
                            <FormLabel htmlFor="passwordConfirm">Password confirm</FormLabel>
                            <Input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordConfirm}
                            />
                            { (formik.errors.passwordConfirm && formik.touched.passwordConfirm) && <ErrorMessage message={formik.errors.passwordConfirm} /> }
                        </FormControl>

                        <Button type="submit" colorScheme="pink" width="full">Submit</Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    )
}