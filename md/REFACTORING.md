# tastyhouse-web 코드 리뷰 및 리팩토링 가이드

> 전반적 품질: **8/10** — 견고한 도메인 계층과 타입 안전성을 갖춘 프로덕션급 코드베이스.
> 에러 처리 일관성과 보안 강화가 주요 개선 포인트.

---

## High 심각도

### 1. XSS 취약점 — KakaoMap `place.name` 미이스케이프

**파일:** `src/components/home/KakaoMap.tsx:110-114`

**문제:** `place.name`이 HTML 문자열에 이스케이프 없이 삽입되어 XSS 공격 가능.

```typescript
// AS-IS (취약)
const content = `
  <div class="label" style="...">
    <span class="center" style="...">${place.name}</span>
  </div>
`
```

**개선 코드:**

```typescript
// 유틸 함수 추가 (src/lib/sanitize.ts)
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

// KakaoMap.tsx 수정
import { escapeHtml } from '@/lib/sanitize'

const content = `
  <div class="label" style="padding: 0 13px; background-color: white; border: 1px solid silver; border-radius: 10px">
    <span class="center" style="font-size: 13px!important; font-weight: bold">${escapeHtml(place.name)}</span>
  </div>
`
```

---

### 2. 글로벌 에러 바운더리 — 내부 에러 메시지 노출

**파일:** `src/app/error.tsx:17`

**문제:** `error.message`를 사용자에게 그대로 노출. 프로덕션에서 스택 트레이스나 내부 구현 정보가 유출될 수 있음.

```typescript
// AS-IS
<ErrorMessage
  message={error.message || '예기치 않은 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.'}
/>
```

**개선 코드:**

```typescript
// TO-BE
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  if (process.env.NODE_ENV === 'development') {
    console.error('[ErrorBoundary]', error)
  }

  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <ErrorMessage
          message="예기치 않은 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요."
        />
      </div>
      <div className="p-4">
        <AppButton onClick={reset} className="bg-main w-full">
          <MdRefresh size={20} />
          다시 시도
        </AppButton>
      </div>
    </section>
  )
}
```

---

### 3. 미들웨어 토큰 갱신 실패 시 조용한 진행

**파일:** `src/middleware.ts:102-105`

**문제:** 네트워크 에러 등으로 토큰 갱신이 실패해도 만료된 토큰으로 요청이 계속 진행됨. 사용자는 인지하지 못한 채 인증 필요 페이지에서 오류를 경험할 수 있음.

```typescript
// AS-IS
catch (error) {
  console.error('[middleware] Token refresh error:', error)
  return NextResponse.next()  // 만료 토큰으로 그냥 진행
}
```

**개선 코드:**

```typescript
// TO-BE
catch (error) {
  console.error('[middleware] Token refresh error:', error)

  // 갱신 실패 시 만료된 토큰 제거 — 각 페이지에서 비인증 상태로 적절히 처리
  const res = NextResponse.next()
  res.cookies.delete('accessToken')
  res.cookies.delete('refreshToken')
  return res
}
```

---

### 4. 쿠키 maxAge 불일치 — 미들웨어 vs 로그인

**파일:** `src/middleware.ts:91-98` vs `src/app/auth/login/action.ts:55-64`

**문제:**

- 미들웨어 갱신 시: accessToken `1시간`, refreshToken `7일` (고정)
- 로그인 시(rememberMe): 둘 다 `30일`
- rememberMe 사용자가 토큰 갱신되면 maxAge가 30일 → 1시간/7일로 축소되어 의도치 않은 로그아웃 발생.

**개선 코드:**

```typescript
// middleware.ts — rememberMe 상태를 쿠키로 전달받아 일관된 maxAge 적용
const rememberMe = request.cookies.get('rememberMe')?.value === 'true'

const accessTokenMaxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60
const refreshTokenMaxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7

res.cookies.set('accessToken', data.accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: accessTokenMaxAge,
})
res.cookies.set('refreshToken', data.refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
  maxAge: refreshTokenMaxAge,
})

// login/action.ts — rememberMe 쿠키 추가
if (rememberMe) {
  cookieStore.set('rememberMe', 'true', {
    ...baseOptions,
    httpOnly: false, // 미들웨어에서 읽어야 하므로
    maxAge: 60 * 60 * 24 * 30,
  })
}
```

