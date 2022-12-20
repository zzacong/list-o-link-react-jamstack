import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { queryKey } from '../App'

const addLink = async ({ name, url, description }) => {
  await fetch('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, url, description }),
  })
}

export default function LinkForm() {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  const queryClient = useQueryClient()
  const addLinkMutation = useMutation({
    mutationFn: addLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] })
    },
  })

  const resetForm = () => {
    setName('')
    setDescription('')
    setUrl('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    addLinkMutation.mutate({ name, url, description })
    resetForm()
  }

  return (
    <div className="card">
      <div className="card-header">Add Link</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              name="url"
              className="form-control"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
