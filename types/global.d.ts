export {}

declare global {
  type LessonType = 'CM' | 'TD' | 'TP' | 'DS' | 'EX' | 'AU'

  type Lesson = {
    subject: string
    type: LessonType
    room: string
    startTime: string
    endTime: string
    id: string
  }
}
