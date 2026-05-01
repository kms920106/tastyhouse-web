# 도메인 모듈 작성 가이드 (Domain Module Guide)

> 이 문서는 `src/domains/` 하위에서 코드를 작성·수정할 때 Claude(AI)가 참고하는 표준 가이드입니다.
> **`src/domains/place`** 가 현재 프로젝트의 Best Practice 레퍼런스이며, 본 가이드는 place 패턴을 기반으로 작성되었습니다.

---

## 1. 개요

### 1.1. 왜 이 가이드가 필요한가

- 도메인별 파일 구조와 책임이 일관되지 않으면 비즈니스 로직이 repository에 섞이거나, DTO와 Model이 혼동되어 유지보수 비용이 증가합니다.
- `place` 도메인은 7-Layer 구조(index/types/constants/model/dto/repository/service)로 책임을 명확히 분리한 모범 사례입니다.

### 1.2. 적용 범위 (유연한 권장)

- **신규 도메인**: 가능한 한 `place` 패턴을 따릅니다.
- **기존 도메인** (member, order, banner 등): 강제 마이그레이션 대상이 아닙니다. 새 기능을 추가할 때 점진적으로 패턴에 맞춰 정리하면 됩니다.
- 도메인이 단순한 경우 `service.ts`, `model.ts`, `constants.ts`는 생략 가능합니다 (조건부 파일).

---

## 2. 7-Layer 파일 구조

### 2.1. 파일별 책임 요약

| 파일                     | 필수 여부 | 책임                                         | 의존하는 파일                      |
| ------------------------ | --------- | -------------------------------------------- | ---------------------------------- |
| `index.ts`               | **필수**  | 도메인의 모든 public API를 barrel export     | (없음)                             |
| `[domain].types.ts`      | **필수**  | Backend enum ↔ Union 리터럴 타입 정의       | (없음)                             |
| `[domain].constants.ts`  | 조건부    | 코드 ↔ 한국어 매핑 + getter 함수            | `types`                            |
| `[domain].model.ts`      | 조건부    | 도메인 내부에서 재사용되는 엔티티 인터페이스 | `types`                            |
| `[domain].dto.ts`        | **필수**  | API Request/Response 타입 (네트워크 통신용)  | `types`, `model`, `@/types/common` |
| `[domain].repository.ts` | **필수**  | HTTP 호출 (순수 통신만)                      | `@/lib/api`, `dto`                 |
| `[domain].service.ts`    | 조건부    | repository 응답 가공·조합·비즈니스 로직      | `repository`, `constants`          |

### 2.2. 의존성 다이어그램

```
index.ts (모두 export)
   │
   ├─ types.ts        (독립)
   ├─ constants.ts    → types
   ├─ model.ts        → types
   ├─ dto.ts          → types, model, @/types/common
   ├─ repository.ts   → @/lib/api, dto
   └─ service.ts      → repository, constants
```

> 순환 의존성이 발생하지 않도록 의존 방향은 항상 단방향입니다.

---

## 3. 각 Layer 상세 가이드

### 3.1. `index.ts` (필수) — Barrel Export

**책임**: 도메인 폴더 외부에서 단일 경로(`@/domains/[domain]`)로 모든 public API를 import할 수 있도록 재내보냅니다.

**예시**:

```typescript
// client-safe layer만 export (types, constants, model, dto)
export * from './place.constants'
export * from './place.dto'
export * from './place.model'
export * from './place.types'
// repository, service는 포함하지 않음 — 명시 경로로만 접근 가능
```

- ✅ `export *` 만 사용
- ✅ client-safe layer(`types`, `constants`, `model`, `dto`)만 re-export
- ❌ `repository`, `service` export 금지 — `server-only` 코드이므로 barrel에 포함하면 client component에서 빌드 에러 발생
- ❌ 로직, 조건부 export, 변수 선언 금지

---

### 3.2. `[domain].types.ts` (필수) — Union 리터럴 타입

**책임**: Backend enum과 1:1 매핑되는 Union 문자열 리터럴 타입을 정의합니다.

**예시** (`place.types.ts`):

```typescript
export type PlaceFoodType =
  | 'KOREAN'
  | 'JAPANESE'
  | 'WESTERN'
  | 'CHINESE'
  | 'WORLD'
  | 'SNACK'
  | 'BAR'
  | 'CAFE'

export type PlaceAmenityCode = 'PARKING' | 'RESTROOM' | 'RESERVATION'
```

