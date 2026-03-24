import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const allowedIps = process.env.ALLOWED_IPS?.split(',') || []

function ipToLong(ip: string) {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct), 0)
}

function ipInRange(ip: string, range: string) {
  if (range.includes('/')) {
    const [base, bits] = range.split('/')
    const mask = ~(2 ** (32 - Number(bits)) - 1)

    return (ipToLong(ip) & mask) === (ipToLong(base) & mask)
  }

  return ip === range
}

export function middleware(req: NextRequest) {
  const ip =
    req.ip ||
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    ''

  const allowed = allowedIps.some(range =>
    ipInRange(ip.trim(), range.trim())
  )

  if (!allowed) {
    return new NextResponse('Acesso negado', { status: 403 })
  }

  return NextResponse.next()
}
