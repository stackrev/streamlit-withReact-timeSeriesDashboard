import pandas as pd

import streamlit as st
import streamlit.components.v1 as components
import json


f = open('aapl-c.json')
APPL_TS = json.load(f)

_app = components.declare_component(
    "app", path="../frontend/build",
)


def load_component():
    return _app(data=APPL_TS, title="APPL")


app = load_component()
st.write(app)