- ✅ `type` 선언 + Union 리터럴 (`'A' | 'B'`)
- ✅ Suffix: `Type`, `Code`
- ❌ 객체 타입(interface), 함수, 상수 정의 금지 (그건 model/dto/constants의 영역)

---

### 3.3. `[domain].constants.ts` (조건부) — 코드 매핑

**책임**: types에 정의된 코드를 사용자에게 보여줄 한국어 라벨로 변환합니다.

**예시** (`place.constants.ts`):

```typescript
import type { PlaceFoodType, PlaceAmenityCode } from './place.types'

const PLACE_FOOD_TYPE_NAMES: Record<PlaceFoodType, string> = {
  KOREAN: '한식',
  JAPANESE: '일식',
  WESTERN: '양식',
  // ... 모든 enum 값을 포함해야 타입 체크 통과
}

export const getPlaceFoodTypeCodeName = (foodType: PlaceFoodType): string => {
  return PLACE_FOOD_TYPE_NAMES[foodType] || foodType
}
```

- ✅ private 맵(`Record<T, string>`) + public getter 함수 패턴
- ✅ 맵 변수명: SCREAMING_SNAKE_CASE
- ✅ getter 함수명: `get` + 타입명 + `Name`
- ❌ HTTP 호출, 비즈니스 로직, UI 로직 금지

**언제 생성?**: 코드 → 한국어 변환이 필요할 때만. 변환 대상이 없으면 파일 생략.

---

### 3.4. `[domain].model.ts` (조건부) — 도메인 엔티티

**책임**: 도메인 내부에서 **재사용되는 객체 인터페이스**를 정의합니다. 여러 DTO에 중첩되거나 비즈니스 로직에서 다루는 엔티티가 대상입니다.

**예시** (`place.model.ts`):

```typescript
import { PlaceAmenityCode, PlaceFoodType } from '.'

export interface PlaceBusinessHour {
  dayType: string
  dayTypeDescription: string
  openTime: string
  closeTime: string
  isClosed: boolean
}

export interface PlaceAmenity {
  code: PlaceAmenityCode
  name: string
  activeImageUrl: string
  inactiveImageUrl: string
}
```

- ✅ 여러 곳에서 재사용되는 객체 (e.g. `PlaceInfoResponse.businessHours: PlaceBusinessHour[]`)
- ✅ Suffix 없음 (단순 명사)
- ❌ Response/Query/Request suffix가 붙는 타입은 dto.ts로

**언제 생성?**: 같은 객체 구조가 여러 DTO에 등장하거나, 도메인 로직에서 별도 인터페이스가 필요할 때만.

---

### 3.5. `[domain].dto.ts` (필수) — API DTO

**책임**: Backend API와의 통신에 사용되는 Request/Query/Response 타입을 정의합니다.

**예시** (`place.dto.ts`):

```typescript
import { PaginationParams } from '@/types/common'
import type { PlaceFoodType, PlaceAmenityCode } from '.'
import { PlaceBusinessHour, PlaceAmenity } from '.'

// Query Parameter
export interface PlaceLatestQuery extends PaginationParams {
  stationId?: number
  foodTypes?: PlaceFoodType[]
  amenities?: PlaceAmenityCode[]
}

// 리스트 아이템 Response
export interface PlaceLatestListItemResponse {
  id: number
  name: string
  imageUrl: string
  rating: number
  foodTypes: PlaceFoodType[]
}

// 단일 객체 Response (null 가능성 명시)
export interface PlaceInfoResponse {
  id: number
  name: string
  roadAddress: string | null
  phoneNumber: string | null
  businessHours: PlaceBusinessHour[]
  amenities: PlaceAmenity[]
}
```

- ✅ Suffix 규칙: `Response` / `Query` / `Request`
- ✅ 리스트 아이템: `[Domain][Context]ListItemResponse` (e.g. `PlaceLatestListItemResponse`)
- ✅ null 가능 필드는 `| null` 명시 (Backend 응답과 일치)
- ❌ 비즈니스 로직, getter 함수 금지 (오직 타입 선언만)

---

### 3.6. `[domain].repository.ts` (필수) — HTTP 계층

**책임**: API 클라이언트(`@/lib/api`)를 사용해 Backend에 HTTP 요청을 보냅니다. **순수 통신만** 담당하며, 데이터 변환이나 비즈니스 로직은 절대 들어가지 않습니다.

**예시** (`place.repository.ts`):

