from app.main import extract_pdf_text, get_ai_analysis
from flask import Flask, request, jsonify
from flask_cors import CORS
import os


# Initialize Flask app
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Ensure the upload folder exists
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

@app.route('/trending_jobs', methods=['GET'])
def get_trending_jobs():
    """Get trending jobs analysis."""
    try:
        analysis_prompt = (
            "Provide the top 10 fastest-growing jobs in the USA. For each job, give me Rank, Job Title, Median Salary, and Description, with each section clearly labeled exactly like that."
        )
        recommendation = get_ai_analysis(analysis_prompt)
        
        return jsonify({
            'recommendation': recommendation
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)