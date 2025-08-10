# Resume Analyzer Pro

A modern, AI-powered resume analysis application built with React frontend and Flask backend. Get intelligent insights and recommendations to optimize your resume for better job opportunities.

## Features

- **AI-Powered Analysis**: Uses OpenAI GPT-4 for intelligent resume analysis
- **PDF Processing**: Advanced PDF text extraction using PyMuPDF
- **Modern UI**: Beautiful React frontend with Tailwind CSS and Framer Motion
- **Drag & Drop**: Easy file upload with drag and drop functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Feedback**: Get instant analysis and recommendations
- **LinkedIn Integration**: Pull LinkedIn profiles (coming soon)

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Dropzone** - File upload with drag and drop
- **Lucide React** - Beautiful icons

### Backend
- **Flask** - Python web framework
- **OpenAI GPT-4** - AI-powered analysis
- **PyMuPDF** - PDF text extraction
- **Python-dotenv** - Environment variable management

## Installation

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd group_project_python-1
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

5. **Run the Flask backend**
   ```bash
   cd web_app
   python __init__.py
   FLASK_APP=web_app FLASK_RUN_PORT=5001 flask run --host=localhost   
   ```
   The backend will run on `http://localhost:5001`

### Frontend Setup

1. **Install Node.js dependencies**
   ```bash
   npm install
   ```

2. **Start the React development server**
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

## Usage

1. **Open the application** in your browser at `http://localhost:3000`

2. **Choose your input method**:
   - **Upload PDF**: Drag and drop or click to upload a PDF resume
   - **Paste Text**: Copy and paste your resume text directly

3. **Get analysis**: The AI will analyze your resume and provide recommendations for:
   - Education section
   - Experience section
   - Skills section
   - General formatting and optimization

4. **Review results**: View detailed feedback and actionable recommendations

## Tests

Run the tests:

```sh
# find all the tests and run them:
pytest
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI API Key for GPT-4 analysis
OPENAI_API_KEY=sk-your-openai-api-key

# Flask configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### API Endpoints

The Flask backend provides the following endpoints:

- `POST /result` - Analyze resume text
- `POST /result_pdf` - Analyze uploaded PDF file
- `GET /` - Home page
- `GET /about` - About page

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `tailwind.config.js` for theme customization
2. Updating `src/index.css` for custom styles
3. Changing component styles in individual React components
   

## Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Deploy the Flask app 

2. Update the proxy configuration in `package.json` to point to your deployed backend URL

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

