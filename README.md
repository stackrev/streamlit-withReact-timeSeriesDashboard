# Installation and Build

Create conda env: `conda create --name ts python=3.9`

go to frontend and run `yarn build` this will create a dist folder which will be accessed by the streamlit.

go to streamlit, install all requirements `conda install --file requirements.txt`
run the streamlit: `streamlit run app.py`