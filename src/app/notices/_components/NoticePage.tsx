import NoticeContent from './NoticeContent'
import NoticeHeader from './NoticeHeader'

export default function NoticePage() {
  return (
    <div className="min-h-screen bg-white">
      <NoticeHeader />
      <NoticeContent />
    </div>
  )
}
