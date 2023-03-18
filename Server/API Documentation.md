# API DOCUMENTATION

BASE URL:- http://localhost:8000

## Auth Routes

BASE URL :- /auth

- **Register :-** _POST_ -> /register
  > Request Body :- {adhaar, name, password}
  > Response Body :- {msg, success = true}, if successful (error, success = false) if failed
- **Login :-** _POST_ -> /login
  > Request Body :- {adhaar, password}
  > Response Body :- {msg, success = true, token}, if successful (error, success = false) if failed
- **Admin Login :-** _POST_ -> /admin/login
  > Request Body :- {username, password}
  > Response Body :- {msg, success = true, token}, if successful (error, success = false) if failed
- **Doctor Login :-** _POST_ -> /doc/login
  > Request Body :- {licId, password}
  > Response Body :- {msg, success = true, token}, if successful (error, success = false) if failed
- **Doctor Register :-** _POST_ -> /doc/register [FOR ADMINs ONLY]
  > Request Body :- {docId, password, name, phone}
  > Response Body :- {msg, success = true}, if successful (error, success = false) if failed

---

## User Routes

BASE URL :- /user

- **Get Details :-** _GET_ -> /me
  > Response Body :- {name, email, phone, {addr}, dob, bloodGrp, [{medHist}]}
- **Edit Details :-** _PUT_ -> /me
  > Request Body :- {name, email, phone, addr, dob, bloodGrp}
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed
- **Get Details :-** _GET_ -> /medical/:userId [FOR DOCTORs ONLY]
  > Response Body :- {medHist, success = true} if successful (error, success = false) if failed
- **Add Medical :-** _PUT_ -> /medical/:userId [FOR DOCTORs ONLY]
  > Request Body :- FORM DATA :: [ medical - {.pdf, .jpg, .jpeg} ]
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed
- **Delete Medical :-** _DELETE_ -> /medical/:userId [FOR DOCTORs ONLY]
  > Request Body :- {pid}
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed

## Admin Routes

BASE URL :- /admin
