import requests
import json
import os
#from dotenv import load_dotenv
import pymupdf
from openai import OpenAI

def get_pdf_text(file_path):
    """
<<<<<<< Updated upstream
    Extract text from a PDF file.
    :param file_path: Path to the PDF file.
    :return: Extracted text as a string.
    """
    doc = pymupdf.open(file_path)  # Open the PDF document
=======
    if file_path == "":
        raise Exception("File path cannot be empty")
   
    doc = pymupdf.open(file_path)
>>>>>>> Stashed changes
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

if __name__ == "__main__":
    
    file_path = 'uploads/test.pdf'  # Replace with your PDF file path
    pdf_text = get_pdf_text(file_path)
    print(pdf_text)

    prompt = "Provide recommendations for the following resume, break the recommendations into sections for Education, Experience, and Skills: " + pdf_text
    print(openai_response(prompt))

    #link_id = input("Enter the LinkedIn linkId (e.g. 'john-doe-1234'): ")
    #get_linkedin_profile(link_id)
