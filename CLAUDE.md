# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains tools for translating and working with Akoma Ntoso legal documents in Traditional Chinese. The project focuses on converting Taiwanese legal judgments and laws into the Akoma Ntoso XML format, which is an international standard for legal document markup.

## Key Components

### Ruby Scripts (Main Generation Tools)
- `generate_judgement_akn.rb` - Main script for converting Taiwanese court judgments to Akoma Ntoso format
  - Scrapes judgment data from Taiwan's judicial database
  - Parses court metadata, case details, and content
  - Generates structured XML in Akoma Ntoso format
  - Usage: `ruby generate_judgement_akn.rb [JUDGMENT_URL]`

- `generate_reference.rb` - Generates legal reference elements for Akoma Ntoso documents
  - Creates TLCReference elements for legal citations
  - Handles articles, paragraphs, and sub-paragraphs
  - Usage: `ruby generate_reference.rb [REFERENCE_FILE]`

- `translate_number.rb` - Contains Chinese numeral conversion functions
  - Converts Traditional Chinese numbers to Arabic numerals
  - Handles complex number formats (十五, 一千万, etc.)

### Web Reader Application
- `reader/` directory contains a JavaScript-based web application
- `reader/reader.js` - Main parser for reading and displaying Akoma Ntoso documents
- `reader/index.html` - Web interface for viewing converted documents
- Uses xml-js and axios libraries for XML processing and HTTP requests

### Data Files
- `courts.json` - Comprehensive mapping of Taiwan court codes to court names and divisions
- `akn/` directory - Contains converted Akoma Ntoso documents (.akn files)
- Sample documents include civil judgments, criminal cases, and legal codes

## Development Commands

### Ruby Environment
```bash
# Run the main judgment converter
ruby generate_judgement_akn.rb "http://djirs.judicial.gov.tw/fjud/[JUDGMENT_URL]"

# Generate legal references
ruby generate_reference.rb reference.txt
```

### Web Reader
```bash
# Navigate to reader directory
cd reader

# Install dependencies
npm install

# No build script defined - files are used directly
# Serve index.html with a local server for testing
```

## Architecture Notes

### Court System Structure
The codebase handles Taiwan's complex court system:
- Supreme courts (TPS, TPA, etc.)
- High courts (TPH, TCH, etc.) 
- District courts (TPD, SLD, etc.)
- Simple courts (TPE, STE, etc.)
- Special courts (IPC for IP cases, etc.)

### Document Structure
Akoma Ntoso documents follow FRBR (Functional Requirements for Bibliographic Records):
- **Work level**: Abstract concept of the legal document
- **Expression level**: Language/version specific representation  
- **Manifestation level**: Physical/digital format

### Key Parsing Logic
- Judgment metadata extraction from Taiwan judicial database
- Chinese text parsing with regex patterns for legal sections
- Court code mapping to full court names
- Judge name extraction from signature sections
- Legal citation reference generation

## File Naming Conventions
- Generated .akn files use format: `[COURT_CODE]-[DIVISION]-[CASE_NUMBER].akn`
- Example: `TPH-刑事-102-上重更(九)-5-3.akn`

## Dependencies
- Ruby: mechanize, nokogiri, json (for web scraping and XML processing)
- JavaScript: xml-js, axios (for XML parsing and HTTP requests)