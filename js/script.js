let observations = localStorage.getItem('observations') ? JSON.parse(localStorage.getItem('observations')) : [];
let reports = localStorage.getItem('reports') ? JSON.parse(localStorage.getItem('reports')) : [];
let localBodiesData = []; // To store data from Localbodies.csv
let categoriesData = []; // To store data from categories.csv

const reportTemplate = `Preliminary Observation Sheet and Inspection Report
Audit of Office of the <Unit Name>
Audit Period: From <Start Year> to <End Year>
Date: <Date>

Audit Team Members: <Audit Party Members>
Name, Designation
,
,
,
,

Supervised By:
Name, Designation
,
,

PART-I - Introduction
Introduction
{Choose the relevant introduction or combine as appropriate}

* **For PRIs:**
    * The Panchayati Raj Institutions (PRIs) were established as per the Panchayati Raj Act, 1993, granting them constitutional status as ‘Local Self Government’ under the 73rd Constitutional Amendment Act, 1992. This empowers them to promote economic development and social justice in rural areas. PRIs receive funding from both State and Central Governments and have the authority to levy taxes and fees to generate their own revenue. The Panchayat is responsible for using these funds for the socio-economic development of the villagers as per government guidelines.

* **For ULBs:**
    * Municipal Bodies were accorded constitutional status as 'Local Government' through the 74th Constitutional Amendment Act of 1992. Article 243W of the Constitution of India mandates that the State Government may, by law, endow Municipalities with necessary powers and authority to function as institutions of self-government. In Sikkim, there are seven Urban Local Bodies (ULBs) - five Nagar Panchayats, one Municipal Council, and one Municipal Corporation, governed under the Sikkim Municipalities Act, 2007.

Finances
{Choose the relevant finance section or combine as appropriate}

* **For PRIs:**
    * The Grants-in-aid is the principal source of revenue of Panchayat. The State Government also releases administrative grants to the Panchayat to compensate for their revenue expenditure. Grants and assistance released by the State Government are utilised for developmental activities as specified in the respective schemes or projects and also defraying establishment cost of Panchayat.
    * The broad source of receipts of Panchayat for the period audited is given below:
        * Scheme-Wise Financial Position
            * | Sl. No. | Financial Year | Scheme | Opening Balance | Receipt | Interest | Total Receipt | Expenditure | Closing Balance |
            * | --- | --- | --- | --- | --- | --- | --- | --- | --- |
            * | 1 |  |  |  |  |  |  |  |  |
            * | 2 |  |  |  |  |  |  |  |  |
    * Source: Information provided by Panchayat and verified with relevant records.

* **For ULBs:**
    * The primary sources of tax revenue for Urban Local Bodies include Trade License and Sanitation charges, while non-tax revenue comes from Car Parking and Bazar Contracts. The State Government also provides administrative grants to cover revenue expenditures. These funds, along with other grants, are utilized for various developmental activities as outlined in respective schemes or projects.
    * Broad Source of Receipts of the Municipality for the Audit Period:
        * | Year | Scheme | Opening Balance | Receipt + Interest | Total | Expenditure | Closing Balance |
        * | --- | --- | --- | --- | --- | --- | --- |
        * |  |  |  |  |  |  |  |
        * |  |  |  |  |  |  |  |
        * |  |  |  |  |  |  |  |
    * Statement Showing the Position of Own Revenue Received by the Municipality During Audit Period:
        * | Year | Own Sources | Total Tax Receipt | Non-Tax Receipt | Solid Waste Management | Trade License | Car Parking | Bazar Contract | Misc. |
        * | --- | --- | --- | --- | --- | --- | --- | --- | --- |
        * |  |  |  |  |  |  |  |  |  |

    * Source: Information provided by the Municipality and verified by Audit.

Organizational Set-up
{Choose the relevant organizational setup or combine.}

* **For PRIs:**
    * According to Section 23 of the Sikkim Panchayat Act, 1993, the Sabhapati/Adhayaksha, elected by a majority of Panchayat Members, is the executive head of the Panchayat. The Sabhapati/Adhayaksha presides over Panchayat meetings and is responsible for governance, with executive powers exercised by the Sachiva, assisted by the office bearers.
    * Key Officials During Audit Period:
        * Sabhapati/Adhayaksha: <Name>
        * Up-Sabhapati/Up-Adhyaksha: <Name>
        * Sachiva: <Name>

* **For ULBs:**
    * As per Sections 20 & 23 of the Sikkim Municipalities Act, 2007, the President, elected by a majority of the Board of Councillors (BOC), is the executive head of the ULB. The President presides over Municipality meetings and is responsible for governance. The executive power of ULB is exercised by the Municipal Executive Officer. The Municipality, created under the Sikkim Municipalities Act, 2007, is divided into Wards, with Councillors elected from each ward who then elect the President from among themselves.
    * Key Officials During Audit Period:
        * Municipal Executive Officer/Head of the Office: <Name>
        * Drawing and Disbursing Officer (DDO): <Name>

Scope of Audit
{Combine the scope of audit}

* The audit covered the utilization of:
    * Central Finance Commission Grants
    * State Finance Commission Grants
    * Grants-in-Aid
    * Developmental funds
    * Other funds from Central/State Government
    * Own Source Revenue funds
    * The audit scope included reviewing the utilization of Central and State Finance Commission grants and income from the Municipality’s own revenue for the audited period. The audit examined records related to Bazar Contract, Car Parking Contract, Pay & Use Toilet Contract, Renewal of Trade License, and Solid Waste Management.

Audit Criteria
{Combine the audit criteria}

* The audit evaluated <Unit Name> based on:
    * Guidelines from the Central Finance Commission.
    * Guidelines from the State Finance Commission.
    * Notifications and Circulars from the Government of India and Government of Sikkim.
    * Sikkim Financial Rules, Sikkim Public Works Code and Manual.
    * Monitoring mechanisms by the State and Central Government.
    * Model code of accounting by the State Government.
    * Manuals, Guidelines or SOPs by the State and Central Government.

Audit Objective
{Include if relevant, otherwise remove}
* The compliance audit aimed to assess:
    * Efficiency and economy in expenditure from Government and Own Revenue Funds for various works and expenditures.
    * Effectiveness in implementing various schemes/projects.
    * Achievement of project objectives and benefits to the public.
    * Existence and effectiveness of internal control and monitoring systems in the Department.

Audit Mandate, Period, and Audit Party
Under Section 22 of The Sikkim Local Fund Audit Act, 2012, and recommendations from the Eleventh Finance Commission and Ministry of Finance guidelines, the State government entrusted the audit of Rural and Urban Local Bodies to the Directorate of Local Fund Audit, Sikkim. A test audit of <Unit Name> for the year <Year> was conducted by officers from the Local Fund Audit, Sikkim.

Audit Party:
<Audit Party Members>

The audit results are detailed in the following sections.

PART-II - Audit Observations
<Observations>

PART-III - Acknowledgment
Acknowledgment: The audit team appreciates the support and cooperation of the Elected representatives, officers, and all other staff in completing the audit in a timely manner.
`;


