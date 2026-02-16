export function resolveImageUrl(filePath: string): string {
  // base64 데이터 URL은 그대로 반환
  if (filePath.startsWith('data:')) {
    return filePath
  }
  return `/api/files?path=${encodeURIComponent(filePath)}`
}
