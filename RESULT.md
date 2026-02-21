# Tastyhouse Web 프로젝트 분석 보고서

> 분석일: 2026-02-20 | Next.js 15 + React 19 + TypeScript + Tailwind CSS v4

---

## 1. 프로젝트 구조 요약

```
src/
├── app/                  # App Router (라우팅 + 페이지)
│   ├── (with-footer)/    # Route Group (Footer 포함 레이아웃)
│   ├── account/          # 계정 관리
│   ├── advertising/      # 광고/제휴 신청
│   ├── bug-reports/      # 버그 제보
│   ├── orders/           # 주문
│   ├── payments/         # 결제
│   ├── places/           # 장소
│   ├── reviews/          # 리뷰
│   └── ...
├── components/           # 재사용 컴포넌트 (32개+ UI 컴포넌트)
│   ├── ui/shadcn/        # Shadcn UI 컴포넌트
│   ├── layouts/          # 레이아웃 (Footer, Header, Sidebar)
│   ├── reviews/          # 리뷰 관련
│   ├── order/            # 주문 관련
│   └── ...
├── domains/              # 도메인 계층 (DDD 패턴)
│   ├── [domain].type.ts
│   ├── [domain].repository.ts
│   └── [domain].service.ts
├── services/             # Server Action 래퍼
├── hooks/                # 커스텀 Hooks
├── lib/                  # 유틸리티 (API 클라이언트, 상수 등)
├── types/                # 공통 타입 정의
├── constants/            # 프로젝트 상수
├── providers/            # Context Provider
├── styles/               # 글로벌 CSS
└── middleware.ts          # JWT 토큰 자동 갱신
```

---

## 2. 아키텍처 강점

### 도메인 주도 설계(DDD) 적용

각 도메인이 `type → repository → service` 3계층으로 잘 분리되어 있어 관심사 분리가 명확합니다.

```
domains/order/
├── order.type.ts          # 타입 정의
├── order.repository.ts    # API 호출 (api 클라이언트 사용)
├── order.service.ts       # 비즈니스 로직 (repository 호출)
└── index.ts               # 공개 API (barrel export)
```

### Server Component 적극 활용

대부분의 페이지가 `async` Server Component로 구현되어 서버에서 데이터를 직접 페칭하고, 클라이언트 번들 크기를 최소화하고 있습니다.

### JWT 토큰 자동 갱신

미들웨어에서 매 요청마다 accessToken 만료를 확인하고, 만료 5분 전에 자동으로 refreshToken으로 갱신하는 구조가 잘 구현되어 있습니다.

### 일관된 코드 스타일

ESLint + Prettier + unused-imports 플러그인으로 코드 품질이 균일하게 유지되고 있습니다.

### TanStack Query 설정

staleTime 60초, gcTime 5분, retry 1회 등 적절한 캐싱 전략이 적용되어 있습니다.

---

## 3. 개선이 필요한 부분

### 3-1. 심각도 높음 (즉시 수정 권장)

#### (1) 미구현 컴포넌트가 프로덕션 코드에 존재

**파일:** `src/components/reviews/SubmitButton.tsx`

```tsx
// 현재 상태: 빈 div만 반환, 전체 로직 주석 처리
export default function SubmitButton({ form, disabled = false }: SubmitButtonProps) {
  console.log(form, disabled)
  return <div></div>  // 구현 미완
}
```

**권장:** 구현을 완료하거나, 사용하지 않는다면 제거해야 합니다. 빈 컴포넌트가 페이지에 렌더링되면 사용자 경험에 악영향을 줍니다.

---

#### (2) Mock 데이터가 하드코딩된 페이지

**파일:** `src/app/payments/[id]/page.tsx`

결제 상세 페이지에서 실제 API 대신 하드코딩된 Mock 데이터를 사용하고 있습니다. 프로덕션 배포 시 반드시 실제 API로 교체해야 합니다.

---

#### (3) 메뉴 상세 페이지 미구현

**파일:** `src/app/places/[id]/menus/[menuId]/page.tsx`

```tsx
export default async function PlaceMenuDetailPage({ params }) {
  console.log(placeId, productId)  // 디버그 코드
  return <div>메뉴 상세 리뷰 페이지</div>  // placeholder만 존재
}
```

**권장:** 구현 전까지 라우트를 비활성화하거나 redirect 처리가 필요합니다.