function loadLocalBodies() {
    fetch('./data/Localbodies.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split('\n').slice(1); // Skip header
            const unitNameSelect = document.getElementById('unitName');
            lines.forEach(line => {
                const [name, , , , ] = line.split(','); // Extract only the name
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                unitNameSelect.appendChild(option);
            });

            // Parse the CSV data and store it in the localBodiesData array
            localBodiesData = lines.map(line => {
                const [name, address, district, category, head] = line.split(',');
                return { name, address, district, category, head };
            });
        })
        .catch(error => console.error('Error loading local bodies:', error));
}


function loadCategories() {
    fetch('data/categories.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split('\n').slice(1); // Remove header row
            const categorySelect = document.getElementById('category');
            lines.forEach(line => {
                const [number, categoryName] = line.split(',');
                const option = document.createElement('option');
                option.value = categoryName;
                option.textContent = categoryName;
                categorySelect.appendChild(option);
            });
             categoriesData = lines.map(line => {
                const [number, categoryName] = line.split(',');
                return { number, categoryName };
            });
        })
        .catch(error => console.error('Error loading categories:', error));
}

function saveObservation() {
    const unitName = document.getElementById('unitName').value;
    const auditYear = document.getElementById('auditYear').value;
    const observationDate = document.getElementById('observationDate').value;
    const category = document.getElementById('category').value;
    const observationTitle = document.getElementById('observationTitle').value;
    const amount = document.getElementById('amount').value;
    const observationBody = document.getElementById('observationBody').value;

    const newObservation = {
        unitName,
        auditYear,
        observationDate,
        category,
        observationTitle,
        amount,
        observationBody
    };

    observations.push(newObservation);
    localStorage.setItem('observations', JSON.stringify(observations));
    loadObservations(); // Reload the sidebar list
    populateCategoryFilter(); // Update category filter
    document.getElementById('observationForm').reset();
    document.getElementById('observationDate').value = new Date().toISOString().slice(0, 10);
}

function loadObservations() {
    const observationListDiv = document.getElementById('observationList');
    observationListDiv.innerHTML = '';
    observations.forEach((obs, index) => {
        const item = document.createElement('div');
        item.classList.add('observation-item');
        item.dataset.body = obs.observationBody;
        item.textContent = `${obs.category}: ${obs.observationTitle}`;
        observationListDiv.appendChild(item);
    });
}

