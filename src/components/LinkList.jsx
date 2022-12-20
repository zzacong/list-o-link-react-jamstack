import LinkCard from './LinkCard'

export default function LinkList({ links }) {
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
