## Auth Endpoints

| Endpoint              | Description                | Methods |
|-----------------------|----------------------------|---------|
| `/auth/register`      | Create a new user          | POST    |
| `/auth/login`         | Authenticate existing user | POST    |
| `/auth/logout`        | User logout                | POST    |
| `/auth/refresh_token` | Refresh session            | POST    |
| `/auth/me`            | Get current user data      | GET     |

## Product Endpoints

| Endpoint              | Description          | Methods |
|-----------------------|----------------------|---------|
| `/product`            | Retrieve products    | GET     |
| `/product/:productId` | Get a product by id  | GET     |
| `/product`            | Create a new product | POST    |
