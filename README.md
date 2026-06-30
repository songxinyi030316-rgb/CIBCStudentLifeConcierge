# CIBC AI Financial Coach

Prototype for a CIBC-connected AI Financial Coach that helps everyday banking customers build decision confidence before speaking with an advisor.

## Experience

The prototype follows this flow:

1. Sign in with CIBC Online Banking
2. AI account scan
3. Goal chat
4. Strategy comparison
5. What-if playground
6. Advisor-ready summary and draft advisor email

The experience is educational and illustrative only. Product suitability, rates, eligibility, tax treatment, and investment risk should be reviewed with a CIBC advisor.

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
