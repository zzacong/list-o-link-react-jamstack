const sendQuery = require('./utils/sendQuery')
const formattedResponse = require('./utils/formattedResponse')
const { GET_LINKS } = require('./utils/linkQuery')

exports.handler = async event => {
  if (event.httpMethod !== 'GET')
    return formattedResponse(405, { err: 'Method not supported' })
  try {
    const res = await sendQuery(GET_LINKS)
    const data = res.allLinks.data
    return formattedResponse(200, data)
  } catch (err) {
    console.error(err)
    return formattedResponse(500, { err: 'Something went wrong' })
  }
}
