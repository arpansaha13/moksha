export const feedQuery = `*[_type == "events"] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    name,
        _slug,
        category,
        description,
 } `
