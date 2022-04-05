import pandas as pd

import streamlit as st
import streamlit.components.v1 as components

_app = components.declare_component(
    "app", path="../frontend/build",
)


def load_component(data, key=None):
    return _app(data=data, default=[], key=key)


raw_data = {
    "First Name": ["Jason", "Molly", "Tina", "Jake", "Amy"],
    "Last Name": ["Miller", "Jacobson", "Ali", "Milner", "Smith"],
    "Age": [42, 52, 36, 24, 73],
}
df = pd.DataFrame(raw_data, columns=["First Name", "Last Name", "Age"])

app = load_component(df)
st.write(app)
