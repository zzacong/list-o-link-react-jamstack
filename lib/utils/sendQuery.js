import axios from 'axios'

export default async (query, variables) => {
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
