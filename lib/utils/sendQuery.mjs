export default async (query, variables) => {
  const { data, errors } = await fetch('https://graphql.fauna.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  }).then(res => res.json())

  if (errors) {
    console.error(errors)
    throw new Error('Something went wrong')
  }

  return data
}
