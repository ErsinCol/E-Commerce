import {useParams, useNavigate} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Formik} from "formik";
import {message} from "antd";
import {
    FormControl,
    FormLabel,
    Input,
    Heading,
    Box,
    Button,
    Flex,
    Textarea
} from "@chakra-ui/react";
import ProductAPI from "../../../apis/ProductAPI.js";
import {EditSchema} from "./validation.js";

function useAdminProductDetail(productId){
    return useQuery({
        queryKey: ["admin:product", productId],
        queryFn: () => ProductAPI.getProductById(productId),
        enabled: !!productId,
    })
}

export default function AdminProductDetail(){
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const {productId} = useParams();

    const { data } = useAdminProductDetail(productId);

    const {mutate} = useMutation({
        mutationKey: ["updateProduct", productId],
        mutationFn: (updatedValues) => ProductAPI.updateProduct(productId, updatedValues),
        onError : (error) => {
            console.error(error);
            message.error("Error. Product not be updated.");
        },
        onSuccess : () => {
            message.success("Product successfully updated.")
        },
        onSettled : async() => {
            return await queryClient.invalidateQueries({queryKey: ["admin:product", productId]});
        }
    })

    const handleSubmit = (values, {setSubmitting}) => {
        mutate(values);
        setSubmitting(false);
    }

    return (
        <div id="admin-product-detail-page">
            <Heading as="h3" size="lg">Edit</Heading>
            <Box my={4}>
                { data ? (
                    <Formik
                        initialValues={{
                            title: data.title,
                            description: data.description,
                            price: data.price,
                        }}
                        validationSchema={EditSchema}
                        onSubmit={handleSubmit}
                    >
                        { ({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
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
                        )}
                    </Formik>
                ) : (
                    "Loading..."
                )}
            </Box>
        </div>
    )
}

