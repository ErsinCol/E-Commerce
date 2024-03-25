import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Button, Flex, FormControl, FormLabel, Input, Textarea, useToast} from "@chakra-ui/react";
import ProductAPI from "../../../apis/ProductAPI.js";
import {CreateSchema} from "./validation.js";

export default function AddNewProduct(){
    const queryClient = useQueryClient();

    const toast = useToast();

    const navigate = useNavigate();

    const {mutate} = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: (values) => ProductAPI.createProduct(values),
        onError: (error) => {
            console.error(error);
            toast({
                position: "top-right",
                title: "Error",
                description: "Product not be created",
                status: "error",
                duration: 2000,
                isClosable: true,
            })
        },
        onSuccess: () => {
            toast({
                position: "top-right",
                title: "Success",
                description: "Product successfully created",
                status: "success",
                duration: 2000,
                isClosable: true,
            })

            navigate("/admin/products");
        },
        onSettled: async () => {
            return await queryClient.invalidateQueries({queryKey: ["admin:products"]});
        }
    })

    const handleSubmit = (values, {setSubmitting}) => {
        const filteredValues = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value !== "")
        );
        mutate(filteredValues);
        setSubmitting(false);
    }

    return (
        <Formik
            initialValues={{
                title: "",
                description: "",
                price: "",
            }}
            validationSchema={CreateSchema}
            onSubmit={handleSubmit}
        >
            {
                ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                        <FormControl mb="4">
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                                isInvalid={errors.title && touched.title}
                                focusBorderColor="pink.400"
                                disabled={isSubmitting}
                            />
                        </FormControl>

                        <FormControl mb="4">
                            <FormLabel htmlFor="description">Description</FormLabel>
                            <Textarea
                                id="description"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                isInvalid={errors.description && touched.description}
                                focusBorderColor="pink.400"
                                disabled={isSubmitting}
                            />
                        </FormControl>

                        <FormControl mb="4">
                            <FormLabel htmlFor="price">Price</FormLabel>
                            <Input
                                type="text"
                                id="price"
                                name="price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.price}
                                isInvalid={errors.price && touched.price}
                                focusBorderColor="pink.400"
                                disabled={isSubmitting}
                            />
                        </FormControl>

                        <Flex align="center" justify="end" gap="2" my="4">
                            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                            <Button colorScheme="pink" type="submit" isLoading={isSubmitting} loadingText="Submitting">Save</Button>
                        </Flex>
                    </form>
                )
            }
        </Formik>
    )
}