import {useParams, useNavigate} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {FieldArray, Formik} from "formik";
import {message} from "antd";
import {
    FormControl,
    FormLabel,
    Input,
    Heading,
    Box,
    Button,
    Flex,
    Textarea,
    Text,
    IconButton,
} from "@chakra-ui/react";
import ProductAPI from "../../../apis/ProductAPI.js";
import {EditSchema} from "./validation.js";
import {DeleteIcon} from "@chakra-ui/icons";

function useAdminProductDetail(productId){
    return useQuery({
        queryKey: ["admin", "product", productId],
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
        onSettled : () => {
            queryClient.invalidateQueries({queryKey: [productId]});
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
                            photos: data.photos,
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

                                <Box mb="4">
                                    <Text fontWeight="500" my="1">Photos</Text>
                                    <FieldArray name="photos">
                                        {
                                            ({remove, push}) => (
                                                <div>
                                                    {values.photos.length > 0 && (
                                                        values.photos.map((photo, index) => (
                                                            <Flex key={index} mb="3" gap="1">
                                                                <Input
                                                                    name={`photos.${index}`}
                                                                    placeholder="Product photo url"
                                                                    value={values.photos[index]}
                                                                    onBlur={handleBlur}
                                                                    onChange={handleChange}
                                                                    isInvalid={errors.photos && errors.photos[index] && touched.photos && touched.photos[index]}
                                                                    disabled={isSubmitting}
                                                                />
                                                                <IconButton
                                                                    aria-label='Delete photo'
                                                                    icon={<DeleteIcon/>}
                                                                    colorScheme="red"
                                                                    variant="outline"
                                                                    type="button"
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    Delete
                                                                </IconButton>
                                                            </Flex>
                                                        ))
                                                    )}
                                                    <Button
                                                        colorScheme="blue"
                                                        size="sm"
                                                        onClick={() => push("")}
                                                        my="1"
                                                    >
                                                        Add
                                                    </Button>
                                                </div>
                                            )
                                        }
                                    </FieldArray>
                                </Box>

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

