# Backend APIs

## Insert proposal

POST `/API/thesis/proposals`
- request body example:
    ```
    {
        "title" : "Advanced algorithms for image processing",
        "supervisor": "Name Surname" or "dID",
        "coSupervisors": [ "Marco Rossi" ],
        "keywords" : ["image processing"],
        "type" : "in external company",
        "groups" : "GRAINS",
        "description" : "Work in a company to develop new algorithms for image processing"
        "requiredKnowledge" : "Basics of machine learning and image processing"
        "notes": "Collaboration with company equipe. Reimbursement of expenses"
        "expiration": "2024-04-23"
        "level" : "Master"
        "CdS": ["Computer Engineering", "Data Science and Engineering"]
    }
    ```
    request body notes & constraints:
    - `coSupervisors`, `requiredKnowledge`, `notes` are *optional*
    - `expiration` is a date in the form `YYYY-MM-DD`
    - `level` is one between `Bachelor` and `Master`

- response status:
  - `201 Created`: The proposal has been inserted in the DB
  - `400 Bad Request`: Error in the request body
  - `401 Unauthorized`: The user is not logged in
  - `403 Forbidden`: The user is logged in but is not the professor of the proposal
  - `500 Internal Server Error`: Generic server error