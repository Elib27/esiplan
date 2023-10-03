import { NextResponse } from 'next/server'
import { parse } from 'node-html-parser'

const EDTS_URL = 'https://edt.esisariens.org'

export async function GET() {
  try {
    const response = await fetch(EDTS_URL, { next: { revalidate: 3600 * 12 } })
    const html = await response.text()
    const root = parse(html)
    const groupsData = root.querySelectorAll('table ul.dropdown-menu a')
    const groups = groupsData.map((group) => group.text.slice(0, -4)) // get name and remove the .ics extension
    if (groups.length === 0) throw new Error('No groups found')
    return NextResponse.json(groups)
  } catch (error) {
    return NextResponse.error()
  }
}
