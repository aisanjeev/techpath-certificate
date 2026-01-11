# TechPath Certificate Generator

**Version:** 1.0.0  
**Last Updated:** January 11, 2026

A professional certificate generation application for Techpath Research and Development PVT. Built with React and Vite, featuring Microsoft SSO authentication and text-based PDF generation.

---

## Features

### 🔐 Authentication
- **Microsoft SSO Login** - Secure Single Sign-On with Microsoft Azure AD/Entra ID
- **User Authorization** - Configurable allowed users list via environment variables
- **Local Session Management** - Logout without affecting other Microsoft sessions

### 📜 Certificate Types
1. **Course Completion Certificate**
   - Multiple courses support
   - Custom date ranges for each course
   - Sample data presets for quick testing

2. **Internship Certificate**
   - Department/Domain specification
   - Duration tracking
   - Optional project description

3. **Experience Certificate**
   - Designation and department
   - Employment tenure
   - Key responsibilities section

### 🎨 Design Themes
- **Classic Gold** - Elegant traditional design with gold accents
- **Modern Teal** - Fresh contemporary look with TechPath brand colors

### 📥 Export Options
- **PNG** - High-quality image export (via html2canvas)
- **JPG** - Compressed image export
- **PDF** - Text-based PDF with selectable text and dynamic height (via jsPDF)

### 📄 PDF Features
- **Selectable Text** - All text is searchable and copyable
- **Dynamic Height** - Adjusts based on content (courses, responsibilities, etc.)
- **Dancing Script Font** - Elegant cursive signature matching HTML preview
- **Professional Footer** - Verification seal, signature box, and contact information
- **Company Logo** - Embedded logo image

---

## Tech Stack

- **Frontend:** React 19, Vite 7
- **Authentication:** @azure/msal-browser, @azure/msal-react
- **PDF Generation:** jsPDF
- **Image Export:** html2canvas
- **Styling:** Inline CSS with TechPath brand colors

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd techpath-certificate

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your Azure credentials

# Start development server
npm run dev
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
# Microsoft Azure AD / Entra ID Configuration
VITE_AZURE_CLIENT_ID=your-client-id-here
VITE_AZURE_TENANT_ID=your-tenant-id-here
VITE_REDIRECT_URI=http://localhost:5173

# Allowed Users (comma-separated emails)
VITE_ALLOWED_USERS=sanjeev@techpath.biz
```

---

## Azure Portal Setup

1. Go to [Azure Portal](https://portal.azure.com) → **Microsoft Entra ID**
2. Navigate to **App registrations** → **New registration**
3. Set **Redirect URI** to your app URL (type: SPA)
4. Copy **Application (client) ID** → `VITE_AZURE_CLIENT_ID`
5. Copy **Directory (tenant) ID** → `VITE_AZURE_TENANT_ID`
6. Under **Authentication**, enable "Access tokens" and "ID tokens"

---

## Project Structure

```
techpath-certificate/
├── public/
│   ├── single-p.png              # TechPath logo
│   ├── DancingScript-Regular.ttf # Signature font
│   └── DancingScript-Regular.woff
├── src/
│   ├── App.jsx                   # Main app with authentication
│   ├── authConfig.js             # MSAL configuration
│   ├── CertificateGenerator.jsx  # Certificate UI and PDF generation
│   ├── main.jsx                  # Entry point with MsalProvider
│   └── index.css                 # Global styles
├── .env                          # Environment variables (not committed)
├── .env.example                  # Environment template
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

---

## Certificate Preview

The certificate includes:
- Company logo and name
- Certificate title (based on type)
- Recipient name with decorative underline
- Description text
- Course/employment details
- Issue date and authorized signature
- Verification seal
- Contact information footer

---

## Security Notes

- `.env` file is gitignored - never commit credentials
- Only authorized users (configured via `VITE_ALLOWED_USERS`) can access the app
- Local logout clears session without affecting Microsoft account globally

---

## Contact

**Techpath Research and Development PVT.**
- 📧 Email: sanjeev@techpath.biz
- 📞 Phone: +91 8299708052
- 🌐 Website: www.techpath.biz
- 📍 Address: Circus Road, Mughalsarai, Chandauli, India - 232101

---

## License

This project is proprietary software for Techpath Research and Development PVT.

---

*Built with ❤️ by TechPath*
