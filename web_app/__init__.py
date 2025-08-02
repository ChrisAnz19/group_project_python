from flask import Flask, render_template, request

import app.main

app = Flask(__name__)

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
    print(dict(request.form)) # like a dictionary with a key of "user_choice"
    # Get the user's choice from the form data
    user_resume = request.form.get('resume')
    resume_recommendation = "Your resume needs improvement in the following areas: formatting, clarity, and keyword optimization."
    return render_template("result.html",
        resume_recommendation=resume_recommendation
    )

if __name__ == '__main__':
    app.run(debug=True)