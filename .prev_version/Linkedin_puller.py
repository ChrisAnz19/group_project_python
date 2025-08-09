from dotenv import load_dotenv
import os
import json 
import requests

def get_linkedin_profile(link_id):
    # Load environment variables from .env file
    load_dotenv()

    # Get the API key from the environment
    api_key = os.getenv("SCRAPINGDOG_API_KEY")

    url = "https://api.scrapingdog.com/linkedin"

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
        return(json.dumps(data, indent=2))
    else:
        return(f"Request failed with status code: {response.status_code}")
