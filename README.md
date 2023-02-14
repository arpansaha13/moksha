# Mosksha Backend API Reference
API Usage for Moksha Backend:
**Backend App URL** : [https://moksha-backend.onrender.com](https://moksha-backend.onrender.com)

## Register/ Login  
### 1. Register 
HTTP Request: https://moksha-backend.onrender.com/users/register 
Method = [POST] 
Request:
```json
{
  "name": "Aditya",
  "institution_name": "NIT Agartala",
  "phone_no": "8118996525",
  "email": "adityakiran.cs@gmail.com",
  "username": "Aditya CS",
  "password": "123",
  "confirm_password": "123"
}
```
Responses:
1. If new user:
```json
{
  "message": "User added successfully!"
}
```
2. If user already exists:
```json
{
  "message": "User already Exists!"
}
```

3.  If `password` and `confirm_password` don't match:
```json
{
  "message": "Password Not Matched!"
}
```
### 2. OTP Validation
HTTP Request: https://moksha-backend.onrender.com/users/otp 
Method = [POST] 
Request:
```json
{
  "email": "adityakiran.cs@gmail.com",
  "otp" : "1704"
}
```
Responses:
1.  User enters correct OTP:
```json
{
  "message": "User Validated!!"
}
```
2. User enters wrong OTP:
```json
{
  "message": "OTP Not Matched!!"
}
```
3. Un-registered user tries to enter OTP:
```json
{
  "message": "User Not Found!"
}
```
### 3. Resend OTP
HTTP Request: https://moksha-backend.onrender.com/users/resendotp 
Method = [POST] 
Request:
```json
{
  "email": "adityakiran.cs@gmail.com"
}
```
Responses:
1. New OTP is sent to email
```json
{
  "message": "Otp Sent!"
}
```
### 4. Login
HTTP Request: https://moksha-backend.onrender.com/users/login
Method = [POST] 
Request:
```json
{
  "email":"suggi.aditya@gmail.com",
  "password": "123"
}
```
Responses:
1. Wrong Password
```json
{
  "message": "Invalid Password!!"
}
```
2. Correct Password, `logged_in=true`
```json
{
  "message": "User logged in!!"
}
```
3. Unregistered User tries to sign-in
```json
{
  "message": "User Not Found!"
}
```
4. Unvalidated User tries to sign-in
```json
{
  "message": "Please validate your account using otp!!"
}
```
### 5. Logout
HTTP Request: https://moksha-backend.onrender.com/users/loqout
Method = [POST] 
Request:
1. Unregistered User tries to logout
```json
{
  "message": "User Not Found!"
}
```
2. Registered user tries to logout, `logged_in=false`
```json
{
  "message": "User Logged Out!!"
}
```
### 6. Forgot Password
HTTP Request: https://moksha-backend.onrender.com/users/forgot-password
Method = [POST] 
Request:
```json
{
  "email": "suggi.aditya@gmail.com",
  "new_password": "321"
}
```
Response:
1. New Password is set
```json
{
  "message": "Password Changed!!"
}
```
2. Email is not registered
```json
{
  "message": "User Not Found!"
}
```

### 7. View
HTTP Request: https://moksha-backend.onrender.com/users/view
Method = [GET] 
Response:
```json
[
  {
    "id": 2,
    "name": "Argha",
    "institution_name": "NIT Agartala",
    "phone_no": 8118996525,
    "email": "bhowmikarghajit@gmail.com",
    "username": "Keraskp",
    "password": "123",
    "user_id": "MOK-s2l2dij8",
    "logged_in": true,
    "otp": ""
  },
  {
    "id": 3,
    "name": "Aditya",
    "institution_name": "NIT Agartala",
    "phone_no": 8118996525,
    "email": "adityakiran.cs@gmail.com",
    "username": "Aditya CS",
    "password": "123",
    "user_id": "MOK-jcmo9ugv",
    "logged_in": false,
    "otp": "1533"
  },
  {
    "id": 4,
    "name": "Suggi",
    "institution_name": "NIT Agartala",
    "phone_no": 8118996525,
    "email": "suggi.aditya@gmail.com",
    "username": "Aditya CS",
    "password": "321",
    "user_id": "MOK-ssev2rmf",
    "logged_in": false,
    "otp": ""
  }
]
```
