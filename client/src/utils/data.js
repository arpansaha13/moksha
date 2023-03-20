export const feedQuery = `*[_type == "events"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    name,
        slug,
        category,
        description,
 } `

export const eventDetails = eventId => {
  const query = `*[_type == "events" && slug.current == "${eventId}"] {
    image{
      asset->{
        url
      }
    },
    name,
        slug,
        club,
        category,
        description,
        date,
        vission,
        parameter,
   }`
  return query
}
