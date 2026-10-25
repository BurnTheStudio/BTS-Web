import { ImageResponse } from 'next/og';
import { SITE_WORDMARK, SITE_TAGLINE } from '@/lib/site';

export const alt = 'Burn The Studio · Product, Design and Engineering';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#0B0A08',
          border: '4px solid #E3B64F',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{
              color: '#F4EEE2',
              fontFamily: 'monospace',
              fontSize: '24px',
              letterSpacing: '0.18em',
              fontWeight: 600,
            }}
          >
            {SITE_WORDMARK}
          </div>
          <div
            style={{
              color: '#8A8272',
              fontFamily: 'monospace',
              fontSize: '16px',
              letterSpacing: '0.18em',
            }}
          >
            STUDIO DECK
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              color: '#F4EEE2',
              fontSize: '76px',
              lineHeight: 1.05,
              fontFamily: 'serif',
              fontWeight: 500,
            }}
          >
            <span>Real problems,&nbsp;</span>
            <span style={{ color: '#E3B64F', fontStyle: 'italic' }}>real fixes.</span>
          </div>

          <div
            style={{
              color: '#E3B64F',
              fontFamily: 'monospace',
              fontSize: '18px',
              letterSpacing: '0.18em',
              fontWeight: 500,
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div
          style={{
            borderTop: '2px solid rgba(244, 238, 226, 0.2)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              color: '#8A8272',
              fontFamily: 'monospace',
              fontSize: '14px',
              letterSpacing: '0.18em',
            }}
          >
            09 REAL PROBLEMS · ROOT CAUSES & DIRECT SOLUTIONS
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
