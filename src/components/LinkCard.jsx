import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKey } from '../App'

const archiveLink = async ({ link, archive }) => {
  link.archived = archive
  await fetch(`/api/links/${link._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(link),
  })
}

const deleteLink = async link => {
  const id = link._id
  await fetch(`/api/links/${link._id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
}

export default function LinkCard({ link }) {
  const queryClient = useQueryClient()

  const archiveLinkMutation = useMutation({
    mutationFn: archiveLink,
    onSettled: () => {
      queryClient.invalidateQueries([queryKey])
    },
  })

  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    onSettled: () => {
      queryClient.invalidateQueries([queryKey])
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
            archiveLinkMutation.mutate({ link, archive: false })
          }}
        >
          Unarchive
        </button>
        <button
          className="btn btn-warning mr-2"
          onClick={() => {
            if (link.archived) return
            archiveLinkMutation.mutate({ link, archive: true })
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
