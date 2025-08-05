from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import app.main
import os 

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend
app.config['UPLOAD_FOLDER'] = 'uploads' # Define an upload folder

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/result', methods=['POST'])
def result():
    try:
        # Get the user's choice from the form data
        user_resume = request.form.get('resume')
        
        if not user_resume:
            return jsonify({'error': 'No resume text provided'}), 400
        
        # Use the AI analysis from main.py
        prompt = "Provide recommendations for the following resume, break the recommendations into sections for Education, Experience, and Skills: " + user_resume
        resume_recommendation = app.main.openai_response(prompt)
        
        return jsonify({
            'resume_recommendation': resume_recommendation,
            'success': True
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/result_pdf', methods=['POST'])
def result_pdf():
    try:
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True) # Create upload folder if it doesn't exist

        file = request.files['pdf_file']
        if file and file.filename.endswith('.pdf'): # Basic validation
            # Save the uploaded PDF file
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            
            # Extract text from PDF and analyze
            pdf_text = app.main.get_pdf_text(filename)
            prompt = "Provide recommendations for the following resume, break the recommendations into sections for Education, Experience, and Skills: " + pdf_text
            resume_recommendation = app.main.openai_response(prompt)
            
            return jsonify({
                'resume_recommendation': resume_recommendation,
                'resume_upload_message': f'PDF file "{file.filename}" uploaded successfully!',
                'success': True
            })
        else:
            return jsonify({
                'error': 'Invalid file type. Only PDF files are allowed.',
                'success': False
            }), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)