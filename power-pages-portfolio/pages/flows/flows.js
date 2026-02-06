// Flows Gallery - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeSearch();
    initializeMobileMenu();
});

// Flow Details Data
const flowDetails = {
    'email-triage': {
        icon: '📧',
        title: 'Smart Email Triage',
        description: 'AI-powered email classification and routing automation',
        fullDescription: `
            <h4>Overview</h4>
            <p>This automated flow monitors incoming emails and uses AI Builder to classify them into categories like Urgent, Sales, Support, and General. Based on the classification, it automatically routes emails to appropriate teams and creates corresponding records in Dataverse.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>AI-powered email classification using custom model</li>
                <li>Automatic lead creation for sales inquiries</li>
                <li>Case creation for support requests</li>
                <li>Auto-reply generation for acknowledgments</li>
                <li>Teams channel notifications for urgent items</li>
            </ul>
            
            <h4>Business Impact</h4>
            <ul>
                <li>Reduces email processing time by 80%</li>
                <li>Improves response time for urgent emails</li>
                <li>Eliminates manual email routing</li>
                <li>Provides centralized tracking in Dataverse</li>
            </ul>
            
            <h4>Technical Details</h4>
            <ul>
                <li><strong>Trigger:</strong> When a new email arrives (Office 365)</li>
                <li><strong>Actions:</strong> 15+ actions per flow run</li>
                <li><strong>Complexity:</strong> High - Advanced expressions and AI</li>
                <li><strong>Error Handling:</strong> Try-catch scopes with logging</li>
            </ul>
        `,
        complexity: 'High',
        connectors: ['Office 365', 'Teams', 'Dataverse', 'AI Builder'],
        runs: '~1,500/month',
        category: 'Email Automation'
    },
    'document-approval': {
        icon: '📋',
        title: 'Multi-Level Document Approval',
        description: 'Enterprise document approval workflow with parallel processing',
        fullDescription: `
            <h4>Overview</h4>
            <p>A comprehensive document approval workflow that handles various document types (policies, contracts, reports) with appropriate approval chains. Supports parallel approvals, sequential stages, and comprehensive audit trails.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>Document type-based routing</li>
                <li>Parallel and sequential approval stages</li>
                <li>Automatic reminders and escalations</li>
                <li>Complete audit trail in SharePoint</li>
                <li>Email and Teams notifications</li>
            </ul>
            
            <h4>Business Impact</h4>
            <ul>
                <li>Reduces approval cycle time by 60%</li>
                <li>Eliminates lost or forgotten approvals</li>
                <li>Provides compliance documentation</li>
                <li>Improves stakeholder visibility</li>
            </ul>
        `,
        complexity: 'High',
        connectors: ['SharePoint', 'Teams', 'Office 365', 'Approvals'],
        runs: '~500/month',
        category: 'Approval Workflows'
    },
    'data-sync': {
        icon: '🔄',
        title: 'Scheduled Data Sync & Health Check',
        description: 'Automated data synchronization with health monitoring',
        fullDescription: `
            <h4>Overview</h4>
            <p>A scheduled flow that synchronizes data between Dataverse and external systems (SQL Server, Azure Blob) while performing health checks on all connected systems. Includes comprehensive error handling and logging.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>Multi-system data synchronization</li>
                <li>Real-time health monitoring</li>
                <li>Automatic error logging to Dataverse</li>
                <li>Teams alerts for failures</li>
                <li>Detailed sync reports</li>
            </ul>
        `,
        complexity: 'High',
        connectors: ['Dataverse', 'SQL Server', 'Azure Blob', 'Teams'],
        runs: '~180/month',
        category: 'Data Management'
    },
    'teams-notification': {
        icon: '💬',
        title: 'Adaptive Card Notification System',
        description: 'Rich Teams notifications with adaptive cards',
        fullDescription: `
            <h4>Overview</h4>
            <p>An instant flow that sends rich notifications to Teams channels using adaptive cards. Supports multiple card types including alerts, approvals, reminders, updates, and announcements.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>5 different card templates</li>
                <li>Action buttons with callback</li>
                <li>Priority-based formatting</li>
                <li>Email backup for high-priority items</li>
                <li>Logging to Dataverse</li>
            </ul>
        `,
        complexity: 'Medium',
        connectors: ['Teams', 'Office 365', 'Dataverse'],
        runs: 'On Demand',
        category: 'Notifications'
    },
    'excel-processor': {
        icon: '📊',
        title: 'Excel Data Processor RPA',
        description: 'Automated Excel data processing and validation',
        fullDescription: `
            <h4>Overview</h4>
            <p>A Power Automate Desktop flow that processes Excel files, validates data, applies formatting, and generates summary reports. Includes error handling with screenshot capture.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>Data validation and error highlighting</li>
                <li>Auto-formatting of cells and ranges</li>
                <li>Summary report generation</li>
                <li>Error logging with screenshots</li>
                <li>Email notification on completion</li>
            </ul>
        `,
        complexity: 'Medium',
        connectors: ['Excel', 'File System', 'Email'],
        runs: '~100/month',
        category: 'RPA'
    },
    'pdf-extractor': {
        icon: '📄',
        title: 'PDF Data Extractor',
        description: 'Automated PDF data extraction using OCR',
        fullDescription: `
            <h4>Overview</h4>
            <p>A desktop flow that extracts structured data from PDF documents (invoices, forms) using OCR and regex patterns. Validates extracted data and logs results.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>OCR text extraction</li>
                <li>Regex pattern matching</li>
                <li>Data validation</li>
                <li>Error handling with screenshots</li>
                <li>Excel export</li>
            </ul>
        `,
        complexity: 'Medium',
        connectors: ['PDF Reader', 'Excel', 'File System'],
        runs: '~200/month',
        category: 'RPA'
    },
    'on-demand-toolkit': {
        icon: '🛠️',
        title: 'On-Demand Automation Toolkit',
        description: 'Suite of instant automation flows',
        fullDescription: `
            <h4>Overview</h4>
            <p>A collection of instant flows triggered by buttons for common automation tasks including email digests, data sync, report generation, and team notifications.</p>
            
            <h4>Available Actions</h4>
            <ul>
                <li>Send Email Digest</li>
                <li>Sync Data</li>
                <li>Generate Report</li>
                <li>Notify Team</li>
            </ul>
        `,
        complexity: 'Medium',
        connectors: ['Office 365', 'Teams', 'SharePoint', 'Dataverse'],
        runs: 'On Demand',
        category: 'Automation Toolkit'
    },
    'leave-approval': {
        icon: '🏖️',
        title: 'Leave Request Approval',
        description: 'Employee leave request workflow',
        fullDescription: `
            <h4>Overview</h4>
            <p>A complete leave request approval workflow with manager and HR approval stages, leave balance checking, and calendar synchronization.</p>
            
            <h4>Key Features</h4>
            <ul>
                <li>2-level approval (Manager + HR)</li>
                <li>Leave balance validation</li>
                <li>Calendar sync</li>
                <li>Email notifications</li>
            </ul>
        `,
        complexity: 'Medium',
        connectors: ['SharePoint', 'Office 365', 'Approvals', 'Calendar'],
        runs: '~300/month',
        category: 'HR Automation'
    }
};

