export const getArticles = async () => {
  return await sanity.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      metaTitle,
      metaDescription,
      publishedAt
    }
  `);
};