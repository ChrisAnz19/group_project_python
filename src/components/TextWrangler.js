  // Format the analysis text to remove markdown and improve readability
  export function formatAnalysis(text) {
    if (!text) return '';
    
    return text
      // Remove markdown headers (### ## #)
      .replace(/^#{1,6}\s*/gm, '')
      // Remove markdown bold (**text** or __text__)
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      // Remove markdown italic (*text* or _text_)
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/_(.*?)_/g, '$1')
      // Clean up multiple newlines
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      // Clean up multiple dashes and underscores
      .replace(/[-_]{1,}/g, '')
      // Remove leading/trailing whitespace
      .trim();
  }
  
  // Parse the analysis text into clean, organized sections
  export function parseAnalysisIntoSections(text, sectionPatterns, title, sectionTitles) {
    const formatted = formatAnalysis(text);

    // Check if we have clear section indicators
    let hasClearSections = false;
    sectionPatterns.forEach(pattern => {
      if (pattern.test(formatted)) {
        hasClearSections = true;
      }
    });

    // If no clear sections found, return everything as one section
    if (!hasClearSections) {
      return [{
        title: title,
        content: formatted
      }];
    }

    let sections = [];
    let workingText = formatted;

    // Split by each pattern
    sectionPatterns.forEach((pattern, index) => {
      const parts = workingText.split(pattern);
      if (parts.length > 1) {
        // Found this section - take everything until the next section or end
        let content = parts[1];
        
        // Remove content that belongs to subsequent sections
        for (let j = index + 1; j < sectionPatterns.length; j++) {
          const nextSectionMatch = content.match(sectionPatterns[j]);
          if (nextSectionMatch) {
            content = content.substring(0, nextSectionMatch.index);
            break;
          }
        }
        
        if (content.trim()) {
          sections.push({
            title: sectionTitles[index],
            content: content.trim()
          });
        }
      }
    });

    // Remove duplicates and empty sections
    const uniqueSections = [];
    const seenTitles = new Set();
    
    sections.forEach(section => {
        if (section.content.trim() && !seenTitles.has(section.title)) {
            seenTitles.add(section.title);
            uniqueSections.push(section);
        }
    });

    // If we still don't have good sections after trying to parse, default to single section
    if (uniqueSections.length === 0 || uniqueSections.some(s => s.content.length < 10)) {
      return [{
        title: title,
        content: formatted
      }];
    }

    return uniqueSections;
  }
