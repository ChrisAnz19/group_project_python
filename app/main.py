import requests
import json
import os
from dotenv import load_dotenv

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

if __name__ == "__main__":
    # Ask the user for the linkId
    link_id = input("Enter the LinkedIn linkId (e.g. 'john-doe-1234'): ")
    get_linkedin_profile(link_id)