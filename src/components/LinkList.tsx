import { type Link } from '../types'
import { useQuery } from '@tanstack/react-query'

import LinkCard from './LinkCard'

const loadLinks = () =>
  fetch('/api/links').then(res => res.json() as unknown as Link[])

export default function LinkList() {
  const { data: links, refetch } = useQuery({
    queryKey: ['get-links'],
    queryFn: loadLinks,
  })

  console.log('🚀 ~ file: App.jsx:15 ~ App ~ links', links)

  const active = links?.filter(link => !link.archived)
  const archived = links?.filter(link => link.archived)

  return (
    <div>
      <h2 className="my-4">Links</h2>
      {active?.map(link => (
        <LinkCard key={link._id} link={link} />
      ))}

      <h2 className="my-4">Archived</h2>
      {archived?.map(link => (
        <LinkCard key={link._id} link={link} />
      ))}
    </div>
  )
}
