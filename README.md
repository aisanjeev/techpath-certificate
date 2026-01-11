# Certificate Generator

A professional certificate generator web app for **Techpath Research and Development PVT.** Built with React and html2canvas.

![Certificate Generator Preview](preview.png)

## Features

- ✅ Enter student name
- ✅ Add multiple courses with time periods
- ✅ Preview professional certificate layout
- ✅ Download certificate as PNG or JPG
- ✅ Sample data for quick testing
- ✅ Elegant gold and navy blue design

## Available Courses

- ADCA
- Digital Marketing
- Data Analysis

## Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+ (recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## Adding Your Logo

Replace the `public/logo.png` file with your organization's logo. The recommended dimensions are:

- **Size**: 200x200 pixels
- **Format**: PNG with transparent background
- **Note**: If `logo.png` is not found, the app will fallback to `logo.svg`

## Sample Test Data

The app includes two sample students for testing:

### Bharti Kumari
- ADCA: 12/06/2024 – 31/12/2024
- Digital Marketing: 01/01/2025 – till now

### Priya Chauhan
- ADCA: 03/04/2024 – 31/12/2024
- Digital Marketing: 01/01/2025 – till now

Click the "Load" buttons in the app to quickly populate test data.

## Technical Details

- **Framework**: React (Vite)
- **Image Export**: html2canvas
- **Styling**: Inline styles with explicit HEX/RGBA colors
- **Fonts**: Crimson Text, Playfair Display (Google Fonts)

### TechPath Brand Color Scheme

| Element | Color | Name |
|---------|-------|------|
| Primary Green | `#2DD4A4` | Teal/Turquoise |
| Primary Blue | `#00BFE7` | Cyan/Aqua |
| Dark Accent | `#1A9B7F` | Dark Teal |
| Light Accent | `#E8FAF5` | Light Mint |
| Background | `#0a1628` | Dark Navy |
| Card Background | `#122036` | Navy |
| Certificate BG | `#FFFFFF` | White |

## Important Notes

⚠️ **No OKLCH colors are used** - All colors are explicit HEX or RGBA to ensure compatibility with html2canvas.

## License

MIT License
# techpath-certificate
