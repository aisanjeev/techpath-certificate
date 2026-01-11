import { useState, useEffect } from 'react'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import { loginRequest } from './authConfig'
import CertificateGenerator from './CertificateGenerator'

// Allowed users from environment variable (comma-separated list)
const ALLOWED_USERS = (import.meta.env.VITE_ALLOWED_USERS || '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(email => email.length > 0)

function App() {
  const { instance, accounts } = useMsal()
  const isAuthenticated = useIsAuthenticated()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [unauthorizedEmail, setUnauthorizedEmail] = useState(null)

  // Check if the logged-in user is authorized
  useEffect(() => {
    if (isAuthenticated && accounts.length > 0) {
      const userEmail = accounts[0]?.username?.toLowerCase()
      if (ALLOWED_USERS.includes(userEmail)) {
        setIsAuthorized(true)
        setUnauthorizedEmail(null)
      } else {
        setIsAuthorized(false)
        setUnauthorizedEmail(userEmail)
      }
    } else {
      setIsAuthorized(false)
      setUnauthorizedEmail(null)
    }
    setIsChecking(false)
  }, [isAuthenticated, accounts])

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error('Login failed:', e)
    })
  }

  const handleLogout = () => {
    // Clear all MSAL-related storage keys
    const keysToRemove = []
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i)
      if (key && (key.startsWith('msal.') || key.includes('login') || key.includes('token'))) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => sessionStorage.removeItem(key))
    
    // Also clear localStorage MSAL keys
    const localKeysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.startsWith('msal.') || key.includes('login') || key.includes('token'))) {
        localKeysToRemove.push(key)
      }
    }
    localKeysToRemove.forEach(key => localStorage.removeItem(key))
    
    // Clear entire session storage as fallback
    sessionStorage.clear()
    
    // Redirect to home
    window.location.href = '/'
  }

  // Force logout for unauthorized users
  const handleForceLogout = () => {
    // Same as handleLogout
    sessionStorage.clear()
    
    const localKeysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.startsWith('msal.') || key.includes('login') || key.includes('token'))) {
        localKeysToRemove.push(key)
      }
    }
    localKeysToRemove.forEach(key => localStorage.removeItem(key))
    
    setUnauthorizedEmail(null)
    window.location.href = '/'
  }

  // Show loading while checking authorization
  if (isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a1628',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#8fb8aa',
        fontSize: '18px'
      }}>
        Checking authorization...
      </div>
    )
  }

  // Show unauthorized message if user is not in allowed list
  if (isAuthenticated && !isAuthorized) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a1628',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Crimson Text", Georgia, serif',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: '#1a1a2e',
          border: '1px solid #ef4444',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
          <h1 style={{ color: '#ef4444', fontSize: '24px', marginBottom: '16px' }}>
            Access Denied
          </h1>
          <p style={{ color: '#8fb8aa', marginBottom: '8px' }}>
            The account <strong style={{ color: '#fff' }}>{unauthorizedEmail}</strong> is not authorized to access this application.
          </p>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
            Only authorized Techpath administrators can use this tool.
          </p>
          <button
            onClick={handleForceLogout}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '600',
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Sign Out & Try Different Account
          </button>
        </div>
      </div>
    )
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0a1628',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Crimson Text", Georgia, serif'
      }}>
        <img src="/single-p.png" alt="TechPath Logo" style={{ width: '120px', marginBottom: '24px' }} />
        <h1 style={{ color: '#fff', fontSize: '32px', marginBottom: '16px' }}>
          <span style={{ color: '#2DD4A4' }}>Tech</span>Path Certificate Generator
        </h1>
        <p style={{ color: '#8fb8aa', marginBottom: '32px' }}>Please sign in with your Microsoft account to continue</p>
        <button
          onClick={handleLogin}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            backgroundColor: '#2F2F2F',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#404040'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2F2F2F'}
        >
          <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
            <rect width="10" height="10" fill="#F25022"/>
            <rect x="11" width="10" height="10" fill="#7FBA00"/>
            <rect y="11" width="10" height="10" fill="#00A4EF"/>
            <rect x="11" y="11" width="10" height="10" fill="#FFB900"/>
          </svg>
          Sign in with Microsoft
        </button>
      </div>
    )
  }

  // Authorized user - show the app
  return (
    <div>
      {/* User header bar */}
      <div style={{
        backgroundColor: '#122036',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid #1e3a4a'
      }}>
        <span style={{ color: '#8fb8aa', fontSize: '14px' }}>
          Welcome, {accounts[0]?.name || accounts[0]?.username}
        </span>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: 'transparent',
            color: '#ef4444',
            border: '1px solid #ef4444',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          Sign Out
        </button>
      </div>
      <CertificateGenerator />
    </div>
  )
}

export default App
