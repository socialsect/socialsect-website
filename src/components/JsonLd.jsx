/**
 * Server component  renders JSON-LD structured data into the initial HTML.
 * No 'use client'  this runs on the server so schemas are crawlable
 * without JavaScript.
 */
export default function JsonLd({ schemas }) {
  if (!schemas?.length) return null
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          suppressHydrationWarning
        />
      ))}
    </>
  )
}
