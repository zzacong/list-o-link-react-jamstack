import sendQuery from '../../lib/utils/sendQuery.mjs'
import { DELETE_LINK, UPDATE_LINK } from '../../lib/utils/linkQuery.mjs'
import { json } from '../../lib/utils/edge-response.mjs'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req) {
  try {
    // PUT /api/links/[linkId]
    if (req.method === 'PUT') {
      const linkId = getLinkId(req)
      const { name, url, description, archived } = await req.json()
      const variables = { name, url, description, archived, id: linkId }
      const { updateLink: updatedLinked } = await sendQuery(
        UPDATE_LINK,
        variables
      )
      return json(updatedLinked)
    }

    // DELETE /api/links/[linkId]
    if (req.method === 'DELETE') {
      const linkId = getLinkId(req)
      const { deleteLink: deletedLink } = await sendQuery(DELETE_LINK, {
        id: linkId,
      })
      return json(deletedLink)
    }
  } catch (error) {
    console.error(error)
    return json({ error: 'Something went wrong' }, 500)
  }
  return json({ error: 'Method not supported' }, 405)
}

// const getLinkId = req =>
//   new URL(req.url).pathname.split('/').slice(-1)[0]

const getLinkId = req => new URL(req.url).searchParams.get('linkId')
