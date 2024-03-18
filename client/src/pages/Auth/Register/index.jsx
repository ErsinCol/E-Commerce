import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import {
    Input,
    Button,
    Flex,
    Box,
    FormControl,
    FormLabel,
    VStack,
    Heading,
    Alert,
    AlertIcon,
    AlertTitle,
    FormErrorMessage
} from "@chakra-ui/react";
import RegisterSchema from "./validation.js";
import AuthAPI from "../../../apis/AuthAPI.js";
import {useAuth} from "../../../contexts/AuthContext.jsx";

export default function Register(){
    const {login} = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values, {setErrors}) => {
            try{
                const response = await AuthAPI.Register({
                    email: values.email,
                    password: values.password,
                });

                login(response);
                navigate("/");
            }catch(error){
                console.error(error);
                setErrors({
                    general: error.response.data,
                })
            }
        }
    })

    return (
        <Flex bg="gray.100" h="100vh" align="center" justify="center" flexDir="column">
            <Heading mb="4">Register</Heading>
            { formik.errors.general && (
                <Box my="4">
                    <Alert status='error'>
                        <AlertIcon />
                        <AlertTitle>{formik.errors.general}</AlertTitle>
                    </Alert>
                </Box>
            )}
            <Box bg="white" p="6" rounded="md" width="30rem">
                <form method="post" onSubmit={formik.handleSubmit}>
                    <VStack spacing={4} align="flex-start">
                        <FormControl isRequired>
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
                                isInvalid={formik.errors.email && formik.touched.email}
                                errorBorderColor="red.300"
                                focusBorderColor="pink.400"
                            />
                            {(formik.errors.email && formik.touched.email) && <FormErrorMessage>{formik.errors.email}</FormErrorMessage> }
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                isInvalid={formik.errors.password && formik.touched.password}
                                errorBorderColor="red.300"
                                focusBorderColor="pink.400"
                            />
                            {(formik.errors.password && formik.touched.password) && <FormErrorMessage>{formik.errors.password}</FormErrorMessage> }
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel htmlFor="passwordConfirm">Password confirm</FormLabel>
                            <Input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                variant="filled"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordConfirm}
                                isInvalid={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
                                errorBorderColor="red.300"
                                focusBorderColor="pink.400"
                            />
                            {(formik.errors.passwordConfirm && formik.touched.passwordConfirm) &&  <FormErrorMessage>{formik.errors.passwordConfirm}</FormErrorMessage> }
                        </FormControl>

                        <Button type="submit" colorScheme="pink" width="full">Submit</Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    )
}