# User Spec

## Register User

Endpoint : /api/users

Request Body:

```json
{
    "username": "apollo",
    "name": "Apollo bin Zeus",
    "email": "apollo@example.com",
    "password": "rahasia"
}
```

Response Body (success):

```json
{
    "data": {
        "username": "apollo",
    "name": "Apollo bin Zeus",
    "email": "apollo@example.com"
    }
}
```
