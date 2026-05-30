import { sanity } from './sanity'

const ARTICLE_FIELDS = `
  _id,
  title,
  metaTitle,
  metaDescription,
  canonicalUrl,
  robots,
  excerpt,
  readingTime,
  schemaType,
  featuredImageAlt,
  publishedAt,
  updatedAt,
  "slug": slug.current,
  "featuredImage": featuredImage{
    alt,
    asset->{
      _id,
      url,
      metadata{
        dimensions,
        lqip
      }
    }
  },
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      }
    }
  },
  faqs[]{
    question,
    answer
  }
`

export async function getArticles() {
  return sanity.fetch(`*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc){${ARTICLE_FIELDS}}`)
}

export async function getArticleBySlug(slug) {
  if (!slug) return null

  return sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0]{${ARTICLE_FIELDS}}`,
    { slug },
  )
}