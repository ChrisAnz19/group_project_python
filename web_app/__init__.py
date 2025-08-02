from flask import Flask, render_template, request

import app.main
import os 

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads' # Define an upload folder

@app.route('/')
def home():
    return render_template("home.html")

@app.route('/about')
def about():
    return render_template("about.html")

@app.route('/result', methods=['POST'])
def result():
    # this is the data the user sent in a POST request when they
    # submitted the form
    # Get the user's choice from the form data
    user_resume = request.form.get('resume')
    resume_recommendation = f"{user_resume} Your resume needs improvement in the following areas: formatting, clarity, and keyword optimization."
    return render_template("result.html",
        resume_recommendation=resume_recommendation
    )

@app.route('/result_pdf', methods=['POST'])
def result_pdf():
    # this is the data the user sent in a POST request when they
    # submitted the form
    # Get the user's choice from the form data
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True) # Create upload folder if it doesn't exist

    file = request.files['pdf_file']
    if file and file.filename.endswith('.pdf'): # Basic validation
        # Save the uploaded PDF file
        # Save the file to a designated upload folder
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        resume_recommendation = f"Your resume needs improvement in the following areas: formatting, clarity, and keyword optimization."
        return render_template("result_pdf.html",
            resume_upload_message=f'PDF file "{file.filename}" uploaded successfully!',
            resume_recommendation=resume_recommendation
        )
    else:
        return render_template("result_pdf.html",
            resume_upload_message=f'Invalid file type. Only PDF files are allowed.',
            resume_recommendation=resume_recommendation
        )
    
if __name__ == '__main__':
    app.run(debug=True)