function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(observations.map(obs => obs.category))];
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

function filterObservations() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const observationListDiv = document.getElementById('observationList');
    observationListDiv.innerHTML = '';
    const filteredObservations = selectedCategory
        ? observations.filter(obs => obs.category === selectedCategory)
        : observations;

    filteredObservations.forEach((obs, index) => {
        const item = document.createElement('div');
        item.classList.add('observation-item');
        item.dataset.body = obs.observationBody;
        item.textContent = `${obs.category}: ${obs.observationTitle}`;
        observationListDiv.appendChild(item);
    });
}



function generateReport() {
    if (observations.length === 0) {
        alert('No observations recorded yet.');
        return;
    }

    const unitName = document.getElementById('unitName').value;
    const auditYear = document.getElementById('auditYear').value;
    const reportDate = new Date().toISOString().slice(0, 10);
    const reportTitle = `${reportDate}-${unitName}-${auditYear}`;

    // Get additional unit information from localBodiesData
    const unitData = localBodiesData.find(unit => unit.name === unitName);
    const unitAddress = unitData ? unitData.address : 'N/A';
    const unitDistrict = unitData ? unitData.district : 'N/A';
    const unitCategory = unitData ? unitData.category : 'N/A';
    const unitHead = unitData ? unitData.head : 'N/A';

    let reportContent = reportTemplate
        .replace('<Unit Name>', unitName)
        .replace('<Start Year>', auditYear)
        .replace('<End Year>', auditYear)
        .replace('<Date>', reportDate)
        .replace('<Audit Party Members>', 'To be added')
        .replace('<Name>', unitHead);

    // Add unit details at the beginning, in plain text
    reportContent = reportContent.replace('PART-I - Introduction',
        `**Unit Name:** ${unitName}
**Address:** ${unitAddress}
**District:** ${unitDistrict}
**Category:** ${unitCategory}
**Head of Office:** ${unitHead}

PART-I - Introduction`);

    let observationsHTML = '';
    observations.forEach((obs, index) => {
        observationsHTML += `<h3>Observation ${index + 1}</h3>
<p><strong>Category:</strong> ${obs.category}</p>
<p><strong>Title:</strong> ${obs.observationTitle}</p>
${obs.amount ? `<p><strong>Amount:</strong> ${obs.amount}</p>` : ''}
<p><strong>Body:</strong><br>${obs.observationBody}</p><br>`;  // basic HTML formatting
    });
    reportContent = reportContent.replace('<Observations>', observationsHTML);

    const reportData = {
        title: reportTitle,
        date: reportDate,
        unit: unitName,
        year: auditYear,
        observations: [...observations]
    };

    reports.push(reportData);
    localStorage.setItem('reports', JSON.stringify(reports));
    alert('Report generated and saved!');
    loadReports();
}



function loadReports() {
    const reportsListDiv = document.getElementById('reportsList');
    reportsListDiv.innerHTML = '';
    reports.forEach(report => {
        const listItem = document.createElement('li');
        listItem.classList.add('report-item');
        listItem.innerHTML = `
            <span>${report.title} (${report.observations.length} observations)</span>
            <div class="report-actions">
                <button onclick="viewReport('${report.title}')">View</button>
                <button onclick="editReport('${report.title}')">Edit</button>
                <button onclick="downloadReport('${report.title}', '${convertToPlainText(report)}')">Download TXT</button>
                <button onclick="downloadReportAsJSON('${report.title}', ${JSON.stringify(report)})">Download JSON</button>
            </div>
        `;
        reportsListDiv.appendChild(listItem);
    });
}


function viewReport(reportTitle) {
    const report = reports.find(r => r.title === reportTitle);
    if (report) {
        const reportContent = convertToPlainText(report);
        const reportDisplayArea = document.getElementById('reportDisplayArea');
        const reportContentDiv = document.getElementById('reportContent');
        reportContentDiv.innerHTML = reportContent;
        reportDisplayArea.style.display = 'block';
        reportDisplayArea.scrollIntoView({ behavior: 'smooth' });
    } else {
        alert('Report not found!');
    }
}

