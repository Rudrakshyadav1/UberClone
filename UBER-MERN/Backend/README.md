# User Registration Endpoint

## Endpoint
**POST** `/register`

## Description
Registers a new user. Validates the request data, hashes the password, creates the user in the database, and returns a JWT token along with the user data.

## Request Body
- **firstname** (string): Required, minimum of 3 characters.
- **lastname** (string): Optional, minimum of 3 characters (if provided).
- **email** (string): Required, must be a valid email address.
- **password** (string): Required, minimum of 5 characters.

### Example
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Response

### Success (HTTP Status Code: 201)
```json
{
  "token": "<JWT Token>",
  "user": {
    "_id": "<user_id>",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "socketId": ""
  }
}
```

### Validation Error (HTTP Status Code: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email‼️",
      "param": "email",
      "location": "body"
    },
    // ...other validation errors if any...
  ]
}
```

### Example Response
```json
{
  "token": "<JWT Token>",
  "user": {
    "_id": "<User ID>",
    "firstname": "<First Name>",
    "lastname": "<Last Name>",
    "email": "<Email>",
    "socketId": "<Socket ID>"
    // ...other user properties...
  }
}
```

---

# User Login Endpoint

## Endpoint
**POST** `/login`

## Description
Authenticates a user. Validates the request data, checks the email and password, and returns a JWT token along with the user data.

## Request Body
- **email** (string): Required, must be a valid email address.
- **password** (string): Required, minimum of 5 characters.

### Example
```json
{
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

## Response

### Success (HTTP Status Code: 200)
```json
{
  "token": "<JWT Token>",
  "user": {
    "_id": "<user_id>",
    "firstname": "John",
    "lastname": "Doe",
    "email": "john.doe@example.com",
    "socketId": ""
  }
}
```

### Validation Error (HTTP Status Code: 400)
```json
{
  "errors": [
    {
      "msg": "Invalid Email‼️",
      "param": "email",
      "location": "body"
    },
    // ...other validation errors if any...
  ]
}
```

### Authentication Error (HTTP Status Code: 401)
```json
{
  "message": "Invalid email or password"
}
```

# User Profile Endpoint

## Endpoint
**GET** `/profile`

## Description
Retrieves the profile for the authenticated user.

## Authentication
Required (JWT token in Authorization header).

### Example Response
```json
{
  "_id": "<User ID>",
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com"
  // ...other user properties...
}
```

# User Logout Endpoint

## Endpoint
**GET** `/logout`

## Description
Logs out the authenticated user and invalidates the current session/token.

## Authentication
Required.

### Example Response
```json
{
  "message": "User logged out successfully."
}
```

# Captain Registration Endpoint

## Endpoint
**POST** `/captain/register`

## Description
Registers a new captain. Validates the request data, hashes the password, creates a captain entry in the database, and returns a JWT token along with the captain data.

## Request Body
- **firstname** (string): Required, minimum of 3 characters.
- **lastname** (string): Required, minimum of 3 characters.
- **email** (string): Required, must be a valid email address.
- **password** (string): Required, minimum of 6 characters.
- **vehicle** (object): Required. Contains:
  - **color** (string): Required, minimum of 3 characters.
  - **plate** (string): Required, alphanumeric up to 10 characters.
  - **capacity** (number): Required, minimum of 1.
  - **vehicleType** (string): Required, one of: 'car', 'bike', 'auto'.

### Example Request
```json
{
  "firstname": "Alice",
  "lastname": "Doe",
  "email": "captain@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Response

### Success (HTTP Status Code: 201)
```json
{
  "token": "<JWT Token>",
  "captain": {
    "_id": "<captain_id>",
    "firstname": "Alice",
    "lastname": "Doe",
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain properties...
  }
}
```

### Validation Error (HTTP Status Code: 400)
```json
{
  "errors": [
    // ...validation errors...
  ]
}
```

# Captain Login Endpoint

## Endpoint
**POST** `/captain/login`

## Description
Authenticates a captain. Validates the request data, checks the email and password, and returns a JWT token along with the captain data.

## Request Body
- **email** (string): Required, must be a valid email address.
- **password** (string): Required, minimum of 6 characters.

### Example
```json
{
  "email": "captain@example.com",
  "password": "password123"
}
```

## Response

### Success (HTTP Status Code: 200)
```json
{
  "token": "<JWT Token>",
  "captain": {
    "_id": "<captain_id>",
    "firstname": "Alice",
    "lastname": "Doe",
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain properties...
  }
}
```

### Validation Error (HTTP Status Code: 400)
```json
{
  "errors": [
    {
      "msg": "Valid email is required",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Authentication Error (HTTP Status Code: 401)
```json
{
  "message": "Invalid email or password"
}
```

---

# Captain Profile Endpoint

## Endpoint
**GET** `/captain/profile`

## Description
Retrieves the profile for the authenticated captain.

## Authentication
Required (JWT token in Authorization header or cookie).

### Example Response
```json
{
  "captain": {
    "_id": "<captain_id>",
    "firstname": "Alice",
    "lastname": "Doe",
    "email": "captain@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
    // ...other captain properties...
  }
}
```

---

# Captain Logout Endpoint

## Endpoint
**GET** `/captain/logout`

## Description
Logs out the authenticated captain and invalidates the current session/token.

## Authentication
Required (JWT token in Authorization header or cookie).

### Example Response
```json
{
  "message": "Logout successful"
}
```
