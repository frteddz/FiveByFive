import { NextResponse } from 'next/server';

/**
 * Security.txt route handler
 * Serves security policy information at /.well-known/security.txt and /security.txt
 * https://securitytxt.org/
 */
export async function GET() {
  const securityTxt = `Contact: https://github.com/frteddz/FiveByFive/security
Contact: mailto:security@fivebyfive.vercel.app
Expires: 2026-12-31T23:59:59.000Z
Preferred-Languages: en, es
Canonical: https://fivebyfive.vercel.app/.well-known/security.txt
Policy: https://fivebyfive.vercel.app/security
Acknowledgments: https://fivebyfive.vercel.app/credits

# Security Policy for FiveByFive
# If you discover a security vulnerability, please report it responsibly.
# See our security policy at https://fivebyfive.vercel.app/security for details.`;

  return new NextResponse(securityTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 1 day
    },
  });
}
