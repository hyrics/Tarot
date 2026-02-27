import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export type TokenStatus = 'checking' | 'valid' | 'used' | 'invalid'

export function useToken() {
  const [status, setStatus] = useState<TokenStatus>('checking')
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get('token')

    if (!t) {
      setStatus('invalid')
      return
    }

    setToken(t)
    checkToken(t)
  }, [])

  async function checkToken(t: string) {
    const { data, error } = await supabase
      .from('tokens')
      .select('used')
      .eq('token', t)
      .single()

    if (error || !data) {
      setStatus('invalid')
      return
    }

    if (data.used) {
      setStatus('used')
      return
    }

    setStatus('valid')
  }

  async function markTokenUsed() {
    if (!token) return false

    const { error } = await supabase
      .from('tokens')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('token', token)

    return !error
  }

  return { status, markTokenUsed }
}