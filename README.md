# Hackthon
Let's build some meaningful projects.
 +-------------------------+
|   User clicks "Login"   |
+-------------------------+
           |
           v
+-------------------------+      |
| GET /auth/google        |
+-------------------------+
           |
           v
+-------------------------+
| Backend (Express)       |
| Redirects to Google     |
| (OAuth request)        |
+-------------------------+
           |
           v
+-------------------------+
| Google Login Page       |
| User enters credentials |
+-------------------------+
           |
           v
+-------------------------+
| Google verifies user    |
| Redirects to callback   |
| (/auth/google/callback) |
+-------------------------+
           |
           v
+-------------------------+
| Backend handles         |
| authentication & stores |
| user session/token      |
+-------------------------+
           |
           v
+-------------------------+
| User is redirected to   |
| dashboard or homepage   |
+-------------------------+


1. User request for the # local