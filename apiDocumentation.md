#### Product Routes
GET https://geekybay.herokuapp.com/products
- Get all visible products
- Does not require auth

GET https://geekybay.herokuapp.com/products/:sellerId
- Get all visible products from certain seller
- Does not require auth

GET https://geekybay.herokuapp.com/products/seller-products
- Get all products from certain seller (seller=currently logged in user)
- Requires auth

GET https://geekybay.herokuapp.com/products/product/:productId
- Get product details of a certain product that is visible
- Does not require auth

GET https://geekybay.herokuapp.com/products/seller-product/:productId
- Get product details of a certain product (product of the currently logged in user)
- Requires auth

GET https://geekybay.herokuapp.com/products/product/img/:productId
- Get product img of a certain product
- Does not require auth 

POST https://geekybay.herokuapp.com/products
- Create a product
- Requires auth

PUT https://geekybay.herokuapp.com/products/:id
- Update product details
- Requires auth

DELETE https://geekybay.herokuapp.com/products/:id
- Delete product
- Requires auth


#### User Routes
GET https://geekybay.herokuapp.com/users/user-info
- Get info of a specific user (the currently logged in user)
- Requires auth

GET https://geekybay.herokuapp.com/users/seller-info/:id
- Get info of a specific seller
- Only return username, email, city and country of the seller
- Does not require auth 

POST https://geekybay.herokuapp.com/users
- Create a buyer
- Required fields: userLastName, userFirstName, emailAddress, phone, addressLine1, addressLine2, city, postalCode, country
- Does not require auth

PUT https://geekybay.herokuapp.com/users
- Update a user (except user password)
- Required fields: userLastName, userFirstName, emailAddress, phone, addressLine1, addressLine2, city, postalCode, country
- Requires auth

PUT https://geekybay.herokuapp.com/users/update-password
- Update a user (except user password)
- Required fields: oldPassword, newPassword
- Requires auth

DELETE https://geekybay.herokuapp.com/users
- Update user
- Requires auth

#### Order Routes
GET https://geekybay.herokuapp.com/orders/seller
- Get orders by sellerId (for users{sellers} to check if someone has bought something from them)
- Requires auth

GET https://geekybay.herokuapp.com/orders/buyer
- Get orders by buyerId (for users{buyers} to check their orders)
- Requires auth

POST https://geekybay.herokuapp.com/orders
- Place an order
- Required fields: orderDate, orderStatus, sellerID, buyerID
- Does not require auth but we'll probably change that later

PUT https://geekybay.herokuapp.com/orders/canccel/:id
- Cancel an order
- Does not require auth but we'll probably change that later


#### Auth Routes
GET https://geekybay.herokuapp.com/auth/login
- To check if a user is logged in already or not
- If logged in already then returns bad request

GET https://geekybay.herokuapp.com/auth/register
- To check if a user is logged in already or not
- If not logged in then user can access the register page

POST https://geekybay.herokuapp.com/auth/login
- To log in and check if user entered the correct pw and username
- Also to check if user is already logged in or not
- Requires username and password

POST https://geekybay.herokuapp.com/auth/register
- Register
- If not logged in then user can register
- Required fields: userName, password, userLastName, userFirstName, emailAddress, phone, addressLine1, addressLine2, city, postalCode, country

DELETE https://geekybay.herokuapp.com/auth/logout
- To log out the user
- Has to be logged in and authenticated

POST https://geekybay.herokuapp.com/auth/forgot
- Forgot password page, to get an email with the reset password url
- Requires username

PATCH https://geekybay.herokuapp.com/auth/reset
- Forgot password page, to get an email with the reset password url
- Requires password and id (id should come from the page url)


#### Admin Routes
###### All of these routes require authentication
USERS:
GET https://geekybay.herokuapp.com/admin/users
- Get all users

GET https://geekybay.herokuapp.com/admin/users/:id
- Get all user by id

PUT https://geekybay.herokuapp.com/admin/users/:id
- Update user info

DELETE https://geekybay.herokuapp.com/admin/users/:id
- Delete user

PRODUCTS:
GET https://geekybay.herokuapp.com/admin/products
- Get all products

GET https://geekybay.herokuapp.com/admin/products/:productId
- Get product by id

GET https://geekybay.herokuapp.com/admin/products/:sellerId
- Get products by seller id

POST https://geekybay.herokuapp.com/admin/products
- Create a product

PUT https://geekybay.herokuapp.com/admin/products/:id
- Update a product

DELETE https://geekybay.herokuapp.com/admin/products/:id
- Update a product

ORDERS:
GET https://geekybay.herokuapp.com/admin/orders
- Get all orders

GET https://geekybay.herokuapp.com/admin/orders/:id
- Get order by id

GET https://geekybay.herokuapp.com/admin/seller-orders/:sellerId
- Get orders by seller id

GET https://geekybay.herokuapp.com/admin/buyer-orders/:bueryId
- Get orders by buyer id

POST https://geekybay.herokuapp.com/admin/orders
- Add new order

PUT https://geekybay.herokuapp.com/admin/orders/:id
- Update order

PUT https://geekybay.herokuapp.com/admin/orders/cancel/:id
- Cancel order










