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

## Search Proposals text search
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

## Search Proposals By Student CdS
**GET `API/thesis/proposals/search/:studentId`**

Display proposals that contain query string (caps-insensitive) in any of their fields, and filter by the student Cds.

- example request URL: (s644427 has CdS=ENG4 Civil Engineering)
  ```http://localhost:8081/API/thesis/proposals/search/s644427?query=innovative```
  => *show all proposals that contain the word "innovative" in any of their fields and filters by cds Civil Engeneering*
- response body: JSON containing all filtered proposals
```json
  [
  {
    "id": "000003e8-8169-21ee-8000-325096b39f47",
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
    "keywords": [
      "Structural Engineering",
      "Construction"
    ],
    "type": "Development",
    "groups": [
      "G41"
    ],
    "description": "Develop innovative solutions in structural engineering.",
    "requiredKnowledge": "Strong background in structural engineering",
    "notes": "This thesis focuses on developing innovative solutions in structural engineering. The student should have a strong background in structural engineering.",
    "expiration": "2024-02-29",
    "level": "MSc",
    "cds": [
      "Civil Engineering"
    ]
  }
  ]
  ```
- example request URL: (s654140 has CdS=ENG1 Computer Engineering)
  ```http://localhost:8081/API/thesis/proposals/search/s654140```
  => *show all proposals filtered only by the student CdS*