---

## Medium 심각도

### 5. useMutation onError 핸들러 누락 — 팔로우 기능

**파일:** `src/hooks/useFollowMutation.ts:67-79`

**문제:** 팔로우/언팔로우 실패 시 사용자에게 어떤 피드백도 없음. Optimistic update도 롤백되지 않음.

```typescript
// AS-IS
const followMutation = useMutation({
  mutationFn: (targetMemberId: number) => followMember(targetMemberId),
  onSuccess: (_, targetMemberId) => {
    syncFollowState(targetMemberId, true)
  },
  // onError 없음
})
```

**개선 코드:**

```typescript
import { toast } from '@/components/ui/AppToaster'

const followMutation = useMutation({
  mutationFn: (targetMemberId: number) => followMember(targetMemberId),
  onSuccess: (_, targetMemberId) => {
    syncFollowState(targetMemberId, true)
  },
  onError: () => {
    toast('팔로우에 실패했습니다. 다시 시도해 주세요.')
  },
})

const unfollowMutation = useMutation({
  mutationFn: (targetMemberId: number) => unfollowMember(targetMemberId),
  onSuccess: (_, targetMemberId) => {
    syncFollowState(targetMemberId, false)
  },
  onError: () => {
    toast('팔로우 취소에 실패했습니다. 다시 시도해 주세요.')
  },
})
```

---

### 6. useCartInfo — 상품 조회 실패 무시

**파일:** `src/hooks/useCartInfo.ts:80-93`

**문제:** `Promise.allSettled`로 상품 정보를 조회하지만, 실패한 상품은 조용히 무시됨. 사용자는 장바구니에 담은 상품이 갑자기 사라진 것처럼 보일 수 있음.

```typescript
// AS-IS
results.forEach((result, index) => {
  if (result.status === 'fulfilled' && result.value.data) {
    detailMap.set(productIds[index], result.value.data)
  }
  // 실패한 상품은 무시
})
```

**개선 코드:**

```typescript
import { toast } from '@/components/ui/AppToaster'

async function fetchProductDetails(
  productIds: number[],
): Promise<Map<number, ProductDetailResponse>> {
  const results = await Promise.allSettled(productIds.map((id) => getProductById(id)))
  const detailMap = new Map<number, ProductDetailResponse>()
  let failedCount = 0

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value.data) {
      detailMap.set(productIds[index], result.value.data)
    } else {
      failedCount++
    }
  })

  if (failedCount > 0) {
    toast(`${failedCount}개 상품 정보를 불러오지 못했습니다.`)
  }

  return detailMap
}
```

---

### 7. API 클라이언트 — 백엔드 `success: false` 응답 미처리

**파일:** `src/lib/api.ts:98-104`

**문제:** HTTP 200이지만 `success: false`인 백엔드 응답을 성공으로 처리함.

```typescript
// AS-IS
if (json && typeof json === 'object' && 'success' in json) {
  return {
    data: json.data as T, // success: false여도 data 반환
    status,
    ...(json.pagination ? { pagination: json.pagination } : {}),
  }
}
```

**개선 코드:**

```typescript
// TO-BE
if (json && typeof json === 'object' && 'success' in json) {
  if (!json.success) {
    return {
      error: json.message || 'An error occurred',
      status,
    }
  }

  return {
    data: json.data as T,
    status,
    ...(json.pagination ? { pagination: json.pagination } : {}),
  }
}
```

---

### 8. 에러 메시지 상수 미활용 — 하드코딩 산재

**파일:** 다수 (폼 컴포넌트, 서버 액션 등)

