from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components


st.set_page_config(
    page_title="CIBC CampusGo",
    layout="wide",
    initial_sidebar_state="collapsed",
)

bundle_path = Path(__file__).parent / "streamlit_build" / "financial_coach.html"
app_version = "cibc-campusgo-v2-2026-07-02"

if not bundle_path.exists():
    st.error("CIBC CampusGo bundle is missing. Run `npm run build:streamlit` before launching Streamlit.")
    st.stop()

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

components.html(f"<!-- {app_version} -->\n{bundle_path.read_text(encoding='utf-8')}", height=1200, scrolling=True)
