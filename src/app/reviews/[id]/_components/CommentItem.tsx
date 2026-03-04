'use client'

import Avatar from '@/components/ui/Avatar'
import MemberNickname from '@/components/ui/MemberNickname'
import TimeAgo from '@/components/ui/TimeAgo'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/shadcn/drawer'
import { useMemberProfile } from '@/hooks/useMemberProfile'
import Link from 'next/link'
import { FiMoreVertical } from 'react-icons/fi'
import { useReply } from './ReplyContext'

type Reply = {
  id: number
  commentId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  replyToMemberId: number
  replyToMemberNickname: string
  content: string
  createdAt: string
}

type Comment = {
  id: number
  reviewId: number
  memberId: number
  memberNickname: string
  memberProfileImageUrl: string | null
  content: string
  createdAt: string
  replies?: Reply[]
}

interface CommentItemProps {
  comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { triggerReply } = useReply()
  const { memberProfile } = useMemberProfile()
  const currentMemberId = memberProfile?.id ?? null

  const isMyComment = currentMemberId !== null && comment.memberId === currentMemberId

  const handleReplyClick = (commentId: number, nickname: string, memberId: number) => {
    triggerReply(commentId, nickname, memberId)
  }

  return (
    <div key={comment.id}>
      <div className="flex gap-2.5">
        <Avatar src={comment.memberProfileImageUrl} alt={comment.memberNickname} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[15px] mb-2.5">
            <MemberNickname>{comment.memberNickname}</MemberNickname>
            <TimeAgo date={comment.createdAt} />
          </div>
          <p className="text-xs leading-relaxed whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          <button
            className="mt-[15px] text-xs leading-[12px] text-[#999999] cursor-pointer"
            onClick={() => handleReplyClick(comment.id, comment.memberNickname, comment.memberId)}
          >
            답글달기
          </button>
        </div>
        {!isMyComment && (
          <Drawer>
            <DrawerTrigger asChild>
              <button className="h-[18px] cursor-pointer flex-shrink-0">
                <FiMoreVertical size={18} color="#999999" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="bg-transparent p-[15px] border-none">
              <DrawerTitle className="sr-only">댓글 옵션</DrawerTitle>
              <DrawerDescription className="sr-only">신고, 차단</DrawerDescription>
              <div className="text-center bg-white rounded-[14px]">
                <DrawerClose asChild>
                  <button className="w-full py-[20.5px] text-sm leading-[14px]">신고</button>
                </DrawerClose>
                <div className="h-px bg-[#f6f6f6]" />
                <DrawerClose asChild>
                  <button className="w-full py-[20.5px] text-sm leading-[14px]">차단</button>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-[34px] mt-4 space-y-4">
          {comment.replies.map((reply) => {
            const isMyReply = currentMemberId !== null && reply.memberId === currentMemberId
            return (
              <div key={reply.id} className="flex gap-2.5">
                <Avatar src={reply.memberProfileImageUrl} alt={reply.memberNickname} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2.5">
                    <MemberNickname size="sm">{reply.memberNickname}</MemberNickname>
                    <TimeAgo date={reply.createdAt} />
                  </div>
                  <p className="text-xs leading-relaxed whitespace-pre-wrap break-words">
                    <Link
                      href={`/members/${reply.replyToMemberId}`}
                      className="text-[#3B82F6] font-medium"
                    >
                      @{reply.replyToMemberNickname}
                    </Link>{' '}
                    {reply.content}
                  </p>
                  <button
                    className="mt-[15px] text-xs leading-[12px] text-[#999999] cursor-pointer"
                    onClick={() =>
                      handleReplyClick(comment.id, reply.memberNickname, reply.memberId)
                    }
                  >
                    답글달기
                  </button>
                </div>
                {!isMyReply && (
                  <Drawer>
                    <DrawerTrigger asChild>
                      <button className="h-[18px] cursor-pointer flex-shrink-0">
                        <FiMoreVertical size={18} color="#999999" />
                      </button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-transparent p-[15px] border-none">
                      <DrawerTitle className="sr-only">댓글 옵션</DrawerTitle>
                      <DrawerDescription className="sr-only">신고, 차단</DrawerDescription>
                      <div className="text-center bg-white rounded-[14px]">
                        <DrawerClose asChild>
                          <button className="w-full py-[20.5px] text-sm leading-[14px]">
                            신고
                          </button>
                        </DrawerClose>
                        <div className="h-px bg-[#f6f6f6]" />
                        <DrawerClose asChild>
                          <button className="w-full py-[20.5px] text-sm leading-[14px]">
                            차단
                          </button>
                        </DrawerClose>
                      </div>
                    </DrawerContent>
                  </Drawer>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