// Initialize Filters
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter cards
            const filter = btn.dataset.filter;
            filterFlows(filter);
        });
    });
}

// Initialize Search
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        searchFlows(query);
    });
}

// Filter Flows by Category
function filterFlows(category) {
    const cards = document.querySelectorAll('.flow-card');
    
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Search Flows
function searchFlows(query) {
    const cards = document.querySelectorAll('.flow-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// View Flow Details
function viewFlowDetails(flowId) {
    const flow = flowDetails[flowId];
    if (!flow) return;
    
    const modal = document.getElementById('flowModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalIcon.textContent = flow.icon;
    modalTitle.textContent = flow.title;
    modalBody.innerHTML = flow.fullDescription;
    
    modal.classList.add('active');
}

// Run Demo
function runDemo(flowId) {
    const flow = flowDetails[flowId];
    alert(`🚀 Starting demo for: ${flow.title}\n\nIn a production environment, this would trigger the actual flow.`);
}

// Close Modal
function closeModal() {
    document.getElementById('flowModal').classList.remove('active');
}

// Run Flow from Modal
function runFlowFromModal() {
    const title = document.getElementById('modalTitle').textContent;
    alert(`🚀 Running flow: ${title}`);
    closeModal();
}

// Initialize Mobile Menu
function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('flowModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
