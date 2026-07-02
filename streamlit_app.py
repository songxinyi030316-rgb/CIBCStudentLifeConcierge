from pathlib import Path

import streamlit as st
import streamlit.components.v1 as components


st.set_page_config(
    page_title="CIBC Student Life Helper",
    layout="wide",
    initial_sidebar_state="collapsed",
)

bundle_path = Path(__file__).parent / "streamlit_build" / "financial_coach.html"

if not bundle_path.exists():
    st.error("CIBC Student Life Helper bundle is missing. Run `npm run build:streamlit` before launching Streamlit.")
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

components.html(bundle_path.read_text(encoding="utf-8"), height=1200, scrolling=True)
