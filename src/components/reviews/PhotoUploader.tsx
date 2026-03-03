'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface PhotoUploaderProps {
  value: File[]
  onChange: (photos: File[]) => void
}

export default function PhotoUploader({ value, onChange }: PhotoUploaderProps) {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file))
    setPreviewUrls(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [value])

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (!files.length) return

    onChange([...value, ...files])
    e.target.value = ''
  }

  const handleRemoveImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <label className="relative flex items-center justify-center aspect-square border-1 border-dashed border-border-main box-border cursor-pointer">
        <input
          type="file"
          className="hidden"
          onChange={handleUploadImage}
          accept="image/*"
          multiple
        />
        <div className="flex flex-col items-center gap-2.5">
          <Image src="/images/icon-camera.png" alt="카메라" width={23} height={18} />
          <span className="text-[11px] leading-[11px] text-[#999999]">{value.length}/5</span>
        </div>
      </label>
      {previewUrls.map((url, index) => (
        <div key={index} className="relative overflow-hidden aspect-square">
          <Image
            src={url}
            alt={`uploaded-${index}`}
            className="object-cover border border-border-input box-border"
            fill
          />
          <button
            type="button"
            className="absolute top-2 right-2"
            onClick={() => handleRemoveImage(index)}
          >
            <Image src="/images/icon-delete-circle.png" alt="삭제" width={20} height={20} />
          </button>
        </div>
      ))}
    </div>
  )
}