---

#### (4) 메모리 누수 위험 - Object URL 미해제

**파일:** `src/components/reviews/PhotoUploader.tsx`

```tsx
const previewUrl = URL.createObjectURL(file)
// URL.revokeObjectURL() 호출이 없음
```

**권장:** 컴포넌트 언마운트 시 또는 이미지 제거 시 `URL.revokeObjectURL()`을 호출하여 메모리를 해제해야 합니다.

```tsx
// 개선 예시
useEffect(() => {
  return () => {
    previews.forEach((url) => URL.revokeObjectURL(url))
  }
}, [previews])
```

---

### 3-2. 심각도 중간 (개선 권장)

#### (5) 테스트 코드 부재

프로젝트 전체에 테스트 파일(`.test.ts`, `.spec.ts`)이 없습니다. package.json에도 테스트 스크립트가 없습니다.

**권장:**
- Vitest 또는 Jest + React Testing Library 도입
- 최소한 도메인 서비스 계층과 주요 비즈니스 로직에 대한 단위 테스트 작성
- CI/CD 파이프라인에 테스트 단계 추가

---

#### (6) 에러 처리 일관성 부족

프로젝트 전반에 걸쳐 에러 처리 방식이 통일되지 않았습니다.

| 위치 | 현재 방식 | 문제점 |
|------|----------|--------|
| `orders/[orderId]/page.tsx` | 단순 텍스트 반환 | 사용자에게 조치 방법 미제공 |
| `login/action.ts` | `{ success, error }` 객체 반환 | 양호 |
| 일부 컴포넌트 | `toast()` 사용 | 양호하나 비일관적 |
| 일부 페이지 | 에러 처리 없음 | 네트워크 오류 시 빈 화면 |

**권장:**
- 전역 에러 바운더리 구현 (`error.tsx`, `global-error.tsx`)
- 에러 응답 형식 통일 (예: `{ success: boolean, error?: string, data?: T }`)
- 사용자 친화적인 에러 메시지 컴포넌트 활용 (`ErrorStateSection` 등)

---

#### (7) Suspense 바운더리 미사용

Server Component에서 데이터 페칭 시 `loading.tsx` 또는 `<Suspense>` 바운더리가 대부분의 페이지에서 누락되어 있습니다.

**권장:**
```tsx
// 개선 예시
import { Suspense } from 'react'

export default function PlacePage() {
  return (
    <Suspense fallback={<PlaceSkeleton />}>
      <PlaceContent />
    </Suspense>
  )
}
```

---

#### (8) console.log 디버그 코드 잔존

여러 파일에 개발용 `console.log`가 남아있습니다.

- `src/components/reviews/SubmitButton.tsx`
- `src/app/places/[id]/menus/[menuId]/page.tsx`

**권장:** ESLint 규칙에 `no-console: 'warn'`을 추가하여 빌드 시 경고를 표시하도록 설정합니다.

---

#### (9) Promise.all 에러 처리 미흡

**파일:** `src/hooks/useCartInfo.ts`

```tsx
const results = await Promise.all(productIds.map((id) => getProductById(id)))
// 하나라도 실패하면 전체 실패
```

**권장:** `Promise.allSettled()`를 사용하여 부분 실패를 허용하거나, 개별 에러 처리를 추가합니다.

```tsx
const results = await Promise.allSettled(productIds.map((id) => getProductById(id)))
const successResults = results
  .filter((r) => r.status === 'fulfilled')
  .map((r) => r.value)
```

---

#### (10) Zod 미활용

프로젝트에 Zod가 설치되어 있지만, 폼 검증에서 수동으로 if문을 사용하고 있습니다.

**현재:**
```tsx
const validateForm = (): boolean => {
  const newErrors: FormErrors = {}
  if (!formData.device) newErrors.device = '단말기를 선택해주세요.'
  if (!formData.title.trim()) newErrors.title = '제목을 입력해주세요.'
  // ...
}
```

**권장:**
```tsx
const bugReportSchema = z.object({
  device: z.string().min(1, '단말기를 선택해주세요.'),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
})

const result = bugReportSchema.safeParse(formData)
if (!result.success) {
  const fieldErrors = result.error.flatten().fieldErrors
  setErrors(fieldErrors)
}
```

---

### 3-3. 심각도 낮음 (선택적 개선)

#### (11) services 계층의 역할 모호

