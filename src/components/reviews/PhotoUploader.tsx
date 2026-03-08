'use client'

import { Spinner } from '@/components/ui/shadcn/spinner'
import useFileUpload from '@/hooks/useFileUpload'
import Image from 'next/image'
import { useEffect } from 'react'

interface PhotoUploaderProps {
  maxCount?: number
  onUploadedFileIdsChange: (fileIds: number[]) => void
  onUploadingChange?: (isUploading: boolean) => void
}

export default function PhotoUploader({
  maxCount = 5,
  onUploadedFileIdsChange,
  onUploadingChange,
}: PhotoUploaderProps) {
  const { uploadedFiles, isUploading, handleInputChange, removeAt } = useFileUpload({ maxCount })

  useEffect(() => {
    onUploadedFileIdsChange(uploadedFiles.map((f) => f.fileId))
  }, [uploadedFiles, onUploadedFileIdsChange])

  useEffect(() => {
    onUploadingChange?.(isUploading)
  }, [isUploading, onUploadingChange])

  return (
    <div className="grid grid-cols-3 gap-3">
      <label className="relative flex items-center justify-center aspect-square border-1 border-dashed border-border-main box-border cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept="image/*"
          multiple
          disabled={isUploading || uploadedFiles.length >= maxCount}
        />
        <div className="flex flex-col items-center gap-2.5">
          {isUploading ? (
            <Spinner />
          ) : (
            <Image src="/images/icon-camera.png" alt="카메라" width={23} height={18} />
          )}
          <span className="text-[11px] leading-[11px] text-[#999999]">
            {uploadedFiles.length}/{maxCount}
          </span>
        </div>
      </label>
      {uploadedFiles.map((file, index) => (
        <div key={file.fileId} className="relative overflow-hidden aspect-square">
          <Image
            src={file.previewUrl}
            alt={`uploaded-${index}`}
            className="object-cover border border-border-input box-border"
            fill
          />
          <button
            type="button"
            className="absolute top-1.5 right-1.5"
            onClick={() => removeAt(index)}
          >
            <Image src="/images/icon-remove-image.png" alt="삭제" width={15} height={15} />
          </button>
        </div>
      ))}
    </div>
  )
}
