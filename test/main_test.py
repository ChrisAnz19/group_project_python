from app.main import extract_pdf_text, get_ai_analysis

def test_pdf_extraction():
    assert extract_pdf_text("") == ""
    assert extract_pdf_text("test/test.pdf") != ""

def test_ai_analysis():
    assert get_ai_analysis("Test prompt") != ""
