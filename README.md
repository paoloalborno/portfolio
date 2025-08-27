# Portfolio Website

This is the source code for my personal portfolio website.

## Project Structure

The project is organized as follows:

- `index.html`: The main landing page.
- `CNAME`: DNS configuration file for custom domain mapping.
- `README.md`: This file.
- `assets/`: Contains all static assets for the website.
  - `css/`: Contains the main stylesheet (`style.css`).
  - `js/`: Contains all JavaScript files, including the main logic (`main.js`) and translations (`translations.js`).
  - `images/`: Contains all images used in the website.
  - `templates/`: Contains reusable HTML templates for the header and footer.
- `pages/`: Contains all the secondary pages of the website.
  - `about.html`, `projects.html`, etc.
  - `projects/`: A sub-directory containing the detail pages for each project.
- `src/`: Contains source material not directly part of the static site's assets.
  - `python/`: Contains source code for Python projects showcased on the site.
  - `resources/`: Contains other resources, like the downloadable PDF version of the CV.

## How it Works

The website is mostly static HTML and CSS, with some JavaScript for dynamic functionality:

- **Dynamic Header/Footer**: The header and footer are stored in the `assets/templates/` directory and are loaded into every page dynamically by `assets/js/main.js`. This makes them easy to update across the entire site.
- **Translations**: The website supports both Italian and English. All text strings are stored in `assets/js/translations.js`. The `assets/js/main.js` script detects the user's preferred language (from the URL parameter `?lang=` or `localStorage`) and populates the text content accordingly.
- **Responsive Design**: The site uses CSS media queries to adapt its layout for different screen sizes, from mobile phones to desktops.

## How to View

Simply open the `index.html` file in a web browser. For the dynamic features (like loading the header/footer) to work correctly, it's best to serve the files from a local web server.

For example, using Python's built-in server:
```bash
python -m http.server
```
Then navigate to `http://localhost:8000` in your browser.
