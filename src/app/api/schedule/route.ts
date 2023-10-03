import { NextRequest, NextResponse } from 'next/server'
import ical from 'node-ical'
import getLessonTypeFromString from '@/lib/getLessonTypeFromString'

export async function GET(request: NextRequest) {
  const group = request.nextUrl.searchParams.get('group')

  const data = await ical.async.fromURL(
    `https://edt.esisariens.org/ics/emploi_du_temps_${group}.ics`
  )

  const planning: Lesson[] = []
  for (const lesson of Object.values(data)) {
    if (lesson.type !== 'VEVENT') continue
    planning.push({
      subject: lesson.summary,
      type: getLessonTypeFromString(lesson.description),
      startTime: lesson.start as unknown as string,
      endTime: lesson.end as unknown as string,
      room: lesson.location,
      id: lesson.uid,
    })
  }
  return NextResponse.json(planning)
}
