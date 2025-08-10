import json
import os
import pymupdf
from openai import OpenAI

def extract_pdf_text(file_path):
    """Extract text from PDF file using PyMuPDF."""
    doc = pymupdf.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text

def get_ai_analysis(prompt):
    """Get AI analysis using OpenAI API."""
    try:
        # Try to load API key from secrets.json
        secrets_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'secrets.json')
        api_key = None
        # Check if secrets.json exists and read it
        if os.path.exists(secrets_path):
            try:
                with open(secrets_path, 'r') as f:
                    content = f.read().strip()
                    if content:
                        secrets = json.loads(content)
                        api_key = secrets.get('OPENAI_API_KEY') or secrets.get('openai_api_key') or secrets.get('api_key')
                    else:
                        print("Warning: secrets.json is empty")
            except json.JSONDecodeError as e:
                print(f"Warning: Invalid JSON in secrets.json: {e}")
            except Exception as e:
                print(f"Warning: Error reading secrets.json: {e}")
        
        # Fallback to environment variable
        if not api_key:
            api_key = os.getenv("OPENAI_API_KEY")
            
        if not api_key:
            return """OpenAI API key not configured. Please add it to secrets.json in this format:
                    {
                    "OPENAI_API_KEY": "sk-your-api-key-here"
                    }
                    Or set the OPENAI_API_KEY environment variable."""
        
        # Initialize OpenAI client
        client = OpenAI(api_key=api_key)
        # Make the API call
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        # Return the AI's response
        return response.choices[0].message.content
    except Exception as e:
        return f"Error with OpenAI API: {str(e)}"


if __name__ == "__main__":
    file_path = 'test/test.pdf'  # Replace with your PDF file path
    pdf_text = extract_pdf_text(file_path)
    print(pdf_text)

    prompt = "Provide recommendations for the following resume, break the recommendations into sections for Education, Experience, and Skills: " + pdf_text
    print(get_ai_analysis(prompt))
