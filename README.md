# Database

## Student Table

Stores information about students, including personal details and academic enrollment. Primary key is id, and it has a many-to-one relationship with the Degree table.
### Fields

    id: Unique identifier for the student.
    surname: Surname of the student.
    name: First name of the student.
    gender: Gender of the student.
    nationality: Nationality of the student.
    email: Email address of the student.
    degree: Degree in which the student is enrolled.
    enrollmentYear: Year in which the student enrolled.

## Teacher Table

Stores information about teachers, including personal details and department/group associations. Primary key is id, and it has many-to-one relationships with the GroupDep and Department tables.
### Fields

    id: Unique identifier for the teacher.
    surname: Surname of the teacher.
    name: First name of the teacher.
    email: Email address of the teacher.
    group: Group to which the teacher belongs, further division within a department.
    department: Department to which the teacher belongs.
    
## Career Table

Represents the academic career of a student, including details about the courses they have taken. Uses a composite primary key (student_id and codCourse) defined by the CareerId class.
### Fields

    student: Student associated with the career.
    codCourse: Unique code for the course.
    titleCourse: Title of the course.
    cfu: Credit units for the course.
    grade: Grade obtained in the course.
    date: Date when the course was completed.

## Degree Table

Stores information about academic degrees. Primary key is codDegree, which uniquely identifies each degree.
### Fields

    codDegree: Unique code for the degree.
    titleDegree: Title of the degree.

## Department Table

Represents academic departments within the institution. Primary key is codDepartment, uniquely identifying each department.
### Fields

    codDepartment: Unique code for the department.

## GroupDep Table

Represents groups associated with a department. Primary key is id, and it has a many-to-one relationship with the Department table.
### Fields

    id: Unique identifier for the group.
    department: Department to which the group belongs.

## Proposal Table

Stores information about research proposals for academic projects. Includes details about the supervisor, co-supervisors, keywords, groups, and other relevant information. Uses a generated UUID (id) as the primary key.
### Fields

    id: Unique identifier for the proposal.
    title: Title of the proposal.
    supervisor: Main teacher supervising the proposal.
    coSupervisors: Comma-separated string of teacher IDs serving as co-supervisors. *optional*
    keywords: Keywords associated with the proposal.
    type: Type of the proposal (e.g., Research, Development).
    groups: Comma-separated string of group IDs associated with the proposal.
    description: Description of the proposal.
    requiredKnowledge: Required knowledge for the proposal. *optional*
    notes: Additional notes for the proposal. *optional*
    expiration: Expiration date of the proposal.
    level: Level of the proposal (e.g., BSc, MSc).
    cds: Course of study associated with the proposal.

# Relational Diagram
![diagram](https://github.com/s292567/ThesisApplication/blob/[branch]/diagram.png?raw=true)
