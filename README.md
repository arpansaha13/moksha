
# Mosksha Backend API Reference
API Usage for Moksha Backend:
**Backend App URL** : [https://moksha-backend.onrender.com](https://moksha-backend.onrender.com)

## Register/ Login  
### 1. Register 
HTTP Request: https://moksha-backend.onrender.com/users/register
\
Method = [POST] 
\
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
\
Status: 201 
```json
{
  "message": "User added successfully!"
}
```
2. If user already exists:
\
Status: 409
```json
{
  "message": "User already Exists!"
}
```

3.  If `password` and `confirm_password` don't match:
\
Status: 400
```json
{
  "message": "Password Not Matched!"
}
```
### 2. OTP Validation
HTTP Request: https://moksha-backend.onrender.com/users/otp 
\
Method = [POST] 
\
Request:
```json
{
  "email": "adityakiran.cs@gmail.com",
  "otp" : "1704"
}
```
Responses:
1.  User enters correct OTP:
\
Status: 200 
```json
{
  "message": "User Validated!!"
}
```
2. User enters wrong OTP:
\
Status: 401 
```json
{
  "message": "OTP Not Matched!!"
}
```
3. Un-registered user tries to enter OTP:
\
Status: 404 Not Found
```json
{
  "message": "User Not Found!"
}
```
### 3. Resend OTP
HTTP Request: https://moksha-backend.onrender.com/users/resendotp 
\
Method = [POST] 
\
Request:
```json
{
  "email": "adityakiran.cs@gmail.com"
}
```
Responses:
1. New OTP is sent to email
\
Status: 200 
```json
{
  "message": "Otp Sent!"
}
```
2. Unregistered User requests for OTP
\
Status: 404 
```json
{
  "message": "User Not Found!"
}
```
### 4. Login
HTTP Request: https://moksha-backend.onrender.com/users/login
\
Method = [POST] 
\
Request:
```json
{
  "email":"suggi.aditya@gmail.com",
  "password": "123"
}
```
Responses:
1. Wrong Password
\
Status: 400
```json
{
  "message": "Invalid Password!!"
}
```
2. Correct Password, `logged_in=true`
\
Status: 200
```json
{
  "message": "User logged in!!"
}
```
3. Unregistered User tries to sign-in
\
Status: 404
```json
{
  "message": "User Not Found!"
}
```
4. Unvalidated User tries to sign-in
\
Status: 403
```json
{
  "message": "Please validate your account using otp!!"
}
```
### 5. Logout
HTTP Request: https://moksha-backend.onrender.com/users/loqout
\
Method = [POST] 
\
Request:
```json
{
  "email" : "suggi.aditya@gmail.com"
}
```
Responses:
1. Unregistered User tries to logout
\
Status: 404
```json
{
  "message": "User Not Found!"
}
```
2. Registered user tries to logout, `logged_in=false`
\
Status: 200
```json
{
  "message": "User Logged Out!!"
}
```
### 6. Forgot Password
HTTP Request: https://moksha-backend.onrender.com/users/forgot-password
\
Method = [POST] 
\
Request:
```json
{
  "email": "suggi.aditya@gmail.com"
}
```
Response:
1. New Password is set
\
Status: 200
```json
{
  "message": "A new password has been sent to your mail. Use it to set new password!"
}
```
2. User is not registered
\
Status: 404
```json
{
  "message": "User Not Found!"
}
```

### 7. Reset Password
HTTP Request: https://moksha-backend.onrender.com/users/reset-password
\
Method = [POST] 
\
Request:
```json
{
  "email": "suggi.aditya@gmail.com",
  "old_password" : "7w1e7gocar",
  "new_password" : "password"
}
```
Response:
1. Old Password and Password Sent to Email don't match
\
Status: 400
```json
{
  "message": "Password Not Matched!!"
}
```
2.  Old Password and Password Sent to Email match
\
Status: 200
```json
{
  "message": "Password Changed!!"
}
```
3. User is not registered
\
Status: 404
```json
{
  "message": "User Not Found!"
}
```

### 8. View
HTTP Request: https://moksha-backend.onrender.com/users/view
\
Method = [GET] 
\
Response:
\
Status: 200 
```json
{
  "message": "Success",
  "payload": [
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
    },
    {
      "id": 5,
      "name": "Arpan Saha",
      "institution_name": "NIT Agartala",
      "phone_no": 8413879829,
      "email": "arpansaha1300@gmail.com",
      "username": "Minsor",
      "password": "password",
      "user_id": "MOK-4ti890nj",
      "logged_in": true,
      "otp": null
    },
    {
      "id": 14,
      "name": "Arghajit",
      "institution_name": "NIT Agartala",
      "phone_no": 8413879829,
      "email": "arghajitbhowmik2001@gmail.com",
      "username": "Minsor",
      "password": "password",
      "user_id": "MOK-4x459er3",
      "logged_in": false,
      "otp": "6351"
    },
    {
      "id": 2,
      "name": "Argha",
      "institution_name": "NIT Agartala",
      "phone_no": 8118996525,
      "email": "bhowmikarghajit@gmail.com",
      "username": "Keraskp",
      "password": "123456789",
      "user_id": "MOK-s2l2dij8",
      "logged_in": false,
      "otp": ""
    },
    {
      "id": 17,
      "name": "Aditya",
      "institution_name": "NIT Agartala",
      "phone_no": 8118996525,
      "email": "adityakiran.cs@gmail.com",
      "username": "Aditya CS",
      "password": "123",
      "user_id": "MOK-af25ceta",
      "logged_in": false,
      "otp": "9545"
    }
  ]
}
```
### 9. View Particular User
HTTP Request: https://moksha-backend.onrender.com/users/MOK-xxxxxxxx
\
Method = [GET] 
\
Response:
1. Registered User
\
Status: 200 
```json
{
  "message": "Success",
  "payload": {
    "id": 5,
    "name": "Arpan Saha",
    "institution_name": "NIT Agartala",
    "phone_no": 8413879829,
    "email": "arpansaha1300@gmail.com",
    "username": "Minsor",
    "password": "password",
    "user_id": "MOK-4ti890nj",
    "logged_in": true,
    "otp": null
  }
}
```
2. Unregistered User
\
Status: 404 
```json
{
  "message": "User Not Found!"
}
```
