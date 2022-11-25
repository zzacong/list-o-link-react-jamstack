import sendQuery from '../../lib/utils/sendQuery.mjs'
import { GET_LINKS, CREATE_LINK } from '../../lib/utils/linkQuery.mjs'
import { json } from '../../lib/utils/edge-response.mjs'

export const config = {
  runtime: 'experimental-edge',
}

export default async function (req) {
  try {
    if (req.method === 'GET') {
      const data = await sendQuery(GET_LINKS)
      return json(data.allLinks.data)
    }
    if (req.method === 'POST') {
      const { name, url, description } = await req.json()
      const variables = { name, url, description, archived: false }
      const { createLink: createdLink } = await sendQuery(
        CREATE_LINK,
        variables
      )
      return json(createdLink, 201)
    }
  } catch (error) {
    console.error(error)
    return json({ error: 'Something went wrong' }, 500)
  }
  return json({ error: 'Method not supported' }, 405)
}
