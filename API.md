# Backend APIs

## Insert proposal

POST `/API/thesis/proposals/{professorId}`
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
    - the **supervisor** is retrieved by the path variable and authenticated user

- response status:
  - `201 Created`: The proposal has been inserted in the DB
  - `400 Bad Request`: Error in the request body
  - `401 Unauthorized`: The user is not logged in
  - `500 Internal Server Error`: Generic server error
