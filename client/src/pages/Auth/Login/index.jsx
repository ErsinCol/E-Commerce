import {useAuth} from "../../../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import LoginSchema from "./validation.js";
import AuthAPI from "../../../apis/AuthAPI.js";
import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box, Button,
    Flex,
    FormControl, FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    VStack
} from "@chakra-ui/react";

export default function Login(){
    const {login} = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: async (values, {setErrors}) => {
            try{
                const response = await AuthAPI.Login({
                    email: values.email,
                    password: values.password,
                });

                login(response);
                navigate("/profile");
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
            <Heading mb="4">Sign In</Heading>
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

                        <Button type="submit" colorScheme="pink" width="full">Sign In</Button>
                    </VStack>
                </form>
            </Box>
        </Flex>
    )
}