- response body: JSON containing all filtered proposals
```json
  [
  {
    "id": "000003e8-8169-21ee-9d00-325096b39f47",
    "title": "AI in Robotics",
    "supervisor": {
      "surname": "García",
      "name": "Sofía",
      "email": "sofia.garcia@example.com",
      "group": {
        "id": "G13",
        "department": {
          "codDepartment": "DEP01"
        }
      },
      "department": {
        "codDepartment": "DEP01"
      },
      "id": "p103"
    },
    "coSupervisors": [
      "Ji-Sung Park"
    ],
    "keywords": [
      "AI",
      "Robotics"
    ],
    "type": "Research",
    "groups": [
      "G11",
      "G13"
    ],
    "description": "Exploring the integration of AI in Robotics applications.",
    "requiredKnowledge": "Strong background in AI and Robotics",
    "notes": "This thesis aims to explore the current landscape and future potential of AI in Robotics applications. The student is expected to have a strong background in both AI and Robotics.",
    "expiration": "2024-12-31",
    "level": "BSc",
    "cds": [
      "Computer Engineering"
    ]
  },
  {
    "id": "000003e8-8169-21ee-ae00-325096b39f47",
    "title": "Cybersecurity in Critical Infrastructure",
    "supervisor": {
      "surname": "Park",
      "name": "Ji-sung",
      "email": "jisung.park@example.com",
      "group": {
        "id": "G11",
        "department": {
          "codDepartment": "DEP01"
        }
      },
      "department": {
        "codDepartment": "DEP01"
      },
      "id": "p111"
    },
    "coSupervisors": [
      "Sofía García"
    ],
    "keywords": [
      "Cybersecurity",
      "Critical Infrastructure"
    ],
    "type": "Research",
    "groups": [
      "G11",
      "G13"
    ],
    "description": "Investigate cybersecurity measures for critical infrastructure protection.",
    "requiredKnowledge": "Cybersecurity background",
    "notes": "This thesis involves the investigation of cybersecurity measures for critical infrastructure protection. The student should have a background in cybersecurity.",
    "expiration": "2025-12-31",
    "level": "BSc",
    "cds": [
      "Computer Engineering"
    ]
  }
  ]
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

## Accept an application
**PATCH `/API/thesis/applications/:professorId`**

Changes the application status to `accepted` or `declined`.
When an application is accepted, it automatically declines all the applications made by the same student to other proposals and 
by other students to the same proposal, and archives the proposal.

Example:
> There are 3 applications in the db:
> 
> (id:1, student:A, proposal:p1)
> 
> (id:2, student:B, proposal:p1)
> 
> (id:3, student:A, proposal:p3)
> 
> If application 1 is accepted, then application 2 (made by another student to the same proposal p1)
> and application 3 (made by the same student A) are declined. Furthermore, proposal p1 is archived

- request parameter `professorId`: the logged in professor, which should be the supervisor of the proposal applied to
- request body example:
    ```
    {
        "id" : "f92b3e16-5291-44eb-ab6b-29d0ab97df9b",
        "status": "accepted",
    }
    ```

- response status:
  - `200 Ok`: The application status has been changed
  - `403 Forbidden`: The professor can't operate on the application
  - `404 Not Found`: The application wasn't found
  - `422 Unprocessable Entity`: The application has already been accepted/declined
  - `500 Internal Server Error`: Generic server error

## Browse Applying Students for Proposal
**GET `API/thesis/applications/students?proposalId=`**

Returns all Student entries in a list that applied for a specific proposal. The request can only be made by a user with professor 
access rights. 

- Response body example: 
  ```
  [
    {
        "id": "s654140",
        "surname": "Davis",
        "name": "John",
        "gender": "Male",
        "nationality": "American",
        "email": "s654140@example.com",
        "codDegree": "2020",
        "enrollmentYear": null
    }
  ]
  ```

## Browse Applications for Proposal
**GET `API/thesis/applications/by?proposalId=`**

Returns all applications for a specific proposal. The request can only be made by a user with professor
access rights.

- Response body example:
  ```
  [
  {
  "id": "f92b3e16-5291-44eb-ab6b-29d0ab97df9b",
  "studentId": "s654140",
  "proposalId": "000003e8-8169-21ee-b800-325096b39f47",
  "status": "pending"
  }
  ]
  ```
## Thesis Proposals Information Endpoints

The following endpoints provide information about distinct attributes related to thesis proposals.

### Get Distinct Proposal Attributes

#### Endpoint

```http
GET /API/thesis/proposals/{attribute}
```
### Description

- Retrieve a list of distinct values for the specified attribute in thesis proposals.
Path Parameters

    attribute (String): The attribute for which distinct values are requested. Possible values: `supervisors`, `coSupervisors`, `types`, `levels`, `keywords`, `groups`, `degrees`.

- Response

    200 OK: Returns a list of strings representing distinct values for the specified attribute.

### Examples
- Get Distinct Supervisor Names

```http
GET /API/thesis/proposals/supervisors
```
- Get Distinct Co-Supervisor Names

```http
GET /API/thesis/proposals/coSupervisors
```
- Get Distinct Proposal Types

```http
GET /API/thesis/proposals/types
```
- Get Distinct Proposal Levels

```http
GET /API/thesis/proposals/levels
```
- Get Distinct Proposal Keywords

```http
GET /API/thesis/proposals/keywords
```
- Get Distinct Proposal Groups

```http
GET /API/thesis/proposals/groups
```
- Get Distinct Proposal Degrees (Cds)

```http
GET /API/thesis/proposals/degrees
```
## Filtered Search Proposals
**POST `/API/thesis/proposals/search-filtered`**

- Filters search results through sending a body request with various **optional** filters,
- The result is the **intersection** of:
  - `supervisor`
  - `coSupervisors`
  - `keywords`
  - `type`
  - `groups`
  - `cds`
- Plus an optional `queryString` contained in `title` **or** `description` **or** `notes` **or** `requiredKnowledge`
- A filter in `endDate` within `Proposal.expiration`
### Authentication
- Requires a valid access token.
- Accessible to users with the roles 'Student' or 'Professor'.

### Request Body

- The request body should contain a JSON object with the following filter criteria:


    - supervisor (String, optional): Filter by supervisor's name.
    - coSupervisors (List of Strings, optional): Filter by co-supervisors' names.
    - keywords (List of Strings, optional): Filter by proposal keywords.
    - types (List of Strings, optional): Filter by proposal types.
    - groups (List of Strings, optional): Filter by proposal groups.
    - cds (List of Strings, optional): Filter by Course of Study names.
    - queryString (String, optional): Filter by a general query string.
    - endDate (LocalDate, optional): Filter proposals with expiration dates on or before this date.

- Example Request Body #1:

```json
{
  "supervisor": "Luca Ferrari",
  "coSupervisors": ["Ji-Sung Park"],
  "keywords":["AI"],
  "types":["Research"],
  "groups": ["G11", "G13"],
  "cds": ["Computer Engineering"],
  "queryString": "AI",
  "endDate": "2024-09-01"
}
```
### Response

    Returns a list of thesis proposals that match the provided filter criteria.
    Each proposal is represented as a ProposalDTO object.

- Example Response #1:

```json
[
  {
    "id": "000003e8-8169-21ee-9d00-325096b39f47",
    "title": "AI in Robotics",
    "supervisor": {
      "surname": "García",
      "name": "Sofía",
      "email": "p103@example.com",
      "group": {
        "id": "G13",
        "department": {
          "codDepartment": "DEP01"
        }
      },
      "department": {
        "codDepartment": "DEP01"
      },
      "id": "p103"
    },
    "coSupervisors": [
      "Ji-Sung Park"
    ],
    "keywords": [
      "AI",
      "Robotics"
    ],
    "type": [
      "Research"
    ],
    "groups": [
      "G11",
      "G13"
    ],
    "description": "Exploring the integration of AI in Robotics applications.",
    "requiredKnowledge": "Strong background in AI and Robotics",
    "notes": "This thesis aims to explore the current landscape and future potential of AI in Robotics applications. The student is expected to have a strong background in both AI and Robotics.",
    "expiration": "2024-12-31",
    "level": "BSc",
    "cds": [
      "Computer Engineering"
    ]
  },
  {
    "id": "000003e8-8169-21ee-a500-325096b39f47",
    "title": "AI-driven Healthcare Systems",
    "supervisor": {
      "surname": "Ferrari",
      "name": "Luca",
      "email": "p101@example.com",
      "group": {
        "id": "G13",
        "department": {
          "codDepartment": "DEP01"
        }
      },
      "department": {
        "codDepartment": "DEP01"
      },
      "id": "p101"
    },
    "coSupervisors": [
      "Ji-Sung Park"
    ],
    "keywords": [
      "AI",
      "Healthcare Systems"
    ],
    "type": [
      "Research"
    ],
    "groups": [
      "G11",
      "G13"
    ],
    "description": "Explore the application of AI in healthcare systems.",
    "requiredKnowledge": "Healthcare and AI knowledge",
    "notes": "This thesis explores the application of AI in healthcare systems. The student should have knowledge in both healthcare and AI.",
    "expiration": "2024-08-31",
    "level": "BSc",
    "cds": [
      "Computer Engineering"
    ]
  }
]
```
- Example Request Body #2:

```json
{
  "cds": ["Civil Engineering"],
  "endDate": "2024-12-01"
}

