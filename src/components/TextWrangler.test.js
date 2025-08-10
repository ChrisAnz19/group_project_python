// Built with the help of Claude Sonnet 4 AI, this code is designed to test the Results component
// and its utility functions, ensuring they work as expected.
import { formatAnalysis, parseAnalysisIntoSections } from './TextWrangler';

describe('formatAnalysis', () => {
    it('returns empty string for falsy input', () => {
        // Test for empty or null input
        expect(formatAnalysis('')).toBe('');
        expect(formatAnalysis(null)).toBe('');
        expect(formatAnalysis(undefined)).toBe('');
    });

    it('removes markdown headers', () => {
        // Test for different header levels
        expect(formatAnalysis('# Header\nText')).toBe('Header\nText');
        expect(formatAnalysis('### Header3\nText')).toBe('Header3\nText');
    });

    it('removes markdown bold and italic', () => {
        // Test for bold and italic markdown
        expect(formatAnalysis('**bold**')).toBe('bold');
        expect(formatAnalysis('__bold__')).toBe('bold');
        expect(formatAnalysis('*italic*')).toBe('italic');
        expect(formatAnalysis('_italic_')).toBe('italic');
    });

    it('cleans up multiple newlines', () => {
        // Test for multiple newlines
        expect(formatAnalysis('Line1\n\n\nLine2')).toBe('Line1\n\nLine2');
    });

    it('removes multiple dashes and underscores', () => {
        // Test for dashes and underscores
        expect(formatAnalysis('Text---Text___Text')).toBe('TextTextText');
    });

    it('trims leading and trailing whitespace', () => {
        // Test for leading and trailing whitespace
        expect(formatAnalysis('   Text   ')).toBe('Text');
    });
});

describe('parseAnalysisIntoSections', () => {
    const sectionPatterns = [
        /Introduction:/,
        /Analysis:/,
        /Conclusion:/
    ];
    const sectionTitles = ['Introduction', 'Analysis', 'Conclusion'];
    const defaultTitle = 'Full Analysis';

    it('returns single section if no patterns found', () => {
        // Test for text without any section patterns
        const text = 'No sections here. Just text.';
        const result = parseAnalysisIntoSections(text, sectionPatterns, defaultTitle, sectionTitles);
        expect(result).toEqual([
            { title: defaultTitle, content: formatAnalysis(text) }
        ]);
    });

    it('splits text into sections based on patterns', () => {
        // Test for text with defined sections
        const text = `
Introduction:
This is the intro.

Analysis:
This is the analysis.

Conclusion:
This is the conclusion.
        `;
        const result = parseAnalysisIntoSections(text, sectionPatterns, defaultTitle, sectionTitles);
        expect(result).toEqual([
            { title: 'Introduction', content: 'This is the intro.' },
            { title: 'Analysis', content: 'This is the analysis.' },
            { title: 'Conclusion', content: 'This is the conclusion.' }
        ]);
    });

    it('removes empty and duplicate sections', () => {
        // Test for text with empty sections or duplicates
        const text = `
Introduction:
This is the intro.

Analysis:
Analysis:

Conclusion:
Conclusion:
        `;
        const result = parseAnalysisIntoSections(text, sectionPatterns, defaultTitle, sectionTitles);
        expect(result.length).toBeLessThanOrEqual(sectionTitles.length);
        expect(result.every(s => s.content.length > 0)).toBe(true);
    });

    it('returns single section if parsed sections are too short', () => {
        // Test for text with very short sections
        const text = `
Introduction:
Hi

Analysis:
Ok

Conclusion:
Bye
        `;
        const result = parseAnalysisIntoSections(text, sectionPatterns, defaultTitle, sectionTitles);
        expect(result).toEqual([
            { title: defaultTitle, content: formatAnalysis(text) }
        ]);
    });

    it('handles markdown inside sections', () => {
        // Test for text with markdown inside sections
        const text = `
Introduction:
# Welcome
**Bold** intro.

Analysis:
*Italic* analysis.

Conclusion:
__Bold__ conclusion.
        `;
        const result = parseAnalysisIntoSections(text, sectionPatterns, defaultTitle, sectionTitles);
        expect(result).toEqual([
            { title: 'Introduction', content: 'Welcome\nBold intro.' },
            { title: 'Analysis', content: 'Italic analysis.' },
            { title: 'Conclusion', content: 'Bold conclusion.' }
        ]);
    });
});