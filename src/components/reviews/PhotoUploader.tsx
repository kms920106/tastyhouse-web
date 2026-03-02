'use client'

import Image from 'next/image'
import { useEffect, useMemo } from 'react'
import { SlCamera } from 'react-icons/sl'
import { toast } from '../ui/AppToaster'

interface PhotoUploaderProps {
  value: File[]
  onChange: (photos: File[]) => void
}

export default function PhotoUploader({ value, onChange }: PhotoUploaderProps) {
  const previewUrls = useMemo(() => value.map((file) => URL.createObjectURL(file)), [value])

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (!files.length) return

    if (value.length + files.length > 5) {
      toast('사진은 최대 5장까지 업로드할 수 있습니다.')
      e.target.value = ''
      return
    }

    onChange([...value, ...files])
    e.target.value = ''
  }

  const handleRemoveImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange(newFiles)
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
          <div className="flex flex-col items-center text-gray-400">
            <SlCamera size={23} />
            <span className="text-xs mt-1">{value.length}/5</span>
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
              className="absolute top-1 right-1"
              onClick={() => handleRemoveImage(index)}
            >
              <Image src="/images/icon-delete.png" alt="삭제" width={20} height={20} />
            </button>
          </div>
        ))}
    </div>
  )
}
