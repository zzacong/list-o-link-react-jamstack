import { useQuery } from '@tanstack/react-query'

import LinkList from './components/LinkList'
import LinkForm from './components/LinkForm'

const loadLinks = () => fetch('/api/links').then(res => res.json())

export const queryKey = 'get-links'

export default function App() {
  const { data: links } = useQuery({
    queryKey: [queryKey],
    queryFn: loadLinks,
  })

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">List O' Link</h1>
      <LinkForm />
      <LinkList links={links} />
    </div>
  )
}
