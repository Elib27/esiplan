import { lessonTypesDefaultColors } from '@/constants'
export {}

declare global {
  type LessonType = keyof typeof lessonTypesDefaultColors

  type Lesson = {
    subject: string
    type: LessonType
    room: string
    startTime: string
    endTime: string
    id: string
  }

  type Schedule = Lesson[]
}
