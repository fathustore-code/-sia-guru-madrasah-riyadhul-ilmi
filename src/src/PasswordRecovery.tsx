
import { useState } from 'react'
import { supabase } from '../services/supabase'

export default function PasswordRecovery({
  onComplete,
}: {
  onComplete: () => void
}) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage('')

    if (password.length < 6) {
      setMessage('Kata sandi minimal 6 karakter.')
      return
    }

    if (password !== confirmPassword) {
      setMessage('Konfirmasi kata sandi tidak sama.')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    setLoading(false)

    if (error) {
      setMessage('Gagal memperbarui kata sandi: ' + error.message)
      return
    }

    setMessage('Kata sandi berhasil dibuat.')
    setPassword('')
    setConfirmPassword('')

    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  return (
    <main style={{
      minHeight: '100vh',
      padding: 30,
      fontFamily: 'Arial, sans-serif',
      background: '#f3f6fa',
      boxSizing: 'border-box'
    }}>
      <section style={{
        maxWidth: 420,
        margin: '50px auto',
        padding: 25,
        background: 'white',
        borderRadius: 10
      }}>
        <h2>Buat Kata Sandi Baru</h2>
        <p>Madrasah Riyadhul Ilmi</p>

        <form onSubmit={handleSubmit}>
          <label>Kata Sandi Baru</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
            placeholder="Minimal 6 karakter"
          />

          <label>Ulangi Kata Sandi</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
            placeholder="Ulangi kata sandi baru"
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? 'Menyimpan...' : 'Simpan Kata Sandi'}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: 15 }}>{message}</p>
        )}
      </section>
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: 12,
  marginTop: 6,
  marginBottom: 15,
  border: '1px solid #ccc',
  borderRadius: 6,
  boxSizing: 'border-box',
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: 13,
  background: '#173f35',
  color: 'white',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
            }