**문제:** `COMMON_ERROR_MESSAGES`가 정의되어 있지만 대부분의 컴포넌트에서 에러 메시지를 하드코딩. 동일한 의미의 메시지가 여러 형태로 존재.

```typescript
// 현재 산재된 패턴들
toast('오류가 발생했습니다. 다시 시도해 주세요.')
toast('작업에 실패했습니다.')
toast('요청 처리 중 문제가 발생했습니다.')
```

**개선 코드:**

```typescript
// src/lib/constants.ts 확장
export const COMMON_ERROR_MESSAGES = {
  API_FETCH_ERROR: '일시적인 오류로 데이터를 불러오지 못했어요.\n잠시 후 다시 시도해 주세요.',
  FETCH_ERROR: (subject: string) =>
    `${subject} 정보를 불러오지 못했어요.\n잠시 후 다시 시도해 주세요.`,
  MUTATION_ERROR: '요청 처리 중 문제가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
  NETWORK_ERROR: '네트워크 연결을 확인해 주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
} as const

// 컴포넌트에서 사용
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'

catch {
  toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
}
```

---

### 9. dangerouslySetInnerHTML — 미신뢰 HTML 렌더링

**파일:** `src/app/terms/_components/TermsSection.tsx:21`, `src/app/privacy/_components/PrivacySection.tsx:22`

**문제:** 백엔드에서 받은 HTML을 sanitize 없이 직접 렌더링. 관리자 계정이 탈취되거나 백엔드 취약점이 있을 경우 XSS 공격 가능.

```typescript
// AS-IS
<div dangerouslySetInnerHTML={{ __html: terms.content }} />
```

**개선 코드:**

```typescript
// dompurify 설치: npm install dompurify @types/dompurify
import DOMPurify from 'dompurify'

<div
  className="px-[15px] py-7 text-sm leading-relaxed"
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(terms.content, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'a', 'span', 'div'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    }),
  }}
/>
```

---

## Low 심각도

### 10. KakaoMap — 지도 로딩/에러 상태 UI 부재

**파일:** `src/components/home/KakaoMap.tsx`

**문제:** 지도 로딩 중이나 데이터 fetch 실패 시 빈 화면만 표시. 사용자 경험 저하.

**개선 코드:**

```typescript
export default function KakaoMap() {
  const [isMapReady, setIsMapReady] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  // ... 기존 state

  const fetchAndUpdatePlaces = useCallback(
    async (lat: number, lng: number, mapInstance: KakaoMap) => {
      try {
        setFetchError(false)
        const markers = await getMapMarkers({ latitude: lat, longitude: lng })
        clearMarkers()
        clearOverlay()
        createMarkers(markers, mapInstance)
      } catch (error) {
        console.error('장소 데이터를 가져오는 중 오류 발생:', error)
        setFetchError(true)
        clearMarkers()
        clearOverlay()
      }
    },
    [clearMarkers, clearOverlay, createMarkers],
  )

  return (
    <div className="flex h-screen">
      <div className="flex-1 relative">
        {!isMapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <span className="text-gray-500">지도를 불러오는 중...</span>
          </div>
        )}
        {fetchError && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-600 px-4 py-2 rounded-lg shadow z-10">
            장소 정보를 불러오지 못했습니다.
          </div>
        )}
        <Script ... />
        <div id="map" className="w-full h-full" />
      </div>
    </div>
  )
}
```

---

### 11. useCartInfo — 과다한 개별 state 선언

**파일:** `src/hooks/useCartInfo.ts:96-100`

**문제:** 5개의 관련 상태를 개별 `useState`로 관리. 불필요한 렌더링과 상태 동기화 복잡도 증가.

```typescript
// AS-IS
const [items, setItems] = useState<OrderItem[]>([])
const [placeName, setPlaceName] = useState('')
const [firstProductName, setFirstProductName] = useState('')
const [totalItemCount, setTotalItemCount] = useState(0)
const [isLoading, setIsLoading] = useState(true)
```

