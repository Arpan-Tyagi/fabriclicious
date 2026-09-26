import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Fabriclicious';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E6E2D8',
            color: '#23201D',
          }}
        >
          <div tw="flex flex-col items-center justify-center p-20 text-center">
            <h1 style={{ fontSize: 80, fontWeight: 900, fontFamily: 'serif' }}>{title}</h1>
            <p style={{ fontSize: 30, color: '#8C7355', marginTop: 20 }}>Ultra-Luxury Fractional Textiles</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
