export const COMMON_ERROR_MESSAGES = {
  API_FETCH_ERROR: '일시적인 오류로 데이터를 불러오지 못했어요.\n잠시 후 다시 시도해 주세요.',
  FETCH_ERROR: (subject: string) =>
    `${subject} 정보를 불러오지 못했어요.\n잠시 후 다시 시도해 주세요.`,
}
