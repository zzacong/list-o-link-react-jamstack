import sendQuery from '../../lib/utils/sendQuery'
import { GET_LINKS, CREATE_LINK } from '../../lib/utils/linkQuery'

export default async function (req, res) {
  try {
    if (req.method === 'GET') {
      const data = await sendQuery(GET_LINKS)
      return res.status(200).json(data.allLinks.data)
    }
    if (req.method === 'POST') {
      const { name, url, description } = req.body
      const variables = { name, url, description, archived: false }
      const { createLink: createdLink } = await sendQuery(
        CREATE_LINK,
        variables
      )
      return res.status(200).json(createdLink)
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
  return res.status(405).json({ error: 'Method not supported' })
}