```
- Example Response #2:

```json
[
  {
    "id": "000003e8-8169-21ee-8000-325096b39f47",
    "title": "Structural Engineering",
    "supervisor": {
      "surname": "Crociera",
      "name": "Tommaso",
      "email": "p110@example.com",
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
    "keywords": [
      "Structural Engineering",
      "Construction"
    ],
    "type": [
      "Development"
    ],
    "groups": [
      "G41"
    ],
    "description": "Develop innovative solutions in structural engineering.",
    "requiredKnowledge": "Strong background in structural engineering",
    "notes": "This thesis focuses on developing innovative solutions in structural engineering. The student should have a strong background in structural engineering.",
    "expiration": "2024-02-29",
    "level": "MSc",
    "cds": [
      "Civil Engineering"
    ]
  },
  {
    "id": "000003e8-8169-21ee-9900-325096b39f47",
    "title": "Environmental Impact of Renewable Energy",
    "supervisor": {
      "surname": "Crociera",
      "name": "Tommaso",
      "email": "p110@example.com",
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
    "keywords": [
      "Environmental Impact",
      "Renewable Energy"
    ],
    "type": [
      "Development"
    ],
    "groups": [
      "G41"
    ],
    "description": "Assess the environmental impact of renewable energy projects.",
    "requiredKnowledge": "Environmental science background",
    "notes": "This thesis focuses on assessing the environmental impact of renewable energy projects. The student should have a background in environmental science.",
    "expiration": "2024-11-30",
    "level": "MSc",
    "cds": [
      "Civil Engineering"
    ]
  }
]
```
### Error Responses

    - 400 Bad Request: If the request body is malformed or contains invalid data.
    - 403 Forbidden: If the user does not have the required roles.
    - 500 Internal Server Error: If an unexpected error occurs.

## Update Proposal
**PUT `/API/thesis/proposals/update/{path}`**
- path variable path: is the proposalId of the proposal to change
- request body example:
    ```
    {"title": "AI in Robotics",
  "coSupervisors": ["p10", "p11"],
  "keywords": ["Keyword1", "Keyword2"],
  "type": ["Type1", "Type2"],
  "groups": ["G21", "G22"],
  "description": "Description",
  "requiredKnowledge": "Required Knowledge",
  "notes": "Notes",
  "expiration": "2023-12-31",
  "level": "MSc",
  "CdS": ["Computer Engineering","Computer Engineering"]
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