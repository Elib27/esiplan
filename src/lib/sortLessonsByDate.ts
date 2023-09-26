export default function sortLessonsByDate(lessonA: Lesson, lessonB: Lesson) {
  const lessonTimeA = new Date(lessonA.startTime).getTime()
  const lessonTimeB = new Date(lessonB.startTime).getTime()
  if (lessonTimeA > lessonTimeB) return 1
  return -1
}
