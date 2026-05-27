import type { IconName } from './icon-registry'

export type LayoutTabKey = 'home' | 'rank' | 'review' | 'place' | 'mypage'

export type MemberGradeIconCode = '01' | '02' | '03' | '04' | '05'

export function getLayoutTabIcon(tabKey: LayoutTabKey, active: boolean): IconName {
  return `layout/${tabKey}-${active ? 'on' : 'off'}` as IconName
}

export function getMemberGradeIconName(code: MemberGradeIconCode): IconName {
  return `rank/level-${code}-40` as IconName
}
