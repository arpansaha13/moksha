<div align="center">
  <img
    src="./client/public/moksha/moksha-512x512.png"
    alt="Moksha 2023 Logo"
    width="256" height="256"
   />
</div>

<h1 align="center">
  Moksha 2023
</h1>

<p align="center">
  Official Moksha 2023 website, NIT Agartala
</p>


## Features

### Major
- Authentication system
  - Sign up, login and verification
  - Forgot, reset, and change password
- Team creation, team invites and team joins
- Solo and team contest Registration
- User account and profile

### UX
- Maintain auth after token invalidation for the current session
- Renew session token on every new session
- Progress bar during navigation
- Show 404 page when team, event, or contest is not found
- Scroll to top after navigation

### Performance
- Route level code-splitting
- Responsive images with optimized formats
- Font fallback for custom font
- Preload bg image and custom font

### Security
- End-to-end network body encryption
- Redirect APIs through an express proxy server
- JWT tokens with HTTP-only secure cookies