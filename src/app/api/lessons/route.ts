import { NextResponse } from 'next/server'
import ical from 'node-ical'
import getLessonTypeFromString from '@/lib/getLessonTypeFromString'

type ResponseData = Lesson[]

export async function GET() {
  const data = await ical.async.fromURL(
    'https://edt.esisariens.org/ics/emploi_du_temps_1A-TP2.ics'
  )

  const planning: ResponseData = []
  for (const lesson of Object.values(data)) {
    if (lesson.type !== 'VEVENT') continue
    planning.push({
      subject: lesson.summary,
      type: getLessonTypeFromString(lesson.description),
      startTime: new Date(lesson.start).toLocaleTimeString('fr-FR'),
      endTime: new Date(lesson.end).toLocaleTimeString('fr-FR'),
      room: lesson.location,
      id: lesson.uid,
    })
  }
  return NextResponse.json(planning.slice(0, 10))
}
