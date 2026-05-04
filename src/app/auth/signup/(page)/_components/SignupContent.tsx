'use client'

import AppTermsDialog from '@/app/auth/signup/(page)/_components/AppTermsDialog'
import { useState } from 'react'
import SignupForm from './SignupForm'

export default function SignupContent() {
  const [termsDialog, setTermsDialog] = useState<{
    open: boolean
    title: string
    htmlContent: string
  }>({ open: false, title: '', htmlContent: '' })

  return (
    <>
      <SignupForm onOpenTermsDialog={setTermsDialog} />
      <AppTermsDialog
        open={termsDialog.open}
        onOpenChange={(open) => setTermsDialog((prev) => ({ ...prev, open }))}
        title={termsDialog.title}
      >
        <div dangerouslySetInnerHTML={{ __html: termsDialog.htmlContent }} />
      </AppTermsDialog>
    </>
  )
}
