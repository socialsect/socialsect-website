import Script from 'next/script'
import { getSeoConfig, toNextMetadata } from '@/lib/seo'
import JsonLd from '@/components/JsonLd'
import UAEPage from '@/views/uae/UAEPage'

const cfg = getSeoConfig('/uae')
export const metadata = {
  ...toNextMetadata(cfg),
  themeColor: '#07152F',
}

export default function Page() {
  return (
    <>
      <JsonLd schemas={cfg.schemas} />
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1364170269038921');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style="display:none"
          src="https://www.facebook.com/tr?id=1364170269038921&ev=PageView&noscript=1"
        />
      </noscript>
      <UAEPage />
    </>
  )
}
