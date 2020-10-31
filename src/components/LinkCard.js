import React from 'react'

const LinkCard = ({ link, refreshLinks }) => {
  const unarchiveLink = async () => {
    if (!link.archived) return
    link.archived = false
    try {
      await fetch('/api/updateLink', {
        method: 'PUT',
        body: JSON.stringify(link),
      })
      refreshLinks()
    } catch (error) {
      console.error(error)
    }
  }

  const archiveLink = async () => {
    if (link.archived) return
    link.archived = true
    try {
      await fetch('/api/updateLink', {
        method: 'PUT',
        body: JSON.stringify(link),
      })
      refreshLinks()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteLink = async () => {
    const id = link._id
    try {
      await fetch('/api/deleteLink', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      })
      refreshLinks()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="card">
      <div className="card-header">{link.name}</div>
      <div className="card-body">
        <a href={link.url}>{link.url}</a>
        <p>{link.description}</p>
      </div>
      <div className="card-footer">
        <button className="btn btn-secondary mr-2" onClick={unarchiveLink}>
          Unarchive
        </button>
        <button className="btn btn-warning mr-2" onClick={archiveLink}>
          Archive
        </button>
        <button className="btn btn-danger" onClick={deleteLink}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default LinkCard
