
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './services/supabase'
import './index.css'
import App from './App.tsx'
import PasswordRecovery from './src/PasswordRecovery'

function Root() {
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(() => {
  return (
    window.location.hash.includes('type=recovery') ||
    new URLSearchParams(window.location.search).get('type') === 'recovery'
  )
})

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setIsPasswordRecovery(true)
        }
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  if (isPasswordRecovery) {
    return (
      <PasswordRecovery
        onComplete={() => setIsPasswordRecovery(false)}
      />
    )
  }

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
