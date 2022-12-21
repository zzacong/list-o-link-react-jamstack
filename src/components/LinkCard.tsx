import { type Link } from '../types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const archiveLink = (link: Link) =>
  fetch(`/api/links/${link._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(link),
  })

const deleteLink = (link: Link) =>
  fetch(`/api/links/${link._id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: link._id }),
  })

export default function LinkCard({ link }: { link: Link }) {
  const queryClient = useQueryClient()

  const archiveLinkMutation = useMutation({
    mutationFn: archiveLink,
    // When mutate is called:
    onMutate: async newLink => {
      console.log('mutating', { newLink })
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['get-links'])

      // Snapshot the previous value
      const previousLinks = queryClient.getQueryData<Link[]>(['get-links'])

      // Optimistically update to the new value
      queryClient.setQueryData<Link[]>(['get-links'], old => {
        const s = old?.map(l => (l._id === newLink._id ? newLink : l))
        console.log('sss', { s })
        return s
      })

      // Return a context object with the snapshotted value
      return { previousLinks }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newLink, context) => {
      console.log('err', err)
      queryClient.setQueryData(['get-links'], context?.previousLinks)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(['get-links'])
    },
  })

  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    // When mutate is called:
    onMutate: async newLink => {
      console.log('mutating', { newLink })
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['get-links'])

      // Snapshot the previous value
      const previousLinks = queryClient.getQueryData<Link[]>(['get-links'])

      // Optimistically update to the new value
      queryClient.setQueryData<Link[]>(['get-links'], old =>
        old?.filter(l => l._id !== newLink._id)
      )

      // Return a context object with the snapshotted value
      return { previousLinks }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newLink, context) => {
      queryClient.setQueryData(['get-links'], context?.previousLinks)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['get-links'] })
    },
  })

  return (
    <div className="card mb-4">
      <div className="card-header">{link.name}</div>
      <div className="card-body">
        <a href={link.url} target="_blank" rel="noopener noreferrer">
          {link.url}
        </a>
        <p>{link.description}</p>
      </div>
      <div className="card-footer">
        <button
          className="btn btn-secondary mr-2"
          onClick={() => {
            if (!link.archived) return
            archiveLinkMutation.mutate({ ...link, archived: false })
          }}
        >
          Unarchive
        </button>
        <button
          className="btn btn-warning mr-2"
          onClick={() => {
            if (link.archived) return
            archiveLinkMutation.mutate({ ...link, archived: true })
          }}
        >
          Archive
        </button>
        <button
          className="btn btn-danger"
          onClick={() => deleteLinkMutation.mutate(link)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
