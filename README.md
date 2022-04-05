# Installation and Execution

Create conda env: `conda create --name ts python=3.9`

go to frontend and run `npm run build` this will create a *build* folder which will be accessed by the streamlit.

go to streamlit, install all requirements `conda install --file requirements.txt`

run the streamlit: `streamlit run app.py`

# Integration of Streamlit and React

In react we import the library: `streamlit-component-lib`

The component to be shared in streamlit is defined as follows (note the streamlit constructs):

```tsx
class App extends StreamlitComponentBase<State> {
  public state = { data: APPL_TS };

  public render = (): ReactNode => {
    return (
      <div>
        
      </div>
    );
  };
}
export default withStreamlitConnection(App);
```

In streamlit we import it as follows:

```python
import streamlit as st
import streamlit.components.v1 as components

_ts_component = components.declare_component(
    "ts_component", path="../frontend/build",
)
```

This allows us to built the UI seperately from the python code.

## Passing data across.