```typescript
import 'server-only'
import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import { PlaceInfoResponse, PlaceLatestListItemResponse, PlaceBookmarkResponse } from './place.dto'

const ENDPOINT = '/api/places'

export const placeRepository = {
  async getLatestPlaces(params: PaginationParams) {
    return api.get<PlaceLatestListItemResponse[], PaginationParams>(`${ENDPOINT}/v1/latest`, {
      params,
    })
  },
  async getPlaceInfo(placeId: number) {
    return api.get<PlaceInfoResponse>(`${ENDPOINT}/v1/${placeId}/info`)
  },
  async togglePlaceBookmark(placeId: number) {
    return api.post<PlaceBookmarkResponse>(`${ENDPOINT}/v1/${placeId}/bookmark`)
  },
}
```

- ✅ 파일 최상단 첫 줄: `import 'server-only'`
- ✅ singleton 객체 패턴 (`export const [domain]Repository = { ... }`)
- ✅ 파일 상단에 `const ENDPOINT = '/api/[domain]'` 단일 변수
- ✅ 메서드명: HTTP 의미 + 리소스 (`getXxx`, `createXxx`, `updateXxx`, `deleteXxx`, `toggleXxx`)
- ✅ 모든 메서드는 `async`, 반환은 `api.[verb]<ResponseType>(...)`
- ❌ `response.data.map(...)`, 필터링, 여러 API 조합 등 가공 금지 → service.ts로
- ❌ UI 로직, 전역 상태 변경 금지

---

### 3.7. `[domain].service.ts` (조건부) — 비즈니스 로직

**책임**: repository 응답을 가공하거나, 여러 repository를 조합하거나, 도메인 비즈니스 로직을 적용합니다.

**예시** (`place.service.ts`):

```typescript
import 'server-only'
import { getPlaceAmenityCodeName, getPlaceFoodTypeCodeName } from './place.constants'
import { placeRepository } from './place.repository'

export const placeService = {
  async getPlaceFoodTypes() {
    const response = await placeRepository.getPlaceFoodTypes()
    if (response.data) {
      response.data = response.data.map((item) => ({
        ...item,
        name: getPlaceFoodTypeCodeName(item.code),
      }))
    }
    return response
  },
}
```

- ✅ 파일 최상단 첫 줄: `import 'server-only'`
- ✅ repository 호출 → 응답 가공 (코드를 한국어 라벨로 변환 등)
- ✅ `response.data` 존재 여부 체크 후 가공 (defensive)
- ✅ `Promise.all`로 여러 repository 호출 조합 가능
- ❌ `api.get(...)` 직접 호출 금지 (반드시 repository 경유)
- ❌ React state, UI 렌더링, 전역 상태 관리 금지

**언제 생성?**: 가공·조합 로직이 1건이라도 있을 때. 단순 조회만 한다면 컴포넌트에서 repository 직접 사용 가능하며 service.ts 생략 가능.

---

## 4. Naming Convention

| 대상              | 규칙                        | 예시                                     |
| ----------------- | --------------------------- | ---------------------------------------- |
| 파일명            | `[domain].[layer].ts`       | `place.repository.ts`                    |
| Union Type        | `Type` / `Code` suffix      | `PlaceFoodType`, `PlaceAmenityCode`      |
| Model interface   | suffix 없음                 | `PlaceBusinessHour`, `PlaceAmenity`      |
| Response DTO      | `Response` suffix           | `PlaceInfoResponse`                      |
| 리스트 아이템 DTO | `[Context]ListItemResponse` | `PlaceLatestListItemResponse`            |
| Query DTO         | `Query` suffix              | `PlaceLatestQuery`                       |
| Request DTO       | `Request` suffix            | `PlaceBookmarkRequest`                   |
| Repository 객체   | `[domain]Repository`        | `placeRepository`                        |
| Repository 메서드 | HTTP 동사 + 리소스          | `getLatestPlaces`, `togglePlaceBookmark` |
| Service 객체      | `[domain]Service`           | `placeService`                           |
| Constants 맵      | SCREAMING_SNAKE_CASE        | `PLACE_FOOD_TYPE_NAMES`                  |
| Constants getter  | `get` + 타입명 + `Name`     | `getPlaceFoodTypeCodeName`               |
| Endpoint 상수     | `ENDPOINT` (파일 상단)      | `const ENDPOINT = '/api/places'`         |

---

## 5. 데이터 흐름

```
UI 컴포넌트 / 페이지
        │
        ▼
[domain]Service          ← 응답 가공, 비즈니스 로직 (필요 시)
        │
        ▼
[domain]Repository       ← HTTP 호출 (api.get/post/put/delete)
        │
        ▼
@/lib/api (api client)
        │
        ▼
   Backend API
```

