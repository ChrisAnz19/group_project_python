# Resume Helper

## Setup 
Create and activate a virtual environment:
'''sh
conda create -n Resume-Helper-env python=3.11

conda activate Resume-Helper-env
'''

Install packages:
'''sh
pip install -r requirements.txt
'''

## Usage
### Command-line App
'''sh
# only works if this file does NOT import from other local py files:
python app/main.py

# if this file imports from other local py files:
python -m app/main.py
'''

### Web App

 Run the web app:

 ```sh
 FLASK_APP=web_app flask run
 ```

 Visit in the browser, either:

   + http://127.0.0.1:5000
   + http://localhost:5000/

## Tests

Run the tests:
'''sh
# find all the tests and run them:
pytest
''