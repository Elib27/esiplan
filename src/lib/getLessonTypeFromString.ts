export default function getLessonTypeFromString(s: string): LessonType {
  if (s.includes('CM')) return 'CM'
  if (s.includes('TD')) return 'TD'
  if (s.includes('TP')) return 'TP'
  if (s.includes('DS')) return 'DS'
  return 'AU'
}