**원칙**:

- UI는 service가 있으면 service를, 없으면 repository를 직접 호출합니다.
- repository는 절대 service를 호출하지 않습니다 (단방향 의존).
- 코드 → 한국어 변환은 service에서 처리하여 UI 컴포넌트가 변환 책임을 갖지 않게 합니다.

---

## 6. Model vs DTO vs Types 차이

| 구분      | 형태                          | 용도                               | 예시                                     |
| --------- | ----------------------------- | ---------------------------------- | ---------------------------------------- |
| **Types** | Union 리터럴 (`type`)         | Backend enum 매핑, 프리미티브 타입 | `PlaceFoodType = 'KOREAN' \| 'JAPANESE'` |
| **Model** | 객체 인터페이스 (`interface`) | 도메인 내부에서 재사용되는 엔티티  | `PlaceBusinessHour { ... }`              |
| **DTO**   | 객체 인터페이스 (`interface`) | API 통신 (Request/Response/Query)  | `PlaceInfoResponse { ... }`              |

**판단 기준**:

- 문자열 코드의 집합이면 → **types**
- 여러 DTO에 중첩되거나 도메인 로직에서 다루는 객체면 → **model**
- API 요청/응답 형태 그 자체이면 → **dto**

**구체 예시**:

```typescript
// types: 'KOREAN' | 'JAPANESE' 같은 코드값 집합
type PlaceFoodType = 'KOREAN' | 'JAPANESE'

// model: 여러 Response에 중첩되는 객체
interface PlaceBusinessHour {
  dayType: string
  openTime: string
  closeTime: string
}

// dto: API 응답 1:1
interface PlaceInfoResponse {
  id: number
  businessHours: PlaceBusinessHour[] // ← model 재사용
  foodType: PlaceFoodType // ← types 재사용
}
```

---

## 7. 시나리오

### 시나리오 A: 신규 도메인 `coupon` 추가

요구사항 예시: 쿠폰 목록 조회, 쿠폰 발급, 쿠폰 상태(`ACTIVE` / `USED` / `EXPIRED`)는 한국어 라벨로 표시.

**1단계 — 폴더 및 빈 파일 생성**

```
src/domains/coupon/
├── index.ts
├── coupon.types.ts
├── coupon.constants.ts   (상태 라벨 변환이 필요하므로 생성)
├── coupon.dto.ts
├── coupon.repository.ts
└── coupon.service.ts     (상태 라벨 적용 로직이 필요하므로 생성)
```

> `coupon.model.ts`는 재사용 엔티티가 없으므로 생략.

**2단계 — `coupon.types.ts`**

```typescript
export type CouponStatus = 'ACTIVE' | 'USED' | 'EXPIRED'
```

**3단계 — `coupon.constants.ts`**

```typescript
import type { CouponStatus } from './coupon.types'

const COUPON_STATUS_NAMES: Record<CouponStatus, string> = {
  ACTIVE: '사용 가능',
  USED: '사용 완료',
  EXPIRED: '만료',
}

export const getCouponStatusName = (status: CouponStatus): string => {
  return COUPON_STATUS_NAMES[status] || status
}
```

**4단계 — `coupon.dto.ts`**

```typescript
import { PaginationParams } from '@/types/common'
import type { CouponStatus } from './coupon.types'

export interface CouponListItemResponse {
  id: number
  name: string
  status: CouponStatus
  expiredAt: string | null
}

export interface CouponIssueRequest {
  couponCode: string
}
```

**5단계 — `coupon.repository.ts`**

```typescript
import 'server-only'
import { api } from '@/lib/api'
import { PaginationParams } from '@/types/common'
import { CouponListItemResponse, CouponIssueRequest } from './coupon.dto'

const ENDPOINT = '/api/coupons'

export const couponRepository = {
  async getCoupons(params: PaginationParams) {
    return api.get<CouponListItemResponse[], PaginationParams>(`${ENDPOINT}/v1`, { params })
  },
  async issueCoupon(body: CouponIssueRequest) {
    return api.post<CouponListItemResponse>(`${ENDPOINT}/v1/issue`, body)
  },
}
```

**6단계 — `coupon.service.ts`**

```typescript
import 'server-only'
import { getCouponStatusName } from './coupon.constants'
import { couponRepository } from './coupon.repository'

export const couponService = {
  async getCoupons(params: Parameters<typeof couponRepository.getCoupons>[0]) {
    const response = await couponRepository.getCoupons(params)
    if (response.data) {
      response.data = response.data.map((item) => ({
        ...item,
        statusName: getCouponStatusName(item.status),
      }))
    }
    return response
  },
}
```

