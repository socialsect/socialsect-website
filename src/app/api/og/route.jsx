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
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(153deg, #1A1C1D 0%, #21262F 48%, #695AF2 100%)',
            fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
            padding: '60px',
          }}
        >
          {/* Decorative circles like the existing OG design */}
          <div style={{
            position: 'absolute',
            right: -100,
            top: -60,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }} />
          <div style={{
            position: 'absolute',
            left: -80,
            bottom: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'rgba(105,90,242,0.18)',
          }} />

          {/* Logo + type badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <img src={LOGO_URL} width={40} height={40} style={{ borderRadius: 8 }} />
            <span style={{
              fontSize: 16,
              color: '#A5B4FC',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              Socialsect
            </span>
          </div>

          {/* Center content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            maxWidth: '85%',
          }}>
            <h1 style={{
              fontSize: 52,
              fontWeight: 500,
              fontFamily: '"Newsreader", Georgia, "Times New Roman", serif',
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}>
              {title}
            </h1>
            {description && (
              <p style={{
                fontSize: 24,
                fontWeight: 400,
                color: '#C4B5FD',
                margin: '20px 0 0 0',
                lineHeight: 1.4,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {description}
              </p>
            )}
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: 24,
          }}>
            <span style={{
              fontSize: 18,
              color: '#9CA3AF',
              fontWeight: 400,
            }}>
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
    return new ImageResponse(
      (
        <div style={{
          width: 1200,
          height: 630,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1A1C1D',
          color: '#FFFFFF',
          fontSize: 40,
          fontWeight: 500,
          fontFamily: '"Inter", system-ui, sans-serif',
        }}>
          Socialsect
        </div>
      ),
      { width: 1200, height: 630 },
    )
  }
}
