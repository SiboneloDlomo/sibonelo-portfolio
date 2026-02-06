# Power Automate Portfolio Website

A user-friendly showcase built with Power Pages to display your Power Automate skills as a Junior Specialist.

## 🚀 Quick Start

### Option 1: Power Pages Builder (No-Code)

1. Go to [https://make.powerpages.microsoft.com](https://make.powerpages.microsoft.com)
2. Click **Create site**
3. Select **Start from blank**
4. Configure:
   - Site name: `Power-Automation-Portfolio`
   - Language: English
   - Security: Public (or authenticated)

### Option 2: Deploy via Power Platform CLI

```powershell
# Install Power Platform CLI
winget install Microsoft.PowerPlatformCLI

# Authenticate
pac auth create --name "Portfolio" --environment <your-env>

# Create website project
pac paportal init --path "./portfolio-site"

# Deploy
pac paportal upload --path "./portfolio-site"
```

---

## 📁 Project Structure

```
power-pages-portfolio/
├── pages/
│   ├── home/
│   │   ├── home.css
│   │   ├── home.js
│   │   └── home.html
│   ├── flows/
│   │   ├── flows.css
│   │   ├── flows.js
│   │   └── flows.html
│   ├── skills/
│   │   ├── skills.css
│   │   ├── skills.js
│   │   └── skills.html
│   ├── contact/
│   │   ├── contact.css
│   │   ├── contact.js
│   │   └── contact.html
│   └── demo/
│       ├── demo.css
│       ├── demo.js
│       └── demo.html
├── snippets/
│   ├── header.html
│   ├── footer.html
│   └── navigation.html
├── theme/
│   ├── theme.css
│   ├── colors.css
│   └── fonts.css
├── webfiles/
│   ├── images/
│   ├── icons/
│   └── documents/
├── table-permissions/
├── site-settings/
└── publish/
```

---

## 🎨 Page Templates

### 1. Home Page (`/home`)

**Features:**
- Hero section with automation tagline
- Quick stats (flows created, hours saved)
- Featured automation cards
- Call-to-action buttons

**Content:**
```html
<!-- Hero Section -->
<div class="hero-section">
    <h1>Junior Power Automation Specialist</h1>
    <p>Automation solutions using Microsoft Power Platform</p>
    <div class="stats-grid">
        <div class="stat-card">
            <h2>8+</h2>
            <p>Automations Built</p>
        </div>
        <div class="stat-card">
            <h2>100+</h2>
            <p>Hours Saved</p>
        </div>
        <div class="stat-card">
            <h2>5+</h2>
            <p>Systems Integrated</p>
        </div>
    </div>
</div>
```

### 2. Flows Gallery (`/flows`)

**Features:**
- Filterable grid of automation flows
- Categories: Email, Approval, Data, RPA, Notifications
- Search functionality
- Click to view details

**Data Structure:**
```json
{
  "flows": [
    {
      "id": "email-triage",
      "title": "Smart Email Triage",
      "category": "Email Automation",
      "description": "AI-powered email classification and routing",
      "connectors": ["Office 365", "Teams", "Dataverse", "AI Builder"],
      "complexity": "High",
      "thumbnail": "/webfiles/images/email-triage.png"
    },
    {
      "id": "document-approval",
      "title": "Multi-Level Document Approval",
      "category": "Approval Workflows",
      "description": "Enterprise document approval with parallel stages",
      "connectors": ["SharePoint", "Teams", "Office 365", "Approvals"],
      "complexity": "High",
      "thumbnail": "/webfiles/images/approval.png"
    }
  ]
}
```

### 3. Skills Matrix (`/skills`)

**Features:**
- Interactive skills chart
- Certification badges
- Experience timeline
- Technology stack

**Visual:**
```
Power Automate        ████████░░░ Junior
Microsoft 365          ███████░░░░ Junior
Dataverse              ██████░░░░░ Junior
RPA (Desktop Flows)   █████░░░░░░ Junior
Azure Integration      ███░░░░░░░░ Learning
```

### 4. Demo Section (`/demo`)

**Features:**
- Live flow status indicators
- Run history charts
- Integration overview diagram
- System health dashboard

### 5. Contact (`/contact`)

**Features:**
- Contact form (creates Dataverse record)
- LinkedIn profile link
- Email link
- Calendar booking (Calendly integration)

---

## 🛠️ Configuration

### Web.config Settings

```xml
<appSettings>
    <add key="AnalyticsTrackingId" value="UA-XXXXX-Y" />
    <add key="DefaultPageSize" value="10" />
    <add key="EnableSearch" value="true" />
    <add key="CacheEnabled" value="true" />
</appSettings>
```

### Table Permissions

| Table | Access | Role |
|-------|--------|------|
| FlowShowcase | Read | Anonymous |
| SkillsMatrix | Read | Anonymous |
| ContactRequests | Write | Anonymous |
| DemoRequests | Write | Authenticated Users |

---

## 🎯 CSS Theme

### colors.css
```css
:root {
    --primary-color: #0078d4;
    --secondary-color: #106ebe;
    --accent-color: #00b294;
    --background-color: #f3f2f1;
    --surface-color: #ffffff;
    --text-primary: #323130;
    --text-secondary: #605e5c;
    --success-color: #107c10;
    --warning-color: #ffb900;
    --error-color: #d13438;
}
```

### Responsive Design
```css
/* Desktop */
@media (min-width: 1024px) {
    .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Tablet */
@media (min-width: 768px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Mobile */
@media (max-width: 767px) {
    .grid { grid-template-columns: 1fr; }
}
```

---

## 📊 JavaScript Functionality

### flows.js
```javascript
// Filter flows by category
function filterFlows(category) {
    const cards = document.querySelectorAll('.flow-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search flows
function searchFlows(query) {
    const cards = document.querySelectorAll('.flow-card');
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
```

---

## 🔗 Integration with Power Automate

### Connect Demo Page to Flows

```javascript
// Trigger a flow from the website
async function runFlow(flowId) {
    const response = await fetch(`/api/runflow/${flowId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const result = await response.json();
    showNotification(result.message);
}
```

### Display Live Flow Status

```javascript
// Fetch flow status from Dataverse
async function getFlowStatus() {
    const response = await fetch('/api/flowstatus');
    const status = await response.json();
    updateDashboard(status);
}
```

---

## 🚀 Deployment Steps

### 1. Create Power Pages Site
```powershell
# Create site
pac paportal init --path "./portfolio-site" --name "PowerAutomationPortfolio"
```

### 2. Configure Pages
1. Import page HTML templates
2. Upload CSS/JS files to webfiles
3. Configure page permissions
4. Set up navigation

### 3. Enable External Access
1. Go to **Settings** → **Site visibility**
2. Select **Public** or **Authenticated**
3. Configure authentication provider

### 4. Get Your URL
After deployment, you'll get:
- **Production URL**: `https://your-portfolio.powerpages.com`
- **Design URL**: `https://make.powerpages.microsoft.com/sites/your-site`

---

## 📱 Access via IP Address

For internal testing without custom domain:

### Option 1: Azure Static Web App (Free)
```bash
# Deploy as static web app
az staticwebapp create \
    --name "portfolio-$RANDOM" \
    --resource-group "portfolio-rg" \
    --source "./build" \
    --branch "main" \
    --location "southafricanorth"
```

### Option 2: IIS Hosting
1. Build the static files
2. Deploy to IIS server
3. Access via: `http://YOUR-SERVER-IP/portfolio`

---

## 📈 SEO & Analytics

### Google Analytics
```html
<!-- Add to head of each page -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🏆 Showcase Features

### Live Demo Dashboard
```
┌─────────────────────────────────────────────────┐
│  📊 Automation Portfolio Dashboard              │
├─────────────────────────────────────────────────┤
│  Active Flows: 8                                │
│  Runs Today: 50                                │
│  Success Rate: 95%                              │
│  Avg Runtime: 3.5s                              │
├─────────────────────────────────────────────────┤
│  📈 Flow Performance                            │
│  ┌──────────────────────────────────────────┐   │
│  │ ████████████████████░░░ 95%              │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Visitor Statistics
- Total visitors
- Most viewed flows
- Geographic distribution
- Device types

---

## 📞 Support

**Questions?** Contact:
- Email: [your-email@domain.com]
- LinkedIn: [Your LinkedIn Profile]

---

**Created by**: Sibonelo Dlomo  
**Portfolio URL**: `https://your-portfolio.powerpages.com`
