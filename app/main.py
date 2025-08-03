import requests
import json
import os
from dotenv import load_dotenv
import pymupdf
from openai import OpenAI

def get_pdf_text(file_path):
    """
    Extract text from a PDF file.
    :param file_path: Path to the PDF file.
    :return: Extracted text as a string.
    """
    doc = pymupdf.open(file_path)  # Open the PDF document
    text = ""
    for page in doc:
        text += page.get_text()  # Extract text from each page
    doc.close()
    return text

def openai_response(prompt):
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    client = OpenAI(api_key=OPENAI_API_KEY)
    CHAT_MODEL_ID = "gpt-4o-mini"
    chat_completion = client.chat.completions.create(
        model=CHAT_MODEL_ID,
        messages=[{"role": "user", "content": prompt}]
        )
    return chat_completion.choices[0].message.content

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
    
    file_path = 'uploads/test.pdf'  # Replace with your PDF file path
    pdf_text = get_pdf_text(file_path)
    print(pdf_text)

    prompt = f"""
    You are a professional career coach and recruiter. Review the following resume and provide a structured critique that includes:

    1. **Overall Impression** – What kind of candidate does this resume reflect?
    2. **Strengths** – What parts stand out positively?
    3. **Areas for Improvement** – Where can the resume be clearer or stronger?
    4. **Tone and Language** – Is the resume concise, action-oriented, and professional?
    5. **Formatting Tips** – Any visual/layout suggestions?

    Return your feedback in a friendly, blog-style tone—like you're writing a helpful article for job seekers. Be honest but supportive.

    Resume:
    \"\"\"
    {pdf_text}
    \"\"\"
    """

    #link_id = input("Enter the LinkedIn linkId (e.g. 'john-doe-1234'): ")
    #get_linkedin_profile(link_id)
