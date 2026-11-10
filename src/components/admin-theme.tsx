'use client'

import { useEffect } from 'react'

/** Menandai <html> dengan class `admin-theme` selama area admin aktif,
 *  agar portal (dialog, sheet mobile) ikut memakai tema admin. */
export function AdminTheme() {
  useEffect(() => {
    const root = document.documentElement
    root.classList.add('admin-theme')
    return () => root.classList.remove('admin-theme')
  }, [])
  return null
}

