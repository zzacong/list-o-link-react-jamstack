import { useEffect, useState, useCallback } from 'react'
import LinkList from './components/LinkList'
import LinkForm from './components/LinkForm'

export default function App() {
  const [links, setLinks] = useState([])

  const loadLinks = useCallback(async () => {
    try {
      const res = await fetch('/api/links')
      const links = await res.json()
      setLinks(links)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    loadLinks()
  }, [loadLinks])

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">List O' Link</h1>
      <LinkForm refreshLinks={loadLinks} />
      <LinkList links={links} refreshLinks={loadLinks} />
    </div>
  )
}
