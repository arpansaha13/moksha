
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
  "verification_code" : "7w1e7gocar",
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
## EVENT
### 1. Get event details of a particular user
HTTP Request: https://moksha-backend.onrender.com/new/details/MOK-s2l2dij8
\
Method = [GET] 
\
Response:
1. Registered for any event
\
Status: 200 
```json
{
  "message": "Success",
  "payload": {
    "solo_event": [
      {
        "id": 1,
        "user_id": "MOK-s2l2dij8",
        "event_id": "E-1",
        "event_name": "dance"
      }
    ],
    "team_event": [
      {
        "id": 3,
        "user_id": "MOK-s2l2dij8",
        "team_id": "T-omkwz81o",
        "team_name": "hydraze1",
        "event_id": "E-3",
        "event_name": "drama",
        "leader": "MOK-s2l2dij8"
      }
    ]
  }
}
```
2. No registered events
\
Status: 404 
```json
{
  "message": "No registered events!"
}
```
### 2. View Solo Table 
HTTP Request: https://moksha-backend.onrender.com/new/viewdetailssolo
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
  "payload": [
    {
      "id": 1,
      "user_id": "MOK-s2l2dij8",
      "event_id": "E-1",
      "event_name": "dance"
    }
  ]
}
```

### 3. View Team Table 
HTTP Request: https://moksha-backend.onrender.com/new/viewdetailsteam
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
  "payload": [
    {
      "id": 3,
      "user_id": "MOK-s2l2dij8",
      "team_id": "T-omkwz81o",
      "team_name": "hydraze1",
      "event_id": "E-3",
      "event_name": "drama",
      "leader": "MOK-s2l2dij8"
    },
    {
      "id": 4,
      "user_id": "MOK-ssev2rmf",
      "team_id": "T-omkwz81o",
      "team_name": "hydraze1",
      "event_id": "E-3",
      "event_name": "drama",
      "leader": "MOK-s2l2dij8"
    }
  ]
}
```

### 4. Register for Solo Event
HTTP Request: https://moksha-backend.onrender.com/new/event
\
Method = [POST] 
\
Request:
```json
{
  "user_id": "MOK-4x459er3s",
  "event_id": "SE2",
  "event_name" : "Dance"
}
```
Response:
1. Registered User
\
Status: 201 
```json
{
  "message": "User registered successfully!!"
}
```
2. Already Registered for the event
\
Status: 400 
```json
{
  "message": "User already registered for the event!"
}
```
3. Unregistered User
\
Status: 404
```json
{
  "message": "User not found!"
}
```

### 5. Create Team
HTTP Request: https://moksha-backend.onrender.com/new/createteam
\
Method = [POST] 
\
Request:
```json
{
  "user_id": "MOK-4x459er3s",
  "team_name": "DRX"
}
```
Response:
1. Only Leader can create Team
\
Status: 201 
```json
{
  "message": "Team created successfully!!",
  "payload": {
    "team_id": "T-oimi2n0l"
  }
}
```
2. Already Registered for the event
\
Status: 400 
```json
{
  "message": "Team Already Exists!"
}
```
3. Unregistered User
\
Status: 403
```json
{
  "message": "Unregistered User!"
}
```
### 6. Join Team
HTTP Request: https://moksha-backend.onrender.com/new/jointeam
\
Method = [POST] 
\
Request:
```json
{
  "user_id": "MOK-4x459er3s",
  "team_name": "DRX"
}
```
Response:
1. Only Leader can add Team Members, if team_id is correct 
\
Status: 201 
```json
{
  "message": "Member Added!!"
}
```
2. Already Registered for the event
\
Status: 400 
```json
{
  "message": "User already registered for the event!"
}
```
3. Team Doesn't Exist
\
Status: 404
```json
{
  "message": "Team Doesn't Exists!"
}
```

## CREATE/JOIN TEAM  
