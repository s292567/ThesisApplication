# Backend APIs

## Get All Proposals

**GET `/API/thesis/proposals/all`**
  
  Display all existing proposals

- response body: JSON containing all proposals
- response status:
  - `200 OK`: All proposals are being displayed
  - `401 Unauthorized`: The user is not logged in
  - `500 Internal Server Error`: Generic server error

## Get Proposals by cds
**GET `API/thesis/proposals/cds`**

  Display proposals filtered by cds
- example request URL:
```http://localhost:8080/API/thesis/proposals/cds?cds=ENG4``` => *show all proposals that are part of the cds "ENG4"*
- response body: JSON containing all filtered proposals
- response status:
  - `200 OK`: All filtered proposals are being displayed
  - `401 Unauthorized`: The user is not logged in
  - `500 Internal Server Error`: Generic server error

## Search Proposals
**GET `API/thesis/proposals/search`**

Display proposals that contain query string (caps-insensitive) in any of their fields

- example request URL:
  ```http://localhost:8080/API/thesis/proposals/search?query=innovative``` 
=> *show all proposals that contain the word "innovative" in any of their fields*
- response body: JSON containing all filtered proposals 
```json
  {
  "title": "Structural Engineering",
  "supervisor": {
    "surname": "Crociera",
    "name": "Tommaso",
    "email": "tommaso.crociera@example.com",
    "group": {
      "id": "G41",
      "department": {
        "codDepartment": "DEP04"
      }
    },
    "department": {
      "codDepartment": "DEP04"
    },
    "id": "p110"
  },
  "coSupervisors": [],
  "keywords": ["Structural Engineering", "Construction"],
  "type": "Development",
  "groups": ["G41"],
  "description": "Develop innovative solutions in structural engineering.",
  "requiredKnowledge": "Strong background in structural engineering",
  "notes": "This thesis focuses on developing innovative solutions in structural engineering. The student should have a strong background in structural engineering.",
  "expiration": "2024-02-28",
  "level": "MSc",
  "cds": ["Civil Engineering"],
  "id": "000003e8-8169-21ee-8000-325096b39f47"
  }
  ```
- response status:
  - `200 OK`: All filtered proposals are being displayed
  - `401 Unauthorized`: The user is not logged in
  - `500 Internal Server Error`: Generic server error

## Insert Proposal
**POST `/API/thesis/proposals/{professorId}`**
- path variable `professorId`: the id of the professor inserting the proposal
- request body example:
    ```
    {
        "title" : "Advanced algorithms for image processing",
        "coSupervisors": [ "Paolo Ricci", "Mario Rossi" ],
        "keywords" : ["image processing"],
        "type" : "in external company",
        "groups" : ["G13","G21"],
        "description" : "Work in a company to develop new algorithms for image processing"
        "requiredKnowledge" : "Basics of machine learning and image processing"
        "notes": "Collaboration with company equipe. Reimbursement of expenses"
        "expiration": "2024-04-23"
        "level" : "MSc"
        "CdS": ["ENG1", "ENG3"]
    }
    ```
    request body notes & constraints:
    - `coSupervisors`, `requiredKnowledge`, `notes` are *optional*
    - `expiration` is a date in the form `YYYY-MM-DD`
    - the **supervisor** is retrieved by path variable and the authenticated user

- response status:
  - `201 Created`: The proposal has been inserted in the DB
  - `400 Bad Request`: Error in the request body
  - `401 Unauthorized`: The user is not logged in
  - `500 Internal Server Error`: Generic server error

## Apply to Proposal
**POST `/API/thesis/proposals/apply`**
- request body example:
    ```
    {
        "studentId" : "s654140",
        "proposalId": "000003e8-8169-21ee-ae00-325096b39f47",
    }
    ```

- response status:
  - `201 Created`: The application to the proposal has been created
  - `404 Not Found`: The proposal has not been found
  - `401 Unauthorized`: The user is not logged in
  - `500 Internal Server Error`: Generic server error
