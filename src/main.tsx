
import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { supabase } from './services/supabase'
import './index.css'
import App from './App.tsx'
import PasswordRecovery from './PasswordRecovery'

function Root() {
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false)

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
