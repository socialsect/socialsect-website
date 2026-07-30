import { ImageResponse } from '@vercel/og'

export const runtime = 'nodejs'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gosocialsect.com'
const LOGO_URL = `${SITE_URL}/icons/logo.svg`

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Socialsect'
    const description = searchParams.get('description') || ''
    const type = searchParams.get('type') || 'website'

    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #695AF2 0%, #4338CA 50%, #312E81 100%)',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Top: logo + type badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <img
              src={LOGO_URL}
              width={48}
              height={48}
              style={{ borderRadius: 8 }}
            />
            <span
              style={{
                fontSize: 18,
                color: '#D4D0FF',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {type === 'article' ? 'Article' : 'Socialsect'}
            </span>
          </div>

          {/* Center: title + description */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '90%',
            }}
          >
            <h1
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: 'white',
                margin: 0,
                lineHeight: 1.15,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </h1>
            {description && (
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 400,
                  color: '#D4D0FF',
                  margin: '16px 0 0 0',
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Bottom: brand + URL */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              paddingTop: 24,
            }}
          >
            <span
              style={{
                fontSize: 20,
                color: '#A5B4FC',
                fontWeight: 500,
              }}
            >
              Socialsect
            </span>
            <span
              style={{
                fontSize: 16,
                color: '#A5B4FC',
              }}
            >
              gosocialsect.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    // Fallback: return generic social share image if OG generation fails
    return new ImageResponse(
      (
        <div
          style={{
            width: 1200,
            height: 630,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#695AF2',
            color: 'white',
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Socialsect
        </div>
      ),
      { width: 1200, height: 630 },
    )
  }
}