**개선 코드:**

```typescript
interface CartState {
  items: OrderItem[]
  placeName: string
  firstProductName: string
  totalItemCount: number
  isLoading: boolean
}

const initialState: CartState = {
  items: [],
  placeName: '',
  firstProductName: '',
  totalItemCount: 0,
  isLoading: true,
}

export function useCartInfo(): CartInfo {
  const [state, setState] = useState<CartState>(initialState)

  const loadCartInfo = useCallback(async () => {
    const cart = getCartData()
    if (!cart || cart.products.length === 0) {
      setState({ ...initialState, isLoading: false })
      return
    }

    // ... 기존 로직 ...

    setState({
      items: orderItems,
      placeName: firstDetail?.placeName ?? '',
      firstProductName: orderItems[0]?.name ?? '',
      totalItemCount: getCartProductTypeCount(),
      isLoading: false,
    })
  }, [])

  // ...
}
```

---

### 12. 쿠키 옵션 중복 — 로그인 vs 미들웨어

**파일:** `src/app/auth/login/action.ts:48-53`, `src/middleware.ts:86-99`

**문제:** 쿠키 설정 옵션이 두 곳에서 각각 하드코딩. 보안 설정 변경 시 둘 다 수정해야 하며 누락 위험.

**개선 코드:**

```typescript
// src/lib/cookie.ts
export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
} as const

export const TOKEN_MAX_AGE = {
  accessToken: 60 * 60, // 1시간
  refreshToken: 60 * 60 * 24 * 7, // 7일
  rememberMe: 60 * 60 * 24 * 30, // 30일
} as const

// 미들웨어, 로그인 액션에서 import하여 사용
import { AUTH_COOKIE_OPTIONS, TOKEN_MAX_AGE } from '@/lib/cookie'
```

---

### 13. deprecated API 사용 — `document.execCommand('copy')`

**파일:** `src/lib/share.ts:45-48`

**문제:** `document.execCommand('copy')`는 deprecated. 현재 폴백으로 사용 중이지만 향후 브라우저에서 제거 가능.

**개선 코드:**

```typescript
// src/lib/share.ts
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }
  return false // 클립보드 API 미지원 시 false 반환
}
```

---

## 우선순위 요약

| 순위 | 심각도     | 항목                                | 영향도                 |
| ---- | ---------- | ----------------------------------- | ---------------------- |
| 1    | **High**   | XSS — KakaoMap place.name           | 보안 취약점, 공격 가능 |
| 2    | **High**   | 에러 바운더리 내부 정보 노출        | 보안, 정보 유출        |
| 3    | **High**   | 미들웨어 토큰 갱신 실패 처리        | 인증 장애              |
| 4    | **High**   | 쿠키 maxAge 불일치                  | 의도치 않은 로그아웃   |
| 5    | **Medium** | useMutation onError 누락            | UX 피드백 부재         |
| 6    | **Medium** | 장바구니 상품 조회 실패 무시        | 데이터 불일치          |
| 7    | **Medium** | API 클라이언트 success:false 미처리 | 비즈니스 로직 오류     |
| 8    | **Medium** | 에러 메시지 상수 미활용             | 유지보수 비용          |
| 9    | **Medium** | dangerouslySetInnerHTML 미sanitize  | 보안 (심층 방어)       |
| 10   | **Low**    | KakaoMap 로딩/에러 UI               | UX                     |
| 11   | **Low**    | useCartInfo 과다 state              | 코드 품질              |
| 12   | **Low**    | 쿠키 옵션 중복                      | 유지보수               |
| 13   | **Low**    | deprecated execCommand              | 향후 호환성            |

---

역할: Next.js App Router + Spring Boot 아키텍처 전문가
목적: 코드 리뷰 및 개선점 도출

요청사항:

1. 현재 문제점을 심각도(High/Medium/Low)로 분류해줘
2. 각 문제점마다 구체적인 개선 코드를 제시해줘
3. 우선순위 순서로 정렬해줘
