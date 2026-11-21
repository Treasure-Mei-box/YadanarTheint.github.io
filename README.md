# Yadanar Theint – Portfolio

[![Deploy to GitHub Pages](https://github.com/Treasure-Mei-box/treasure-mei-box.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Treasure-Mei-box/treasure-mei-box.github.io/actions/workflows/deploy.yml)
![Hosted on GitHub Pages](https://img.shields.io/badge/hosted%20on-GitHub%20Pages-222?logo=github)

My personal portfolio site, showcasing my projects, skills and experience as a Computer Science (Data Science) student.

🔗 **Live site:** [[treasure-mei-box.github.io](https://treasure-mei-box.github.io/YadanarTheint.github.io/)]

---

## About Me

I'm Yadanar Theint, a Bachelor of Computer Science student majoring in **Data Science** at INTI International College Subang, in collaboration with Swinburne University of Technology. I'm based in Malaysia and interested in data analysis, data visualization , data engineering and AI engineering .

I'm currently looking for **graduate / internship roles** in data and AI. Feel free to reach out to me.

## What's on the Site

| Section | Contents |
|---|---|
| **Home** | Introduction, portrait, Power BI badge and CV preview / download actions |
| **About** | Background, focus areas and what I'm currently working on |
| **Projects** | Seven selected projects with descriptions, tech stacks and links to code / live demos |
| **Skills** | Languages, data & BI tools, web and DevOps grouped by area |
| **Certifications** | Microsoft Power BI and LinkedIn credentials, linked to my LinkedIn profile |
| **Experience & Education** | Work history, degree and coursework highlights |
| **Contact** | Email and social links |

Clicking **View CV** opens an in-page preview of my resume before downloading it.

## Featured Projects

| Project | Description | Tech |
|---|---|---|
| [Online Convenience Store System](https://github.com/Treasure-Mei-box/SWE40006-Group-Project) | CI/CD pipeline on Microsoft Azure for a Flask store (SWE40006) | Python, Flask, Docker, GitHub Actions, Azure |
| [AirAware — Air Quality Analytics](https://github.com/Treasure-Mei-box/COS30049-Computing-Technology-Innovation-Project-by-YSA) | AQI forecasting and clustering across Malaysia, Singapore and Thailand | Python, scikit-learn, XGBoost, React |
| [Traffic-Based Route Guidance System](https://github.com/Treasure-Mei-box/cos30019-assignment-2b) | LSTM traffic forecasting feeding an A* route search (COS30019) | Python, TensorFlow/Keras, A* Search |
| [Your Local Shop](https://github.com/Treasure-Mei-box/SWE30003---SoftwareArchitecture) | Full-stack e-commerce management system (SWE30003) | React, FastAPI, REST APIs, SQL |
| [ASEAN Health Statistics](https://github.com/Treasure-Mei-box/COS30045---Data-Visualization-) | Interactive D3.js data story on ASEAN health indicators (COS30045) | D3.js, JavaScript, GeoJSON |
| Melbourne Property Insights | Tableau dashboards comparing Melbourne suburbs on price, yield and growth | Tableau, Excel |
| SMART ZOO | IoT monitoring with RFID access control and cloud dashboards | IoT Sensors, Thingsboard, Docker |

## Skills

- **Languages:** Python, SQL, JavaScript, HTML, CSS
- **Data & BI:** Power BI, Tableau, Excel, KNIME, pandas, scikit-learn, TensorFlow/Keras
- **Web:** React, FastAPI, Node.js, REST APIs
- **Tools & DevOps:** Git, GitHub, GitHub Actions, Docker, Azure, VS Code, Google Colab

## Design

The site uses a **Warm Autumn Glow** palette (espresso, burnt orange, golden amber, terracotta and cream) with `Fraunces` for display type, `Inter` for body text and `JetBrains Mono` for labels.

## Built With

- **HTML5, CSS3 and JavaScript:** a lightweight static site with no backend
- **GitHub Pages:** free hosting
- **GitHub Actions:** automatically builds, checks and deploys the site on every push to `main`

## Project Structure

```
treasure-mei-box.github.io/
├── index.html              # Main page
├── css/
│   └── style.css           # Styles
├── js/
│   └── main.js             # Interactivity
├── assets/
│   ├── images/             # Project screenshots, profile photo
│   └── Yadanar_Theint_CV.pdf
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
└── README.md
```

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Treasure-Mei-box/treasure-mei-box.github.io.git
   cd treasure-mei-box.github.io
   ```
2. Start a local server (any one of these):
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```
3. Open <http://localhost:8000> in your browser.

## Deployment

The site is deployed automatically with **GitHub Actions**:

1. A push to the `main` branch triggers the workflow in `.github/workflows/deploy.yml`.
2. The workflow checks out the code, validates the HTML and links, and uploads the site as a Pages artifact.
3. GitHub Pages publishes the new version to <https://treasure-mei-box.github.io>.

To set this up on a fresh repository, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.

## Contact

- **GitHub:** [@Treasure-Mei-box](https://github.com/Treasure-Mei-box)
- **LinkedIn:** [linkedin.com/in/yadanar-theint](https://www.linkedin.com/in/yadanar-theint)
- **Email:** yadanartheint2412@gmail.com

---

© 2026 Yadanar Theint. The content and images on this site are my own; the code is free to use as a reference.
