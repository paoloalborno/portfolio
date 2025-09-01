# Portfolio Website

This is the source code for my personal portfolio website, showcasing my projects, skills, and experience as a Software Engineer.

## Project Overview

This is not just a static portfolio. While the frontend is built with vanilla HTML, CSS, and JavaScript, it is backed by a robust, custom-built backend using **Java Spring Boot**. The backend handles authentication and authorization, allowing for protected routes and content.

The website is designed to be multilingual and features dynamic components loaded with JavaScript. It also includes a D3.js-powered data visualization to represent the backend architecture.

## Key Features

- **Multilingual Support**: All text is managed through a central `translations.js` file, allowing for easy switching between Italian, English, and French.
- **Dynamic Components**: The header and footer are loaded dynamically on each page.
- **Backend Integration**: The portfolio is connected to a Java Spring Boot backend for features like admin authentication.
- **D3.js Visualization**: The backend project page includes a D3.js graph to visually represent the system's architecture.
- **Responsive Design**: The website is fully responsive and designed to work on all devices.

## Technology Stack

### Frontend
- HTML5
- CSS3 (with Flexbox and Grid)
- Vanilla JavaScript (ES6 Modules)
- D3.js (for data visualization)
- Firebase Authentication (for handling the frontend part of the OAuth flow)

### Backend
- Java
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens) for authorization
- PostgreSQL (for data storage)
- Docker (for containerization)
- Render (for hosting)

## Project Structure

The project is organized as follows:

- `index.html`: The main landing page.
- `assets/`: Contains all static assets.
  - `css/`: Main stylesheet (`style.css`).
  - `js/`: All JavaScript files, including:
    - `main.js`: Core application logic.
    - `translations.js`: Multilingual text content.
    - `portfolio-backend-graph.js`: D3.js script for the architecture graph.
  - `images/`: All images and icons.
  - `templates/`: Reusable HTML for the header and footer.
- `pages/`: All secondary pages of the website.
  - `projects/`: Sub-directory containing the detail page for the backend project.
- `src/`: Contains source material not directly part of the static site.
  - `AI_Agent_Ollama_Langchain_Simple/`, `TaskList/`: Source code for other projects.
  - `resources/`: Other resources, like the downloadable CV.

## How to Run Locally

To view the website, you need to serve the files from a local web server to handle the dynamic loading of components (`fetch` API).

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Start a local server:**
    If you have Python installed, you can use its built-in HTTP server.
    ```bash
    # For Python 3
    python -m http.server

    # For Python 2
    python -m SimpleHTTPServer
    ```

3.  **Open in browser:**
    Navigate to `http://localhost:8000` in your web browser.
