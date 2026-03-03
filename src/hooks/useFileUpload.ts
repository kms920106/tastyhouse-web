import { toast } from '@/components/ui/AppToaster'
import { uploadFile } from '@/services/file'
import { useState, useTransition } from 'react'

interface UploadedFile {
  previewUrl: string
  fileId: number
}

interface UseFileUploadOptions {
  maxCount?: number
  errorMessages?: {
    maxCount?: string
    upload?: string
  }
}

export default function useFileUpload({
  maxCount = Infinity,
  errorMessages = {},
}: UseFileUploadOptions = {}) {
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, startUploading] = useTransition()

  const {
    maxCount: maxCountMessage = `사진은 최대 ${maxCount}장까지 업로드할 수 있습니다.`,
    upload: uploadErrorMessage = '사진 업로드 중 오류가 발생했습니다.',
  } = errorMessages

  const uploadNewFiles = (newFiles: File[]) => {
    startUploading(async () => {
      try {
        const results = await Promise.all(
          newFiles.map(async (file) => {
            const previewUrl = URL.createObjectURL(file)
            const response = await uploadFile(file)

            if (!response?.data) {
              throw new Error('파일 업로드에 실패했습니다.')
            }

            return { previewUrl, fileId: response.data }
          }),
        )

        setUploadedFiles((prev) => [...prev, ...results])
      } catch (error) {
        console.error('파일 업로드 실패:', error)
        toast(uploadErrorMessage)
        setFiles((prev) => prev.slice(0, prev.length - newFiles.length))
      }
    })
  }

  // PhotoUploader처럼 File[] 전체를 받는 방식 (삭제 포함)
  const handleFilesChange = (nextFiles: File[]) => {
    const newFiles = nextFiles.slice(files.length)

    if (newFiles.length === 0) {
      setFiles(nextFiles)
      setUploadedFiles((prev) => prev.slice(0, nextFiles.length))
      return
    }

    setFiles(nextFiles)
    uploadNewFiles(newFiles)
  }

  // input[type=file] onChange 방식 (추가만)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    if (!newFiles.length) return

    if (uploadedFiles.length + newFiles.length > maxCount) {
      toast(maxCountMessage)
      return
    }

    e.target.value = ''

    setFiles((prev) => [...prev, ...newFiles])
    uploadNewFiles(newFiles)
  }

  const removeAt = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const reset = () => {
    setFiles([])
    setUploadedFiles([])
  }

  return {
    files,
    uploadedFiles,
    isUploading,
    handleFilesChange,
    handleInputChange,
    removeAt,
    reset,
  }
}
