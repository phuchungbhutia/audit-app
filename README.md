# Audit Report Generator for Local Governing Bodies

## Overview

This web application is designed to streamline the process of generating audit reports for local governing bodies, specifically Panchayats and Municipalities. It allows users to input audit observations, generate reports in multiple formats, store and manage these reports, and display a database of entered information.

## Features

* **Data Input:**
  * Form-based input for audit observations.
  * Fields include: Unit Name, Audit Year, Observation Date, Category, Observation Title, Amount, and Observation Body.
  * Unit Name and Category are populated from CSV files.
  * Observation date defaults to the current date.
* **Data Storage:**
  * Uses browser's `localStorage` for data persistence.
  * Stores both raw observations and generated reports.
* **Report Generation:**
  * Generates reports based on user-entered observations.
  * Report structure includes:
    * Basic report metadata.
    * Unit details (fetched from `Localbodies.csv`).
    * Audit observations.
    * Standardized introduction, finance, organizational setup, scope of audit, audit criteria, audit objective, audit mandate, period, and audit party sections.
    * Acknowledgment section.
  * Reports can be generated in two formats:
    * Plain Text (.txt)
    * JSON (.json)
* **Report Management:**
  * Lists generated reports with title and number of observations.
  * Actions for each report:
    * View: Display report in a user-friendly format.
    * Edit: Load report data back into the input form.
    * Download: Download report as .txt or .json.
* **Data Display:**
  * "Database" view showing:
    * Contents of `Localbodies.csv`.
    * Entered audit observations, grouped by category.
* **Data Files:**
  * Uses CSV files for data:
    * `Localbodies.csv`: Local government unit information.
    * `categories.csv`: Observation categories.
* **User Interface:**
  * Clean, user-friendly interface.
  * Separate HTML pages for:
    * Input Form (`index.html`)
    * Reports List (`report.html`)
    * Database View (`database.html`)
  * Common navigation menu.
* **Technical:**
  * HTML, CSS, and JavaScript.
  * `localStorage` for data persistence.

## How to Use

1. **Home (index.html):** Use the form to input audit observations.  Select the Unit Name and Category from the dropdowns.  Enter the Audit Year, Observation Date, Title, Amount (optional), and detailed Observation Body.  Click "Generate Report" to create a report.
2. **Reports (report.html):** View a list of generated reports.  For each report, you can:
   * Click "View" to see the report content.
   * Click "Edit" to modify the report data in the input form.
   * Click "Download TXT" to download the report as a plain text file.
   * Click "Download JSON" to download the report as a JSON file.
3. **Database (database.html):** View the data used by the application, including the contents of `Localbodies.csv` and the entered audit observations, grouped by category.

## Data Files

The application uses the following CSV files, located in the `data/` directory:

* **Localbodies.csv:**
  * Contains information about local government units.
  * Fields: Name, Address, District, Category, Head.
* **categories.csv:**
  * Contains a list of observation categories.
  * Fields: Number, Category Name

## Technical Details

* **Programming Languages:** HTML, CSS, JavaScript
* **Data Storage:** localStorage
* **CSV Data Loading:** Data is loaded from CSV files using the Fetch API.

## Assumptions

* The CSV files (`Localbodies.csv` and `categories.csv`) are located in the `data/` directory relative to the HTML files.
* The application is run in a browser environment that supports `localStorage` and the Fetch API.

## Future Enhancements

* Client-side data validation for the input form.
* Category filter for the observations list.
* More robust error handling.
* Improved report formatting.
* User authentication.
