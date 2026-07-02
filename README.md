# CIBC Student Life Helper

Prototype for a CIBC-connected Student Life Helper that activates existing student resources through a first-semester financial readiness journey.

## Experience

The prototype follows a focused first-semester readiness journey:

1. Welcome / student profile scan
2. Student readiness timeline
3. Biggest concern selection
4. Tuition and funding readiness
5. Move-in readiness
6. Banking and credit setup
7. First-month budget simulator
8. Readiness score dashboard
9. Advisor-ready action plan

The experience is educational and illustrative only. Resource cards link to official CIBC pages, but the prototype does not provide financial advice.

## Run Locally

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Open:

```text
http://localhost:5173
```

## Build Streamlit Bundle

Streamlit Cloud runs `streamlit_app.py`. The React app is embedded through a prebuilt self-contained HTML bundle.

```bash
npm run build:streamlit
```

This writes:

```text
streamlit_build/financial_coach.html
```

## Run With Streamlit Locally

```bash
pip install -r requirements.txt
streamlit run streamlit_app.py
```

## Deploy With Streamlit Community Cloud

1. Push this repository to GitHub.
2. Go to Streamlit Community Cloud.
3. Choose **New app**.
4. Select this GitHub repository.
5. Set the main file path to:

```text
streamlit_app.py
```

6. Deploy.

If the React app changes, rerun `npm run build:streamlit` and commit the updated `streamlit_build/financial_coach.html`.
