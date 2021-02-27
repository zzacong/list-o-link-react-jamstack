const axios = require('axios')
// const path = require('path')

// if (process.env.NODE_ENV !== 'production')
// require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

module.exports = async (query, variables) => {
  console.log('TOKEN: ', process.env.TOKEN)
  const {
    data: { data, errors },
  } = await axios({
    url: 'https://graphql.fauna.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
    },
    data: {
      query,
      variables,
    },
  })

  if (errors) {
    console.log(errors)
    throw new Error('Something went wrong')
  }

  return data
}