**7단계 — `index.ts`**

```typescript
// client-safe layer만 export
export * from './coupon.constants'
export * from './coupon.dto'
export * from './coupon.types'
// repository, service는 제외 — 명시 경로로 접근: '@/domains/coupon/coupon.repository'
```

---

### 시나리오 B: 기존 도메인에 API 엔드포인트 추가

요구사항 예시: place에 "맛집 주변 추천 장소" API 추가.

**1단계 — `place.dto.ts`에 Response 타입 추가**

```typescript
export interface PlaceNearbyListItemResponse {
  id: number
  name: string
  distance: number
  rating: number
}
```

**2단계 — `place.repository.ts`에 메서드 추가** (HTTP만)

```typescript
async getNearbyPlaces(placeId: number) {
  return api.get<PlaceNearbyListItemResponse[]>(`${ENDPOINT}/v1/${placeId}/nearby`)
}
```

**3단계 — 가공이 필요한가?**

- 응답에 코드 필드(`status`, `type` 등)가 있고 한국어 변환이 필요 → **service.ts에 메서드 추가**
- 단순 조회만 하면 됨 → **service 추가 없이 repository 직접 사용**

**판단 기준**:

> 응답에 사용자에게 보일 코드값이 있는가? → 있으면 service에서 변환.
> 여러 API를 조합해야 하는가? → 그러면 service에서 조합.
> 둘 다 아니면 → service 생략.

---

### 시나리오 C: 두 API를 조합하는 비즈니스 로직

요구사항 예시: 장소 상세 페이지에서 "info + menus + photos" 3개 API를 한 번에 가져오기.

**❌ 잘못된 방식**: repository에 조합 로직 추가

```typescript
// place.repository.ts — 이렇게 하지 마세요
async getPlaceFullInfo(placeId: number) {
  const info = await this.getPlaceInfo(placeId)
  const menus = await this.getPlaceMenus(placeId)
  // ...
}
```

→ repository는 HTTP 통신만 담당해야 합니다.

**✅ 올바른 방식**: service에 조합 메서드 추가

```typescript
// place.service.ts
import { placeRepository } from './place.repository'

export const placeService = {
  // ... 기존 메서드

  async getPlaceFullInfo(placeId: number) {
    const [info, menus, photos] = await Promise.all([
      placeRepository.getPlaceInfo(placeId),
      placeRepository.getPlaceMenus(placeId),
      placeRepository.getPlacePhotos(placeId),
    ])
    return { info, menus, photos }
  },
}
```

**컴포넌트에서 사용**:

```typescript
const { info, menus, photos } = await placeService.getPlaceFullInfo(placeId)
```

---

## 8. 지양해야 할 안티패턴

다음 패턴들은 현재 일부 도메인 코드에 남아 있으나, 신규 작업에서는 **지양**합니다.

### 8.1. self-import (`from '.'`)

```typescript
// ❌ 지양 — index를 거치는 self-import
import { PlaceFoodType } from '.'

// ✅ 권장 — 명시적 파일 경로
import type { PlaceFoodType } from './place.types'
```

> **이유**: barrel을 통한 self-import는 순환 참조 위험이 있고, IDE 자동완성·tree-shaking에 불리합니다.

### 8.2. cross-domain 내부 파일 직접 참조

```typescript
// ❌ 지양 — 다른 도메인 내부 파일 직접 참조
import { OrderMethodItem } from '../order/order.type'

// ✅ 권장 — 다른 도메인 index를 통해 참조
import { OrderMethodItem } from '../order'
```

> **이유**: 도메인의 캡슐화를 유지하고, 내부 구조 변경의 영향 범위를 줄입니다.

### 8.3. repository에 비즈니스 로직 작성 (금지)

```typescript
// ❌ 지양
async getActivePlaces() {
  const response = await api.get<PlaceListItemResponse[]>(`${ENDPOINT}/v1`)
  if (response.data) {
    response.data = response.data.filter(p => p.rating >= 4.0)  // ← 가공 로직 NO
  }
  return response
}
```

→ 이런 가공은 service.ts로 옮겨야 합니다.

### 8.4. service에서 직접 HTTP 호출 (금지)

```typescript
// ❌ 지양
import { api } from '@/lib/api'

export const placeService = {
  async getXxx() {
    return api.get(...)  // ← repository를 거쳐야 함
  },
}
```

