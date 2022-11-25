import sendQuery from '../../lib/utils/sendQuery.mjs'
import { DELETE_LINK, UPDATE_LINK } from '../../lib/utils/linkQuery.mjs'

export default async function handler(req, res) {
  try {
    // PUT /api/links/[linkId]
    if (req.method === 'PUT') {
      const { linkId } = req.query
      const { name, url, description, archived } = req.body
      const variables = { name, url, description, archived, id: linkId }
      const { updateLink: updatedLinked } = await sendQuery(
        UPDATE_LINK,
        variables
      )
      return res.status(200).json(updatedLinked)
    }

    // DELETE /api/links/[linkId]
    if (req.method === 'DELETE') {
      const { linkId } = req.query
      const { deleteLink: deletedLink } = await sendQuery(DELETE_LINK, {
        id: linkId,
      })
      return res.status(200).json(deletedLink)
    }
  } catch (error) {
    console.error(error)
    return res.status.status(500).json({ error: 'Something went wrong' })
  }
  return res.status(405).json({ error: 'Method not supported' })
}