`src/services/` 파일들이 대부분 domain service를 단순 위임하는 Server Action 래퍼입니다.

```tsx
// src/services/order.ts
'use server'
export async function getOrderDetail(orderId: number) {
  return await orderService.getOrderDetail(orderId)  // 단순 위임
}
```

**권장:** Server Action이 필요한 경우에만 services 계층을 유지하고, 불필요한 래퍼는 domain service를 직접 호출하도록 정리합니다.

---

#### (12) API 응답 타입 이중 중첩 가능성

```tsx
// repository에서 ApiResponse<T>를 반환하고, 실제 API도 { success, data } 형태로 응답
api.post<ApiResponse<OrderResponse>>(`${ENDPOINT}/v1`, request)
// 결과: ApiResponse<ApiResponse<OrderResponse>> 가능
```

**권장:** API 클라이언트의 제너릭 타입과 도메인 타입 간의 관계를 명확히 정리하여 중첩을 방지합니다.

---

#### (13) 환경 변수 관리

- `.env` 파일에 테스트 키가 포함되어 Git에 커밋될 수 있음
- `next.config.ts`에서 `env` 설정이 불필요하게 중복됨 (`NEXT_PUBLIC_*`은 자동 노출)

**권장:**
- `.env.example` 파일을 생성하여 필요한 환경 변수 목록만 관리
- 실제 키는 `.env.local`에 보관하고 `.gitignore`에 추가
- `next.config.ts`의 `env` 설정 제거 (Next.js가 `NEXT_PUBLIC_*`을 자동 처리)

---

#### (14) 아이콘 라이브러리 중복

`lucide-react`와 `react-icons` 두 개의 아이콘 라이브러리가 동시에 사용되고 있습니다.

**권장:** 하나의 아이콘 라이브러리로 통일하여 번들 크기를 줄입니다. Shadcn UI와의 호환성을 고려하면 `lucide-react`로 통일하는 것이 적합합니다.

---

#### (15) CSRF 보호 미구현

Server Action 및 API 호출에서 CSRF 토큰 검증이 없습니다. Next.js의 Server Action은 기본적으로 Origin 헤더를 검증하지만, 추가적인 CSRF 보호를 고려할 수 있습니다.

---

## 4. 개선 우선순위 요약

| 순위 | 항목 | 심각도 | 난이도 |
|------|------|--------|--------|
| 1 | 미구현 컴포넌트 정리 (SubmitButton, 메뉴 상세 등) | 높음 | 낮음 |
| 2 | Object URL 메모리 누수 수정 | 높음 | 낮음 |
| 3 | Mock 데이터 → 실제 API 연동 | 높음 | 중간 |
| 4 | console.log 제거 및 ESLint 규칙 추가 | 중간 | 낮음 |
| 5 | 에러 처리 전략 통일 | 중간 | 중간 |
| 6 | Suspense/loading 바운더리 추가 | 중간 | 낮음 |
| 7 | Zod 스키마 기반 폼 검증 전환 | 중간 | 중간 |
| 8 | Promise.allSettled 적용 | 중간 | 낮음 |
| 9 | 테스트 코드 작성 | 중간 | 높음 |
| 10 | 환경 변수 관리 개선 | 낮음 | 낮음 |
| 11 | services 계층 정리 | 낮음 | 낮음 |
| 12 | API 응답 타입 중첩 정리 | 낮음 | 중간 |
| 13 | 아이콘 라이브러리 통일 | 낮음 | 중간 |

---

## 5. 종합 평가

### 잘 된 부분
- DDD 기반의 명확한 도메인 분리
- Server Component와 Client Component의 적절한 구분
- JWT 토큰 자동 갱신 미들웨어
- TanStack Query를 활용한 서버 상태 관리
- Tailwind CSS v4 + Shadcn UI 조합의 일관된 UI 시스템
- TypeScript strict mode 활용

### 주의가 필요한 부분
- 미구현 코드가 프로덕션 라우트에 노출됨
- 테스트 코드가 전혀 없음
- 에러/로딩 처리 전략이 통일되지 않음
- 설치된 라이브러리(Zod)가 충분히 활용되지 않음

전반적으로 프로젝트 아키텍처와 구조는 우수하며, 위의 개선 사항들을 순차적으로 적용하면 프로덕션 수준의 안정성과 유지보수성을 확보할 수 있습니다.
