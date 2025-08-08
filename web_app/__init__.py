from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import pymupdf
from openai import OpenAI

# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'

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
        
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error with OpenAI API: {str(e)}"

@app.route('/')
def home():
    """Health check endpoint."""
    return jsonify({"message": "Resume Analyzer API is running!"})

@app.route('/analyze', methods=['POST'])
def analyze_text_resume():
    """Analyze resume from text input."""
    try:
        data = request.get_json()
        resume_text = data.get('resume_text', '')
        
        if not resume_text.strip():
            return jsonify({'error': 'No resume text provided'}), 400
        
        analysis_prompt = (
            "Provide recommendations for the following resume, "
            "break the recommendations into sections for Education, Experience, and Skills: "
            + resume_text
        )
        recommendation = get_ai_analysis(analysis_prompt)
        
        return jsonify({
            'recommendation': recommendation,
            'success': True
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/analyze_pdf', methods=['POST'])
def analyze_pdf_resume():
    """Analyze resume from uploaded PDF file."""
    try:
        # Ensure upload directory exists
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

        # Validate file upload
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
            
        uploaded_file = request.files['file']
        if not uploaded_file or not uploaded_file.filename.endswith('.pdf'):
            return jsonify({'error': 'Invalid file type. Only PDF files are allowed.'}), 400
            
        # Process the PDF file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], uploaded_file.filename)
        uploaded_file.save(file_path)
        
        try:
            # Extract text and analyze
            pdf_text = extract_pdf_text(file_path)
            analysis_prompt = (
                "Provide recommendations for the following resume, "
                "break the recommendations into sections for Education, Experience, and Skills: "
                + pdf_text
            )
            recommendation = get_ai_analysis(analysis_prompt)
            
            return jsonify({
                'recommendation': recommendation,
                'message': f'PDF file "{uploaded_file.filename}" processed successfully!',
                'success': True
            })
        finally:
            # Clean up uploaded file
            if os.path.exists(file_path):
                os.remove(file_path)
                
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True, port=5001)