function convertToPlainText(report) {
    const unitData = localBodiesData.find(unit => unit.name === report.unit);
    const unitAddress = unitData ? unitData.address : 'N/A';
    const unitDistrict = unitData ? unitData.district : 'N/A';
    const unitCategory = unitData ? unitData.category : 'N/A';
    const unitHead = unitData ? unitData.head : 'N/A';

    let reportText = `Preliminary Observation Sheet and Inspection Report
Audit of Office of the ${report.unit}
Audit Period: From ${report.year} to ${report.year}
Date: ${report.date}

Audit Team Members: To be added

Supervised By:

PART-I - Introduction

Unit Name: ${report.unit}
Address: ${unitAddress}
District: ${unitDistrict}
Category: ${unitCategory}
Head of Office: ${unitHead}

Introduction
{Choose the relevant introduction or combine as appropriate}

Finances
{Choose the relevant finance section or combine as appropriate}

Organizational Set-up
{Choose the relevant organizational setup or combine.}

Scope of Audit
{Combine the scope of audit}

Audit Criteria
{Combine the audit criteria}

Audit Objective
{Include if relevant, otherwise remove}

Audit Mandate, Period, and Audit Party
Under Section 22 of The Sikkim Local Fund Audit Act, 2012, and recommendations from the Eleventh Finance Commission and Ministry of Finance guidelines, the State government entrusted the audit of Rural and Urban Local Bodies to the Directorate of Local Fund Audit, Sikkim. A test audit of  for the year  was conducted by officers from the Local Fund Audit, Sikkim.

Audit Party:
To be added

The audit results are detailed in the following sections.

PART-II - Audit Observations\n\n`;  // changed heading

    report.observations.forEach((obs, index) => {
        reportText += `Observation ${index + 1}
Category: ${obs.category}
Title: ${obs.observationTitle}
${obs.amount ? `Amount: ${obs.amount}` : ''}
Body:
${obs.observationBody}

`;
    });

    reportText += `\nPART-III - Acknowledgment
Acknowledgment: The audit team appreciates the support and cooperation of the Elected representatives, officers, and all other staff in completing the audit in a timely manner.`;

    return reportText;
}


function downloadReport(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));  // changed to text/plain
    element.setAttribute('download', filename + '.txt');  // changed extension
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function downloadReportAsJSON(filename, data) {
    const element = document.createElement('a');
    const json = JSON.stringify(data, null, 2);
    element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(json));
    element.setAttribute('download', filename + '.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function editReport(reportTitle) {
    const reportToEdit = reports.find(report => report.title === reportTitle);
    if (reportToEdit) {
        // Populate the form with the report data
        document.getElementById('unitName').value = reportToEdit.unit;
        document.getElementById('auditYear').value = reportToEdit.year;
        document.getElementById('observationDate').value = reportToEdit.date;

        // Clear existing observations
        observations = [];
        localStorage.setItem('observations', JSON.stringify(observations));

        // Add observations from the report to be edited
        reportToEdit.observations.forEach(obs => {
            observations.push(obs);
        });
        localStorage.setItem('observations', JSON.stringify(observations));
        loadObservations();
        populateCategoryFilter();
        // Remove the report from the list
        reports = reports.filter(report => report.title !== reportTitle);
        localStorage.setItem('reports', JSON.stringify(reports));
        loadReports(); // Update the reports list

        // Change focus to the form.
        window.location.href = 'index.html'; // Go to the index page to edit
    } else {
        alert('Report not found for editing.');
    }
}


function loadAndDisplayDatabase() {
    const databaseView = document.getElementById('databaseView');
    databaseView.innerHTML = ''; // Clear previous content

    if (localBodiesData.length === 0 && observations.length === 0) { //check if both are empty
        databaseView.textContent = 'No data available.';
        return;
    }
    //add observations to the database
    const allData = [...localBodiesData, ...observations];

    const categoryGroups = {};

    allData.forEach(item => {
        if (!categoryGroups[item.category]) {
            categoryGroups[item.category] = [];
        }
        categoryGroups[item.category].push(item);
    });

    for (const category in categoryGroups) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category-group');
        categoryDiv.innerHTML = `<h3>${category}</h3>`;

        categoryGroups[category].forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('database-item');
             if(item.name){ // differentiate between local body and observation
                itemDiv.innerHTML = `<p><strong>Name:</strong> ${item.name}, <strong>Address:</strong> ${item.address}, <strong>District:</strong> ${item.district},  <strong>Head:</strong> ${item.head}</p>`;
             }
             else{
                 itemDiv.innerHTML = `<p><strong>Unit Name:</strong> ${item.unitName}, <strong>Audit Year:</strong> ${item.auditYear}, <strong>Observation Date:</strong> ${item.observationDate}, <strong>Observation Title:</strong> ${item.observationTitle}, <strong>Amount:</strong> ${item.amount}, <strong>Observation Body:</strong> ${item.observationBody}</p>`;
             }
            categoryDiv.appendChild(itemDiv);
        });

        databaseView.appendChild(categoryDiv);
    }
}
