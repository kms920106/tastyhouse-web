export function resolveImageUrl(filePath: string): string {
  // base64 데이터 URL은 그대로 반환
  if (filePath.startsWith('data:')) {
    return filePath
  }

  // 이미 /api/files 또는 /images로 시작하는 경우 그대로 반환
  if (filePath.startsWith('/api/files') || filePath.startsWith('/images')) {
    return filePath
  }

  // 절대 경로인 경우 upload 디렉토리 이후의 상대 경로로 변환
  let relativePath = filePath
  const uploadMatch = filePath.match(/\/upload\/(.+)$/)
  if (uploadMatch) {
    relativePath = uploadMatch[1]
  }

  return `/api/files?path=${encodeURIComponent(relativePath)}`
}
