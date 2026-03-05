import { fileRepository } from "@/domains/file"
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
  }

  const response = await fileRepository.uploadFile(file)

  if (response.error) {
    return NextResponse.json({ error: response.error }, { status: response.status || 500 })
  }

  return NextResponse.json({ data: response.data }, { status: 200 })
}
