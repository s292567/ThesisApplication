# Frontend Documentation for ThesisApplication

## Project Overview
This documentation provides an overview of the frontend structure of the ThesisApplication. The frontend is organized into various directories, each serving specific functions within the application.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Routes and Pages](#routes-and-pages)
3. [Component Import/Export](#component-import-export)

## Project Structure
The frontend is organized into the following directories:
- `api`: Contains API files with functions for API calls.
- `assets/images`: Stores image assets.
- `components`: Contains shared components between pages.
- `contexts`: Includes the `UserContext`.
- `pages`: Houses Page components.
- `routes`: Contains JSON files for indexing frontend and API routes.
- `tests`: Contains test files.
- `utils`: Includes utility functions
- `App.jsx`: The main container that contains the router for the pages.
- `CheckAuthenticatedRoute.jsx`: A component that contains the routes and render some pages only if the user is authenticated.

## Routes and Pages
The application uses the following routes, each associated with specific pages:

- Landing Page: `/`
- Login Page: `/login`
- Professor Dashboard - Create New Proposal: `/professorDashboard/createNewProposal/`
- Student Dashboard: `/studentDashboard`
- Professor Dashboard: `/professorDashboard`
- Page Not Found: `/pageNotFound`

## Component Import Export
Each directory often has an `index.js` file to streamline the import/export process. Here's an example of how to use `index.js` for efficient component management:

### Example
- To export a component from a directory:

  ```javascript
  // In your component file (e.g., MyComponent.jsx)
  export default MyComponent;

  // In index.js of the same directory
  import MyComponent from './MyComponent';
  //and then export it
  export { MyComponent };

  // as example if I want to export from the pages directory
  // Into the index.js file:
  import LandingPage from './LandingPage/LandingPage';
  import LoginPage from './LoginPage/LoginPage';
  export { LandingPage, LoginPage };
    ```

- To import this component in another file:

    ```javascript
    // Instead of importing directly from the component file
    import MyComponent from '../path/to/MyComponent';

    // Use the index.js for a cleaner import
    import { MyComponent } from '../path_to_directory';

    // As example if I want to import from the pages directory
    import { LandingPage, LoginPage } from '../pages';
    ```
