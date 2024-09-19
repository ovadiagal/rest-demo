# CS 3300 - REST Assignment

Author: Gal Ovadia

This is a basic web server for my 3300 assignment.

Run this locally with:
```
npm i
npm start
```

This will start the web server on port 3000.
The web server features the following endpoints:

### `GET /api/products`
Display the list of all products
Can test by navigating to http://localhost:3000/api/products after spinning up the server locally.

### `GET /api/products/[id]`
Display the information of a specific product.
For example, to access the product with ID 4, navigate to http://localhost:3000/api/products/4

### `POST /api/products`
Creates a new product. The product information needs to be specified in the request body. The ID is randomly generated.

Below is an example cURL request that can be used to test this endpoint:

```
curl --location 'http://localhost:3000/api/products' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Playstation 5",
    "quantity": 100
}'
```

### `PUT /api/products/[id]`
Updates the details of an existing product. The product information needs to be specified in the request body.

Below is an example cURL request that can be used to test this endpoint:

```
curl --location --request PUT 'http://localhost:3000/api/products/1' \
--header 'Content-Type: application/json' \
--data '{
    "name": "Sony Turntable (Edited)",
    "quantity": 2
}'
```

### `DELETE /api/products/[id]`
Deletes a product from the database.

Below is an example cURL request that can be used to test this endpoint:

```
curl --location --request DELETE 'http://localhost:3000/api/products/1'
```
