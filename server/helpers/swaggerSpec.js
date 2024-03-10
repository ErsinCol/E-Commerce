import swaggerJsdoc from "swagger-jsdoc";
import http from "node:http";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-Commerce-App',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User : {
                    type: Object,
                    properties: {
                        email: {
                            type: String,
                            description: "Email of the user",
                        },
                        password: {
                            type: String,
                            description: "Password of the user"
                        }
                    },
                },
                Product: {
                    type: Object,
                    properties: {
                        title: {
                            type: String,
                            description: "Title of product",
                        },
                        description: {
                            type: String,
                            description: "Description of product"
                        },
                        price: {
                            type: Number,
                            description: "Price of product"
                        },
                        photos:{
                            type: Array,
                            items: {
                                type: String
                            }
                        },
                        createdAt: {
                            type: String,
                            format: Date,
                            description: "Created date of product"
                        },
                    },
                },
                Order: {
                    type: Object,
                    properties: {
                        address: {
                            type: String,
                            description: "Address of the order"
                        },
                        items: {
                            type: Array,
                            description: "List of products on order",
                            items: {
                                type: String
                            }
                        }
                    },
                    required: ['address', 'items']
                }
            },
            responses: {
                UnauthorizedError: {
                    description: "Access token is missing or invalid"
                }
            }
        },
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec;