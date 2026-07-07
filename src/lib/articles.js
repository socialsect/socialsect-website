import { sanity } from './sanity.js'

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
  "author": author->{
    _id,
    name,
    image,
    bio,
    "slug": slug.current,
    "socialLinks": socialLinks[]{
      platform,
      url
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

export async function getAuthorBySlug(slug) {
  if (!slug) return null

  return sanity.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
      _id,
      name,
      image,
      bio,
      "slug": slug.current,
      "socialLinks": socialLinks[]{
        platform,
        url
      }
    }`,
    { slug },
  )
}

export async function getArticlesByAuthor(authorSlug) {
  if (!authorSlug) return []

  return sanity.fetch(
    `*[_type == "post" && author->slug.current == $authorSlug] | order(coalesce(publishedAt, _createdAt) desc){${ARTICLE_FIELDS}}`,
    { authorSlug },
  )
}