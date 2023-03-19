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
  > Request Body :- {licId, password, name, phone}
  > Response Body :- {msg, success = true}, if successful (error, success = false) if failed
- **Driver Login :-** _POST_ -> /driver/login
  > Request Body :- {adhaar, password}
  > Response Body :- {msg, success = true, token}, if successful (error, success = false) if failed
- **Driver Register :-** _POST_ -> /driver/register [FOR ADMINs ONLY]

  > Request Body :- {licId, password, name, phone, dLicId}

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

---

## Doctor Routes

BASE URL :- /doc

- **Get Details :-** _GET_ /me
  > Response Body :- {name, phone, licId, [{prevPatients}]}
- **Get All Doctors :-** _GET_ / [FOR ADMINs ONLY]
  > Response Body :- [{Doctor}]
- **Edit Details :-** _PUT_ /me
  > Request Body :- {name, phone, licId}
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed
- **Get Doctor :-** _GET_ /:doctorId
  > Response Body :- {doctor, success = true}
- **Edit Details :-** _PUT_ /:doctorId [FOR ADMINs ONLY]
  > Request Body :- {name, phone, licId}
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed
- **Delete Doctor :-** _DELETE_ /:doctorId [FOR ADMINs ONLY]
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed

---

## Driver Routes

BASE URL :- /driver

- **Get Details :-** _GET_ /me
  > Response Body :- {name, adhaar, phone, dLicId}
- **Get All Drivers :-** _GET_ / [FOR ADMINs ONLY]
  > Response Body :- [{Driver}]
- **Edit Details :-** _PUT_ /me
  > Request Body :- {name, phone, dLicId, adhaar}
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed
- **Get Driver :-** _GET_ /:driverId
  > Response Body :- {driver, success = true}
- **Edit Details :-** _PUT_ /:driverId [FOR ADMINs ONLY]
  > Request Body :- {name, phone, licId}
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed
- **Delete Driver :-** _DELETE_ /:driverId [FOR ADMINs ONLY]
  > Response Body :- {msg, success = true} if successful (error, success = false) if failed

## Admin Routes

BASE URL :- /admin

---

## Ambulance Routes

BASE URL :- /ambulance

- **Get all details** _GET_ -> /
  > Response Body :- [{id, plateNo, regNo, chassisNo}] if success {error}
- **Get detail by id** _GET_ -> /:id
  > Response Body :- {id, plateNo, regNo, chassisNo} if success {error}
- **Add an ambulance** _POST_ -> /

  > Request Body :- {plateNo, regNo, chassisNo}

  > Response Body :- {the created element} {error}

- **Delete an ambulance** _DELETE_ -> /:id
  > Response deleted ambulnace {error}
- **UPDATE an ambulance** _PUT_ -> /:id

  > Request Body :- {plateNo, regNo, chassisNo}

  > Response Body :- {updated element} {error}

---

## Disease Routes

BASE URL :- /ambulance

- **Get all details** _GET_ -> /
  > Response Body :- [{id, name}] if success {error}
- **Get detail by id** _GET_ -> /:id
  > Response Body :- {id, plateNo, regNo, chassisNo} if success {error}
- **Add an ambulance** _POST_ -> /

  > Request Body :- {plateNo, regNo, chassisNo}

  > Response Body :- {the created element} {error}

- **Delete an ambulance** _DELETE_ -> /:id
  > Response deleted ambulnace {error}
- **UPDATE an ambulance** _PUT_ -> /:id

  > Request Body :- {plateNo, regNo, chassisNo}

  > Response Body :- {updated element} {error}
