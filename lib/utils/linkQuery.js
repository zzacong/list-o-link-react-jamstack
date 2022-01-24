export const GET_LINKS = `
  # Write your query or mutation here
  query {
    allLinks {
      data {
        name
        _id
        url
        description
        archived
      }
    }
  }`

export const CREATE_LINK = `
  mutation($name: String!, $url: String!, $description: String! ) {
    createLink( data: { name:$name, url: $url, description: $description, archived: false }) {
        name
        _id
        url
        description
        archived
    }
  }`

export const UPDATE_LINK = `
  mutation($id: ID!, $archived: Boolean!, $name: String!, $url: String!, $description: String!  ) {
    updateLink( id: $id, data: { name:$name, url: $url, description: $description, archived: $archived }) {
      name
      _id
      url
      description
      archived
    }
  }
`

export const DELETE_LINK = `
  mutation($id: ID!) {
    deleteLink( id: $id) {
      _id
    }
  }
`
