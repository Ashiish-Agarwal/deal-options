import { NextRequest } from "next/server"

// Get IP address from request
function getClientIP(request: NextRequest): string | null {
  // Check various headers for the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (cfConnectingIP) return cfConnectingIP
  if (realIP) return realIP
  if (forwarded) return forwarded.split(',')[0].trim()
  
  // NextRequest doesn't have direct .ip property in Edge runtime
  // This would need to be handled differently in production
  return null
}

// Method 1: Using ipapi.co (free tier: 30,000 requests/month)
async function getCountryFromIPAPI(ip: string): Promise<string | null> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country/`, {
      headers: { 'User-Agent': 'Your-App-Name' }
    })
    if (response.ok) {
      const country = await response.text()
      return country.trim()
    }
  } catch (error) {
    console.error('Error fetching from ipapi.co:', error)
  }
  return null
}

// Method 2: Using ip-api.com (free tier: 45 requests/minute)
async function getCountryFromIPAPIcom(ip: string): Promise<string | null> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`)
    if (response.ok) {
      const data = await response.json()
      return data.countryCode
    }
  } catch (error) {
    console.error('Error fetching from ip-api.com:', error)
  }
  return null
}

// Method 3: Using ipinfo.io (free tier: 50,000 requests/month)
async function getCountryFromIPInfo(ip: string): Promise<string | null> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/country`)
    if (response.ok) {
      const country = await response.text()
      return country.trim()
    }
  } catch (error) {
    console.error('Error fetching from ipinfo.io:', error)
  }
  return null
}

export async function getCountryFromIP(request: NextRequest): Promise<string | null> {
  const ip = getClientIP(request)
  if (!ip) return null
  
  // Skip private/local IPs
  if (ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    return process.env.NODE_ENV === 'development' ? process.env.TEST_COUNTRY_CODE || 'US' : null
  }
  
  // Try multiple services with fallbacks
  let country = await getCountryFromIPAPI(ip)
  if (country) return country
  
  country = await getCountryFromIPAPIcom(ip)
  if (country) return country
  
  country = await getCountryFromIPInfo(ip)
  if (country) return country
  
  return null
}
