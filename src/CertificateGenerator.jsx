import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const CertificateGenerator = () => {
  const certificateRef = useRef(null);
  
  // Sample data for testing
  const sampleStudents = [
    {
      name: 'Bharti Kumari',
      courses: [
        { name: 'ADCA', startDate: '12/06/2024', endDate: '31/12/2024' },
        { name: 'Digital Marketing', startDate: '01/01/2025', endDate: 'till now' }
      ]
    },
    {
      name: 'Priya Chauhan',
      courses: [
        { name: 'ADCA', startDate: '03/04/2024', endDate: '31/12/2024' },
        { name: 'Digital Marketing', startDate: '01/01/2025', endDate: 'till now' }
      ]
    }
  ];

  const availableCourses = ['ADCA', 'Digital Marketing', 'Data Analysis'];

  const [studentName, setStudentName] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });
  const [showPreview, setShowPreview] = useState(false);

  // TechPath Brand Colors
  const colors = {
    primaryGreen: '#2DD4A4',
    primaryBlue: '#00BFE7',
    darkAccent: '#1A9B7F',
    lightAccent: '#E8FAF5',
    white: '#FFFFFF',
    darkBg: '#0a1628',
    cardBg: '#122036',
    textLight: '#f0f9f6',
    textMuted: '#8fb8aa',
    border: '#1e3a4a'
  };

  const addCourse = () => {
    if (newCourse.name && newCourse.startDate && newCourse.endDate) {
      setCourses([...courses, { ...newCourse }]);
      setNewCourse({
        name: '',
        startDate: '',
        endDate: ''
      });
    }
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const loadSampleData = (index) => {
    const sample = sampleStudents[index];
    setStudentName(sample.name);
    setCourses([...sample.courses]);
    setShowPreview(true);
  };

  const generateCertificate = () => {
    if (studentName && courses.length > 0) {
      setShowPreview(true);
    }
  };

  const getFileName = () => {
    if (certificateType === 'course') return studentName;
    if (certificateType === 'internship') return internName;
    if (certificateType === 'experience') return employeeName;
    return 'certificate';
  };

  const downloadCertificate = async (format) => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false
      });

      const fileName = getFileName().replace(/\s+/g, '-');

      if (format === 'pdf') {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`certificate-${fileName}.pdf`);
      } else {
        const link = document.createElement('a');
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        link.download = `certificate-${fileName}.${format}`;
        link.href = canvas.toDataURL(mimeType, format === 'jpg' ? 0.95 : undefined);
        link.click();
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate. Please try again.');
    }
  };

  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const [certificateId, setCertificateId] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [designStyle, setDesignStyle] = useState('classic');
  const [certificateType, setCertificateType] = useState('course');
  
  // Internship fields
  const [internName, setInternName] = useState('');
  const [internDepartment, setInternDepartment] = useState('');
  const [internStartDate, setInternStartDate] = useState('');
  const [internEndDate, setInternEndDate] = useState('');
  const [internProject, setInternProject] = useState('');
  
  // Experience fields
  const [employeeName, setEmployeeName] = useState('');
  const [designation, setDesignation] = useState('');
  const [empDepartment, setEmpDepartment] = useState('');
  const [empStartDate, setEmpStartDate] = useState('');
  const [empEndDate, setEmpEndDate] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  
  const defaultDescription = 'has successfully completed the following course(s) at Techpath Research and Development PVT. demonstrating dedication, commitment, and proficiency in the required skills and knowledge.';
  const defaultInternDescription = 'has successfully completed their internship at Techpath Research and Development PVT. demonstrating excellent skills, dedication, and professional conduct throughout the internship period.';
  const defaultExperienceDescription = 'was employed with Techpath Research and Development PVT. and has demonstrated excellent professional skills, dedication, and commitment during their tenure with us.';

  // Design themes configuration
  const designThemes = {
    classic: {
      name: 'Classic Gold',
      background: 'linear-gradient(135deg, #fffef5 0%, #fef9e7 50%, #fffef5 100%)',
      borderColor: '#c9a227',
      innerBorderColor: '#d4af37',
      accentColor: '#c9a227',
      titleColor: '#1a365d',
      textColor: '#2d3748',
      cornerColor: '#c9a227'
    },
    modern: {
      name: 'Modern Teal',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 50%, #f0fdfa 100%)',
      borderColor: '#2DD4A4',
      innerBorderColor: '#00BFE7',
      accentColor: '#1A9B7F',
      titleColor: '#134e4a',
      textColor: '#1e3a3a',
      cornerColor: '#2DD4A4'
    }
  };

  const currentTheme = designThemes[designStyle];

  // Styles object with TechPath brand colors
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: colors.darkBg,
      padding: '40px 20px',
      fontFamily: '"Crimson Text", Georgia, serif'
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto'
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px'
    },
    title: {
      fontSize: '42px',
      fontWeight: '700',
      color: colors.white,
      marginBottom: '8px',
      letterSpacing: '1px'
    },
    titleAccent: {
      color: colors.primaryGreen
    },
    subtitle: {
      fontSize: '18px',
      color: colors.textMuted,
      fontWeight: '400'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '30px'
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '32px',
      border: `1px solid ${colors.border}`
    },
    cardTitle: {
      fontSize: '22px',
      fontWeight: '600',
      color: colors.textLight,
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    cardIcon: {
      width: '28px',
      height: '28px',
      color: colors.primaryGreen
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: colors.textMuted,
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    input: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '16px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      backgroundColor: colors.darkBg,
      color: colors.textLight,
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '14px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      backgroundColor: colors.darkBg,
      color: colors.textLight,
      outline: 'none',
      transition: 'border-color 0.2s ease',
      boxSizing: 'border-box',
      minHeight: '80px',
      resize: 'vertical',
      fontFamily: 'inherit'
    },
    select: {
      width: '100%',
      padding: '14px 16px',
      fontSize: '16px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      backgroundColor: colors.darkBg,
      color: colors.textLight,
      outline: 'none',
      cursor: 'pointer',
      boxSizing: 'border-box'
    },
    dateRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px'
    },
    addButton: {
      width: '100%',
      padding: '14px',
      fontSize: '16px',
      fontWeight: '600',
      backgroundColor: colors.primaryGreen,
      color: colors.darkBg,
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      marginTop: '16px'
    },
    courseList: {
      marginTop: '24px'
    },
    courseItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 18px',
      backgroundColor: colors.darkBg,
      borderRadius: '10px',
      marginBottom: '10px',
      border: `1px solid ${colors.border}`
    },
    courseInfo: {
      flex: 1
    },
    courseName: {
      fontWeight: '600',
      color: colors.textLight,
      fontSize: '16px'
    },
    coursePeriod: {
      fontSize: '13px',
      color: colors.textMuted,
      marginTop: '4px'
    },
    removeButton: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 14px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    },
    sampleButtons: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      flexWrap: 'wrap'
    },
    sampleButton: {
      flex: 1,
      padding: '12px 16px',
      fontSize: '14px',
      backgroundColor: colors.border,
      color: colors.textLight,
      border: `2px solid ${colors.darkAccent}`,
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: '500',
      minWidth: '140px'
    },
    generateButton: {
      width: '100%',
      padding: '18px',
      fontSize: '18px',
      fontWeight: '700',
      backgroundColor: colors.primaryBlue,
      color: colors.white,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      marginTop: '20px',
      letterSpacing: '0.5px'
    },
    previewSection: {
      marginTop: '40px'
    },
    previewHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '24px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    previewTitle: {
      fontSize: '26px',
      fontWeight: '600',
      color: colors.textLight
    },
    downloadButtons: {
      display: 'flex',
      gap: '12px'
    },
    downloadButton: {
      padding: '12px 28px',
      fontSize: '15px',
      fontWeight: '600',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer'
    },
    pngButton: {
      backgroundColor: colors.primaryGreen,
      color: colors.darkBg
    },
    jpgButton: {
      backgroundColor: colors.primaryBlue,
      color: colors.white
    },
    pdfButton: {
      backgroundColor: '#e53e3e',
      color: colors.white
    },
    certificateWrapper: {
      display: 'flex',
      justifyContent: 'center',
      overflow: 'auto',
      padding: '20px',
      backgroundColor: colors.cardBg,
      borderRadius: '16px'
    },
    // Design themes
    typeSelector: {
      display: 'flex',
      gap: '8px',
      marginBottom: '24px',
      backgroundColor: colors.darkBg,
      padding: '6px',
      borderRadius: '12px'
    },
    typeOption: {
      flex: 1,
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      border: 'none',
      backgroundColor: 'transparent',
      color: colors.textMuted,
      fontSize: '14px',
      fontWeight: '500'
    },
    typeOptionActive: {
      backgroundColor: colors.primaryGreen,
      color: colors.darkBg,
      fontWeight: '600'
    },
    designSelector: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px'
    },
    designOption: {
      flex: 1,
      padding: '16px',
      borderRadius: '12px',
      cursor: 'pointer',
      textAlign: 'center',
      transition: 'all 0.2s ease',
      border: `2px solid ${colors.border}`
    },
    designOptionActive: {
      border: `2px solid ${colors.primaryGreen}`,
      backgroundColor: 'rgba(45, 212, 164, 0.1)'
    },
    designLabel: {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '4px'
    },
    designPreview: {
      width: '100%',
      height: '60px',
      borderRadius: '6px',
      marginBottom: '8px'
    },
    // Certificate styles with TechPath brand colors
    certificate: {
      width: '900px',
      minHeight: '640px',
      padding: '50px',
      backgroundColor: colors.white,
      position: 'relative',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      boxSizing: 'border-box'
    },
    certBorder: {
      position: 'absolute',
      top: '15px',
      left: '15px',
      right: '15px',
      bottom: '15px',
      border: `3px solid ${colors.primaryGreen}`,
      pointerEvents: 'none'
    },
    certInnerBorder: {
      position: 'absolute',
      top: '25px',
      left: '25px',
      right: '25px',
      bottom: '25px',
      border: `1px solid ${colors.primaryBlue}`,
      pointerEvents: 'none'
    },
    certContent: {
      position: 'relative',
      zIndex: 1,
      textAlign: 'center'
    },
    certHeader: {
      marginBottom: '30px'
    },
    certLogo: {
      width: '100px',
      height: '100px',
      objectFit: 'contain',
      marginBottom: '15px'
    },
    certId: {
      position: 'absolute',
      top: '35px',
      right: '45px',
      fontSize: '11px',
      color: '#718096',
      fontFamily: 'monospace',
      letterSpacing: '0.5px'
    },
    certOrgName: {
      fontSize: '26px',
      fontWeight: '700',
      color: colors.darkAccent,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '5px'
    },
    certTitle: {
      fontSize: '42px',
      fontWeight: '700',
      color: '#1a365d',
      fontFamily: '"Playfair Display", Georgia, serif',
      letterSpacing: '4px',
      textTransform: 'uppercase',
      margin: '25px 0',
      textShadow: '1px 1px 2px rgba(26, 54, 93, 0.15)'
    },
    certPresented: {
      fontSize: '16px',
      color: '#4a5568',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      marginBottom: '15px'
    },
    certStudentName: {
      fontSize: '38px',
      fontWeight: '700',
      color: colors.darkAccent,
      fontFamily: '"Playfair Display", Georgia, serif',
      borderBottom: `2px solid ${colors.primaryGreen}`,
      display: 'inline-block',
      paddingBottom: '8px',
      margin: '10px 0 25px'
    },
    certDescription: {
      fontSize: '16px',
      color: '#4a5568',
      lineHeight: '1.8',
      maxWidth: '700px',
      margin: '0 auto 25px'
    },
    certCoursesTitle: {
      fontSize: '14px',
      color: '#718096',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '15px'
    },
    certCoursesList: {
      marginBottom: '30px'
    },
    certCourseItem: {
      padding: '8px 0',
      borderBottom: `1px dashed ${colors.lightAccent}`
    },
    certCourseName: {
      fontSize: '18px',
      fontWeight: '600',
      color: colors.darkAccent
    },
    certCoursePeriod: {
      fontSize: '14px',
      color: '#718096'
    },
    certFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: '40px',
      paddingTop: '20px'
    },
    certFooterItem: {
      textAlign: 'center',
      width: '200px'
    },
    certSignatureName: {
      fontSize: '36px',
      fontWeight: '600',
      color: '#1a365d',
      fontFamily: '"Dancing Script", "Brush Script MT", cursive',
      fontStyle: 'normal',
      marginBottom: '2px',
      letterSpacing: '0px'
    },
    certSignatureTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#1a365d',
      fontFamily: '"Dancing Script", cursive',
      marginBottom: '8px',
      fontStyle: 'italic'
    },
    certSignatureLine: {
      width: '180px',
      borderTop: `2px solid ${colors.darkAccent}`,
      margin: '0 auto 8px'
    },
    certFooterLabel: {
      fontSize: '12px',
      color: '#718096',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    },
    certDate: {
      fontSize: '14px',
      color: '#4a5568',
      marginTop: '8px'
    },
    certContactSection: {
      marginTop: '25px',
      paddingTop: '15px',
      borderTop: '1px solid #e2e8f0',
      textAlign: 'center'
    },
    certContactRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '25px',
      flexWrap: 'wrap',
      marginBottom: '8px'
    },
    certContactItem: {
      fontSize: '11px',
      color: '#718096',
      letterSpacing: '0.3px'
    },
    certContactAddress: {
      fontSize: '11px',
      color: '#718096',
      letterSpacing: '0.3px'
    },
    certDecoration: {
      position: 'absolute',
      width: '60px',
      height: '60px',
      opacity: 0.2
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: colors.textMuted
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '16px',
      opacity: '0.5'
    },
    emptyText: {
      fontSize: '18px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <span style={styles.titleAccent}>Tech</span>Path Certificate Generator
          </h1>
          <p style={styles.subtitle}>Create professional certificates for Techpath Research and Development PVT.</p>
        </div>

        <div style={styles.grid}>
          {/* Input Form Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <svg style={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Certificate Generator
            </h2>

            {/* Certificate Type Selector */}
            <div style={styles.typeSelector}>
              <button
                style={{
                  ...styles.typeOption,
                  ...(certificateType === 'course' ? styles.typeOptionActive : {})
                }}
                onClick={() => setCertificateType('course')}
              >
                🎓 Course
              </button>
              <button
                style={{
                  ...styles.typeOption,
                  ...(certificateType === 'internship' ? styles.typeOptionActive : {})
                }}
                onClick={() => setCertificateType('internship')}
              >
                💼 Internship
              </button>
              <button
                style={{
                  ...styles.typeOption,
                  ...(certificateType === 'experience' ? styles.typeOptionActive : {})
                }}
                onClick={() => setCertificateType('experience')}
              >
                🏢 Experience
              </button>
            </div>

            {/* Sample Data Buttons - Only for Course */}
            {certificateType === 'course' && (
              <div style={styles.sampleButtons}>
                <button
                  style={styles.sampleButton}
                  onClick={() => loadSampleData(0)}
                  onMouseOver={(e) => e.target.style.backgroundColor = colors.darkAccent}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.border}
                >
                  📋 Load Bharti Kumari
                </button>
                <button
                  style={styles.sampleButton}
                  onClick={() => loadSampleData(1)}
                  onMouseOver={(e) => e.target.style.backgroundColor = colors.darkAccent}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.border}
                >
                  📋 Load Priya Chauhan
                </button>
              </div>
            )}

            {/* Common Certificate ID Field */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Certificate ID</label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="Enter certificate ID (e.g., TP-2026-001)"
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                onBlur={(e) => e.target.style.borderColor = colors.border}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Certificate Design</label>
              <div style={styles.designSelector}>
                <div
                  style={{
                    ...styles.designOption,
                    ...(designStyle === 'classic' ? styles.designOptionActive : {})
                  }}
                  onClick={() => setDesignStyle('classic')}
                >
                  <div style={{
                    ...styles.designPreview,
                    background: 'linear-gradient(135deg, #fffef5 0%, #fef9e7 100%)',
                    border: '3px solid #c9a227'
                  }}></div>
                  <div style={{ ...styles.designLabel, color: colors.textLight }}>Classic Gold</div>
                  <div style={{ fontSize: '11px', color: colors.textMuted }}>Elegant & Traditional</div>
                </div>
                <div
                  style={{
                    ...styles.designOption,
                    ...(designStyle === 'modern' ? styles.designOptionActive : {})
                  }}
                  onClick={() => setDesignStyle('modern')}
                >
                  <div style={{
                    ...styles.designPreview,
                    background: 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)',
                    border: '3px solid #2DD4A4'
                  }}></div>
                  <div style={{ ...styles.designLabel, color: colors.textLight }}>Modern Teal</div>
                  <div style={{ fontSize: '11px', color: colors.textMuted }}>Fresh & Contemporary</div>
                </div>
              </div>
            </div>

            {/* ========== COURSE COMPLETION FORM ========== */}
            {certificateType === 'course' && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student name"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Course Name</label>
                  <input
                    type="text"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="Enter course name (e.g., ADCA, Digital Marketing)"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.dateRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Start Date</label>
                    <input
                      type="text"
                      value={newCourse.startDate}
                      onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
                      placeholder="DD/MM/YYYY"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>End Date</label>
                    <input
                      type="text"
                      value={newCourse.endDate}
                      onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
                      placeholder="DD/MM/YYYY or 'till now'"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>

                <button
                  style={styles.addButton}
                  onClick={addCourse}
                  onMouseOver={(e) => e.target.style.backgroundColor = colors.darkAccent}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.primaryGreen}
                >
                  + Add Course
                </button>

                {courses.length > 0 && (
                  <div style={styles.courseList}>
                    <label style={styles.label}>Added Courses ({courses.length})</label>
                    {courses.map((course, index) => (
                      <div key={index} style={styles.courseItem}>
                        <div style={styles.courseInfo}>
                          <div style={styles.courseName}>{course.name}</div>
                          <div style={styles.coursePeriod}>{course.startDate} – {course.endDate}</div>
                        </div>
                        <button
                          style={styles.removeButton}
                          onClick={() => removeCourse(index)}
                          onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                          onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div style={styles.formGroup}>
                  <label style={styles.label}>Custom Description (Optional)</label>
                  <textarea
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Enter custom skills and knowledge text... (Leave empty for default)"
                    style={styles.textarea}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>
              </>
            )}

            {/* ========== INTERNSHIP CERTIFICATE FORM ========== */}
            {certificateType === 'internship' && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Intern Name</label>
                  <input
                    type="text"
                    value={internName}
                    onChange={(e) => setInternName(e.target.value)}
                    placeholder="Enter intern's full name"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Department / Domain</label>
                  <input
                    type="text"
                    value={internDepartment}
                    onChange={(e) => setInternDepartment(e.target.value)}
                    placeholder="e.g., Web Development, Digital Marketing"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.dateRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Start Date</label>
                    <input
                      type="text"
                      value={internStartDate}
                      onChange={(e) => setInternStartDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>End Date</label>
                    <input
                      type="text"
                      value={internEndDate}
                      onChange={(e) => setInternEndDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Project / Work Description (Optional)</label>
                  <textarea
                    value={internProject}
                    onChange={(e) => setInternProject(e.target.value)}
                    placeholder="Describe the project or work done during internship..."
                    style={styles.textarea}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Custom Description (Optional)</label>
                  <textarea
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Enter custom description... (Leave empty for default)"
                    style={styles.textarea}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>
              </>
            )}

            {/* ========== EXPERIENCE CERTIFICATE FORM ========== */}
            {certificateType === 'experience' && (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Employee Name</label>
                  <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Enter employee's full name"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g., Software Developer, Marketing Executive"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Department</label>
                  <input
                    type="text"
                    value={empDepartment}
                    onChange={(e) => setEmpDepartment(e.target.value)}
                    placeholder="e.g., IT, Marketing, Operations"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.dateRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Joining Date</label>
                    <input
                      type="text"
                      value={empStartDate}
                      onChange={(e) => setEmpStartDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Relieving Date</label>
                    <input
                      type="text"
                      value={empEndDate}
                      onChange={(e) => setEmpEndDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Key Responsibilities (Optional)</label>
                  <textarea
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                    placeholder="List key responsibilities and achievements..."
                    style={styles.textarea}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Custom Description (Optional)</label>
                  <textarea
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    placeholder="Enter custom description... (Leave empty for default)"
                    style={styles.textarea}
                    onFocus={(e) => e.target.style.borderColor = colors.primaryGreen}
                    onBlur={(e) => e.target.style.borderColor = colors.border}
                  />
                </div>
              </>
            )}

            {/* Generate Button */}
            <button
              style={{
                ...styles.generateButton,
                opacity: (certificateType === 'course' && studentName && courses.length > 0) ||
                         (certificateType === 'internship' && internName && internDepartment) ||
                         (certificateType === 'experience' && employeeName && designation) ? 1 : 0.5,
                cursor: (certificateType === 'course' && studentName && courses.length > 0) ||
                        (certificateType === 'internship' && internName && internDepartment) ||
                        (certificateType === 'experience' && employeeName && designation) ? 'pointer' : 'not-allowed'
              }}
              onClick={generateCertificate}
              disabled={
                (certificateType === 'course' && (!studentName || courses.length === 0)) ||
                (certificateType === 'internship' && (!internName || !internDepartment)) ||
                (certificateType === 'experience' && (!employeeName || !designation))
              }
              onMouseOver={(e) => {
                if (studentName && courses.length > 0) e.target.style.backgroundColor = '#0099c2';
              }}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.primaryBlue}
            >
              Generate Certificate
            </button>
          </div>

          {/* Instructions Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              <svg style={styles.cardIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Instructions
            </h2>
            <div style={{ color: colors.textMuted, lineHeight: '1.8' }}>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: colors.textLight }}>1. Enter Student Name:</strong><br />
                Type the full name of the student receiving the certificate.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: colors.textLight }}>2. Add Courses:</strong><br />
                Select a course, enter the time period, and click "Add Course". You can add multiple courses.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: colors.textLight }}>3. Generate Certificate:</strong><br />
                Click the generate button to preview your certificate.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: colors.textLight }}>4. Download:</strong><br />
                Download as PNG for high quality or JPG for smaller file size.
              </p>
              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: colors.darkBg,
                borderRadius: '10px',
                border: `1px solid ${colors.border}`
              }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  <span style={{ color: colors.primaryGreen }}>💡 Tip:</span>{' '}
                  Use the sample data buttons to quickly test the certificate generator!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview Section */}
        {showPreview && (
          (certificateType === 'course' && studentName && courses.length > 0) ||
          (certificateType === 'internship' && internName && internDepartment) ||
          (certificateType === 'experience' && employeeName && designation)
        ) && (
          <div style={styles.previewSection}>
            <div style={styles.previewHeader}>
              <h2 style={styles.previewTitle}>Certificate Preview</h2>
              <div style={styles.downloadButtons}>
                <button
                  style={{ ...styles.downloadButton, ...styles.pngButton }}
                  onClick={() => downloadCertificate('png')}
                  onMouseOver={(e) => e.target.style.backgroundColor = colors.darkAccent}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.primaryGreen}
                >
                  📥 PNG
                </button>
                <button
                  style={{ ...styles.downloadButton, ...styles.jpgButton }}
                  onClick={() => downloadCertificate('jpg')}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0099c2'}
                  onMouseOut={(e) => e.target.style.backgroundColor = colors.primaryBlue}
                >
                  📥 JPG
                </button>
                <button
                  style={{ ...styles.downloadButton, ...styles.pdfButton }}
                  onClick={() => downloadCertificate('pdf')}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c53030'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#e53e3e'}
                >
                  📄 PDF
                </button>
              </div>
            </div>

            <div style={styles.certificateWrapper}>
              {/* Certificate */}
              <div ref={certificateRef} style={{
                  ...styles.certificate,
                  background: currentTheme.background
                }}>
                {/* Decorative Borders */}
                <div style={{
                  ...styles.certBorder,
                  borderColor: currentTheme.borderColor
                }}></div>
                <div style={{
                  ...styles.certInnerBorder,
                  borderColor: currentTheme.innerBorderColor
                }}></div>

                {/* Corner Decorations */}
                <div style={{ ...styles.certDecoration, top: '30px', left: '30px' }}>
                  <svg viewBox="0 0 100 100" fill={currentTheme.cornerColor}>
                    <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" />
                  </svg>
                </div>
                <div style={{ ...styles.certDecoration, top: '30px', right: '30px', transform: 'rotate(90deg)' }}>
                  <svg viewBox="0 0 100 100" fill={currentTheme.innerBorderColor}>
                    <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" />
                  </svg>
                </div>
                <div style={{ ...styles.certDecoration, bottom: '30px', left: '30px', transform: 'rotate(-90deg)' }}>
                  <svg viewBox="0 0 100 100" fill={currentTheme.innerBorderColor}>
                    <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" />
                  </svg>
                </div>
                <div style={{ ...styles.certDecoration, bottom: '30px', right: '30px', transform: 'rotate(180deg)' }}>
                  <svg viewBox="0 0 100 100" fill={currentTheme.cornerColor}>
                    <path d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" />
                  </svg>
                </div>

                {/* Certificate ID */}
                {certificateId && <div style={styles.certId}>Certificate ID: {certificateId}</div>}

                {/* Content */}
                <div style={styles.certContent}>
                  <div style={styles.certHeader}>
                    <img
                      src="/single-p.png"
                      alt="TechPath Logo"
                      style={styles.certLogo}
                    />
                    <div style={{...styles.certOrgName, color: currentTheme.accentColor}}>Techpath Research and Development PVT.</div>
                  </div>

                  {/* ========== COURSE COMPLETION CERTIFICATE ========== */}
                  {certificateType === 'course' && (
                    <>
                      <div style={{...styles.certTitle, color: currentTheme.titleColor}}>Certificate of Completion</div>
                      <div style={{...styles.certPresented, color: currentTheme.textColor}}>This is to certify that</div>
                      <div style={{...styles.certStudentName, color: currentTheme.titleColor, borderBottomColor: currentTheme.accentColor}}>{studentName}</div>
                      <div style={styles.certDescription}>
                        {customDescription || defaultDescription}
                      </div>
                      <div style={styles.certCoursesTitle}>Courses Completed</div>
                      <div style={styles.certCoursesList}>
                        {courses.map((course, index) => (
                          <div key={index} style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40'}}>
                            <span style={{...styles.certCourseName, color: currentTheme.titleColor}}>{course.name}</span>
                            <span style={styles.certCoursePeriod}> ({course.startDate} – {course.endDate})</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* ========== INTERNSHIP CERTIFICATE ========== */}
                  {certificateType === 'internship' && (
                    <>
                      <div style={{...styles.certTitle, color: currentTheme.titleColor}}>Internship Certificate</div>
                      <div style={{...styles.certPresented, color: currentTheme.textColor}}>This is to certify that</div>
                      <div style={{...styles.certStudentName, color: currentTheme.titleColor, borderBottomColor: currentTheme.accentColor}}>{internName}</div>
                      <div style={styles.certDescription}>
                        {customDescription || defaultInternDescription}
                      </div>
                      <div style={styles.certCoursesTitle}>Internship Details</div>
                      <div style={styles.certCoursesList}>
                        <div style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40'}}>
                          <span style={{...styles.certCourseName, color: currentTheme.titleColor}}>Department:</span>
                          <span style={styles.certCoursePeriod}> {internDepartment}</span>
                        </div>
                        <div style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40'}}>
                          <span style={{...styles.certCourseName, color: currentTheme.titleColor}}>Duration:</span>
                          <span style={styles.certCoursePeriod}> {internStartDate} – {internEndDate}</span>
                        </div>
                        {internProject && (
                          <div style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40'}}>
                            <span style={{...styles.certCourseName, color: currentTheme.titleColor}}>Project:</span>
                            <span style={styles.certCoursePeriod}> {internProject}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* ========== EXPERIENCE CERTIFICATE ========== */}
                  {certificateType === 'experience' && (
                    <>
                      <div style={{...styles.certTitle, color: currentTheme.titleColor}}>Experience Certificate</div>
                      <div style={{...styles.certPresented, color: currentTheme.textColor}}>This is to certify that</div>
                      <div style={{...styles.certStudentName, color: currentTheme.titleColor, borderBottomColor: currentTheme.accentColor}}>{employeeName}</div>
                      <div style={styles.certDescription}>
                        {customDescription || defaultExperienceDescription}
                      </div>
                      <div style={styles.certCoursesTitle}>Employment Details</div>
                      <div style={styles.certCoursesList}>
                        <div style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40'}}>
                          <span style={{...styles.certCourseName, color: currentTheme.titleColor}}>Designation:</span>
                          <span style={styles.certCoursePeriod}> {designation}</span>
                        </div>
                        <div style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40'}}>
                          <span style={{...styles.certCourseName, color: currentTheme.titleColor}}>Department:</span>
                          <span style={styles.certCoursePeriod}> {empDepartment}</span>
                        </div>
                        <div style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40'}}>
                          <span style={{...styles.certCourseName, color: currentTheme.titleColor}}>Tenure:</span>
                          <span style={styles.certCoursePeriod}> {empStartDate} – {empEndDate}</span>
                        </div>
                        {responsibilities && (
                          <div style={{...styles.certCourseItem, borderBottomColor: currentTheme.accentColor + '40', flexDirection: 'column', textAlign: 'left'}}>
                            <span style={{...styles.certCourseName, color: currentTheme.titleColor, marginBottom: '5px'}}>Responsibilities:</span>
                            <span style={{...styles.certCoursePeriod, whiteSpace: 'pre-wrap'}}>{responsibilities}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Common Footer for all certificate types */}
                  <div style={styles.certFooter}>
                    <div style={styles.certFooterItem}>
                      <div style={{...styles.certSignatureLine, borderTopColor: currentTheme.titleColor}}></div>
                      <div style={styles.certFooterLabel}>Issue Date</div>
                      <div style={{...styles.certDate, color: currentTheme.textColor}}>{getCurrentDate()}</div>
                    </div>
                    <div style={styles.certFooterItem}>
                      <div style={{...styles.certSignatureName, color: currentTheme.titleColor}}>Sanjeev Kumar</div>
                      <div style={{...styles.certSignatureTitle, color: currentTheme.titleColor}}>Director</div>
                      <div style={{...styles.certSignatureLine, borderTopColor: currentTheme.titleColor}}></div>
                      <div style={styles.certFooterLabel}>Authorized Signature</div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div style={styles.certContactSection}>
                    <div style={styles.certContactRow}>
                      <span style={styles.certContactItem}>📧 sanjeev@techpath.biz</span>
                      <span style={styles.certContactItem}>📞 +91 8299708052</span>
                      <span style={styles.certContactItem}>🌐 www.techpath.biz</span>
                    </div>
                    <div style={styles.certContactAddress}>
                      📍 Circus Road, Mughalsarai, Chandauli India 232101
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!showPreview && (
          <div style={{ ...styles.card, ...styles.emptyState, marginTop: '30px' }}>
            <div style={styles.emptyIcon}>📜</div>
            <p style={styles.emptyText}>
              Fill in the student information and add courses to preview your certificate
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateGenerator;
