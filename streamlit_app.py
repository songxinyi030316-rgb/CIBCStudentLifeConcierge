from pathlib import Path
import hashlib

import streamlit as st
import streamlit.components.v1 as components


st.set_page_config(
    page_title="CIBC CampusGo",
    layout="wide",
    initial_sidebar_state="collapsed",
)

bundle_path = Path(__file__).parent / "streamlit_build" / "financial_coach.html"

if not bundle_path.exists():
    st.error("CIBC CampusGo bundle is missing. Run `npm run build:streamlit` before launching Streamlit.")
    st.stop()

bundle_html = bundle_path.read_text(encoding="utf-8")
bundle_hash = hashlib.sha256(bundle_html.encode("utf-8")).hexdigest()[:10]
deploy_marker = "motion-polish-2026-07-03-cc3386d"
app_version = f"cibc-campusgo-v2-{deploy_marker}-{bundle_hash}"

st.markdown(
    """
    <style>
      .block-container { padding: 0; max-width: none; }
      header[data-testid="stHeader"] { display: none; }
      div[data-testid="stToolbar"] { display: none; }
      iframe { display: block; }
    </style>
    """,
    unsafe_allow_html=True,
)

components.html(f"<!-- {app_version} -->\n{bundle_html}", height=1200, scrolling=True)
