# React + Vite Project

This project uses React and Vite to provide a dynamic and efficient web application experience. Below you will find information about the available routes and components used in this project.

## 🚀 Available Routes

- `GET /` - Home page
- `GET /login` - Login page
- `GET /studentDashBoard-:studentId` - Student dashboard
- `GET /teacherDashBoard-:teacherId` - Teacher dashboard
- `GET /.....` - [Other routes to be added]
- `GET *` - Page not found (404)

## 🧩 Components

- `BottomNavbar` - Bottom navigation bar for easy access.
- `LoggedInNavbar` - Top navigation bar for logged-in users.
- `Navbar` - Top navigation bar for users who are not logged in.
- `SearchBarStudent` - Custom search bar for students (without the new proposal button).
- `SearchBarTeacher` - Search bar for teachers (includes a new proposal button). **🛠️ To be IMPLEMENTED**
- `SideBar` - Versatile side bar for both students and teachers.
- `LoginForm` - User-friendly login form.
- `ThesisProposalList` - List of thesis proposals tailored for students. **✏️ Can be MODIFIED FOR TEACHER** 🛠️ To be IMPLEMENTED
- `RequestedProposalList` - Detailed list of requested thesis proposals for students.

- `?` - Details of the thesis proposals for students  **🛠️ To be IMPLEMENTED**
- `?` - thesis proposals list for the Professor  **🛠️ To be IMPLEMENTED**.

- `?` - Creation Page for a new Thesis proposal **🛠️ To be IMPLEMENTED URGENT TO FRIDAY!!!!!!!**.

## 🚧 Notes for Developers

- **Components to be Implemented:** Certain components are marked with "🛠️ To be IMPLEMENTED". These are either in the planning stages or currently under development.
- **Modifications Required:** Some components, like `ThesisProposalList`, are marked with "✏️ Can be MODIFIED". These components are functional but require modifications to better suit the needs of different user types (e.g., students, teachers).

We encourage contributors to focus on these areas to enhance the functionality and user experience of our application.