### 8.5. DTO와 Model 혼용

- API 응답 형태인데 `Response` suffix 없이 model.ts에 정의 → ❌
- 도메인 내부에서만 쓰는 객체인데 dto.ts에 `Response` suffix로 정의 → ❌
- 판단이 어려우면 **6번 섹션의 판단 기준**을 다시 확인하세요.

### 8.6. client component에서 repository/service import (금지)

```typescript
// ❌ 금지 — client component에서 repository 직접 import
'use client'
import { placeRepository } from '@/domains/place/place.repository'

// ❌ 금지 — barrel export로도 repository 접근 불가 (index.ts에서 제외됨)
import { placeRepository } from '@/domains/place/place.repository'
```

> **이유**: `repository.ts`와 `service.ts`는 `import 'server-only'`를 포함합니다. client component에서 import 시 빌드 에러가 발생합니다.

```typescript
// ✅ client component에서 사용 가능한 것
import type { PlaceFoodType } from '@/domains/place/place.types'
import type { PlaceAmenity } from '@/domains/place/place.model'
import { getPlaceFoodTypeCodeName } from '@/domains/place/place.constants'
// 또는 barrel을 통해
import type { PlaceFoodType, PlaceAmenity } from '@/domains/place'
import { getPlaceFoodTypeCodeName } from '@/domains/place'
```

---

## 9. 자가 검증 체크리스트

신규 도메인 추가 또는 기존 도메인 수정 시, 작업 종료 전에 아래 항목을 확인하세요.

### 파일 구성

- [ ] 필수 파일(`index.ts`, `types.ts`, `dto.ts`, `repository.ts`)이 모두 존재하는가?
- [ ] 조건부 파일(`constants.ts`, `model.ts`, `service.ts`)을 생성한 경우, 그 파일에 들어갈 실질적인 내용이 있는가? (빈 파일이면 생략)
- [ ] `index.ts`가 client-safe layer(`types`, `constants`, `model`, `dto`)만 `export *`로 재내보내는가?
- [ ] `index.ts`에 `repository`, `service` export가 **없는가**?

### 의존성

- [ ] `repository.ts` 첫 줄이 `import 'server-only'`인가?
- [ ] `service.ts`가 존재한다면 첫 줄이 `import 'server-only'`인가?
- [ ] `repository.ts`에 비즈니스 로직(map/filter/조합 등)이 없는가?
- [ ] `service.ts`에서 `api.get(...)` 같은 직접 호출이 없는가?
- [ ] self-import (`from '.'`) 대신 명시적 경로(`./[domain].types`)를 사용했는가?
- [ ] 다른 도메인 참조 시 내부 파일이 아닌 폴더 index 경로(`../[other-domain]`)를 사용했는가?

### 명명

- [ ] 파일명이 `[domain].[layer].ts` 패턴을 따르는가?
- [ ] Union 타입에 `Type` 또는 `Code` suffix를 붙였는가?
- [ ] DTO에 `Response` / `Query` / `Request` suffix를 붙였는가?
- [ ] repository 메서드명이 HTTP 동사 + 리소스 형태인가?

### 책임 분리

- [ ] 코드 → 한국어 변환은 service.ts에서만 수행하는가?
- [ ] 여러 API 조합은 service.ts의 `Promise.all`로 처리하는가?
- [ ] DTO에 함수, 비즈니스 로직이 섞여 있지 않은가?

### 타입 안정성

- [ ] DTO에서 null 가능 필드에 `| null`을 명시했는가?
- [ ] `Record<T, string>` 매핑에 모든 enum 값이 포함되었는가? (TypeScript가 강제)

---

## 10. 빠른 참조 (Quick Reference)

> **Best Practice 레퍼런스**: [`src/domains/place/`](./place/)
>
> 새 도메인을 만들거나 기존 도메인을 손볼 때는 항상 place의 7개 파일을 참고하세요.

**핵심 한 줄 요약**:

- `types.ts` = 코드 집합 / `model.ts` = 재사용 객체 / `dto.ts` = API 통신용 객체
- `repository.ts` = `import 'server-only'` + HTTP만 / `service.ts` = `import 'server-only'` + 가공·조합 / `constants.ts` = 코드↔라벨
- `index.ts` = client-safe layer만 barrel export (`types`, `constants`, `model`, `dto`만, repository/service 제외)
- 의존 방향은 항상 단방향 / client component는 명시 경로(`@/domains/place/place.constants`)로 import
