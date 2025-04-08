# Medical Bazzar Nepal - API Documentation

This documentation provides details about the REST APIs available for the Medical Bazzar Nepal platform. These APIs can be used to build mobile applications or any other client applications.

Base URL: `http://localhost:5000/api` (Development)

## Authentication APIs

All authenticated routes require a Bearer token to be included in the Authorization header:
```
Authorization: Bearer <your_token>
```

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user account
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "OTP sent to your email"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Email already registered"
  }
  ```

### Verify Email (OTP)
- **URL**: `/auth/verify-email`
- **Method**: `POST`
- **Description**: Verify user's email using OTP
- **Request Body**:
  ```json
  {
    "email": "string",
    "otp": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "isEmailVerified": true
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Invalid verification code. Please try again."
  }
  ```

### Resend Verification OTP
- **URL**: `/auth/resend-verification`
- **Method**: `POST`
- **Description**: Resend email verification OTP
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "New OTP sent to your email"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Email already verified"
  }
  ```

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticate user and get token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "token": "jwt_token",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "isEmailVerified": boolean
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Invalid credentials"
  }
  ```

### Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Description**: Get currently logged in user's details
- **Authentication**: Required
- **Success Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string",
      "isEmailVerified": boolean
    }
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Not authorized to access this route"
  }
  ```

### Forgot Password
- **URL**: `/auth/forgot-password`
- **Method**: `POST`
- **Description**: Request password reset email
- **Request Body**:
  ```json
  {
    "email": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Password reset email sent"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "User not found"
  }
  ```

### Reset Password
- **URL**: `/auth/reset-password/:token`
- **Method**: `PUT`
- **Description**: Reset password using reset token
- **Parameters**:
  - `token`: Reset password token received in email
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Password reset successful"
  }
  ```
- **Error Response**:
  ```json
  {
    "success": false,
    "error": "Invalid or expired reset token"
  }
  ```

### Logout
- **URL**: `/auth/logout`
- **Method**: `GET`
- **Description**: Logout user (clears token on client side)
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

## Error Handling

All API endpoints return error responses in the following format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

Common HTTP Status Codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

## Notes for Mobile App Developers

1. Store the JWT token securely after login/registration.
2. Include the token in all authenticated requests using the Authorization header.
3. Implement proper error handling for all API responses.
4. The OTP verification system has a 10-minute expiration time.
5. Password reset tokens expire after 10 minutes.
6. All authenticated routes require email verification.

For additional assistance or to report issues, please contact the backend team.