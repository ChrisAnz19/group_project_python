import requests
import json

# Set up API key and base URL
api_key = "6871f45caa454efe99c697cf"
url = "https://api.scrapingdog.com/linkedin"


# Ask the user for the linkId
# Temporary - FE passes variable in PROD
link_id = input("Enter the LinkedIn linkId (e.g. 'john-doe-1234'): ")

# Set up the request parameters
params = {
    "api_key": api_key,
    "type": "profile",
    "linkId": link_id,
    "premium": "true"
}

# Make the GET request
response = requests.get(url, params=params)

# Check the response and print JSON
if response.status_code == 200:
    data = response.json()
    print(json.dumps(data, indent=2))  # pretty print the JSON
else:

    #Temporary - JSON pushes to OpenAI API
    print(f"Request failed with status code: {response.status_code}")