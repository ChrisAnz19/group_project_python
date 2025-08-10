from app.main import extract_pdf_text, get_ai_analysis

# Test cases for the main application logic
def test_pdf_extraction():
    assert extract_pdf_text("") == ""
    assert extract_pdf_text("test/test.pdf") != ""

# Test cases for AI analysis
def test_ai_analysis():
    assert get_ai_analysis("Test prompt") != ""
