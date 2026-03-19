# 코드 컨벤션

## 타입 네이밍 규칙

### Response 접미사 사용 기준

타입 이름에 `Response` 접미사를 붙일지 여부는 **타입의 사용 목적과 범위**에 따라 결정합니다.

#### ✅ Response를 붙이는 경우

**API 엔드포인트의 응답 데이터와 직접 매핑되는 타입**일 때 사용합니다.

**특징:**

- API 스펙과 1:1 대응
- `ApiResponse<T>`의 `data` 필드 타입으로 사용
- 특정 엔드포인트 전용 타입
- Request/Response 쌍이 명확한 경우

**예시:**

```typescript
// API: GET /api/places/{id}/summary
export type PlaceSummaryResponse = {
  id: number
  name: string
  roadAddress: string
  lotAddress: string
  rating: number
}

// API: POST /api/places/{id}/bookmark
export type PlaceBookmarkResponse = {
  bookmarked: boolean
}

// Request/Response 쌍
export type CommentCreateRequest = {
  content: string
}

export type CommentCreateResponse = {
  id: number
  reviewId: number
  // ...
}
```

#### ❌ Response를 붙이지 않는 경우

**도메인 모델이나 재사용 가능한 비즈니스 로직 타입**일 때 사용합니다.

**특징:**

- 여러 API에서 공통으로 사용
- 컴포넌트 props, 상태 관리 등에서도 활용
- 도메인 엔티티나 비즈니스 모델
- `ListItem`, `Detail` 등의 접미사로 용도 명시

**예시:**

```typescript
// 여러 목록 API에서 공통 사용
export type PlaceListItem = {
  id: number
  name: string
  stationName: string
  rating: number
  reviewCount: number
  // ...
}

// 도메인 모델
export type ReviewDetail = {
  id: number
  placeId: number
  content: string
  totalRating: number
  // ...
}

// 컴포넌트에서도 사용되는 타입
export type MemberProfile = {
  id: number
  userName: string
  userProfileImage: string | null
  // ...
}
```

### 판단 기준 체크리스트

다음 질문에 답하여 타입 네이밍을 결정하세요:

1. **이 타입이 특정 API 엔드포인트의 응답 구조와 직접 대응하나요?**
   - ✅ 예 → `Response` 접미사 사용
   - ❌ 아니오 → 다음 질문으로

2. **이 타입이 여러 곳(다른 API, 컴포넌트, 상태 관리)에서 재사용되나요?**
   - ✅ 예 → `Response` 접미사 없이 사용
   - ❌ 아니오 → 다음 질문으로

3. **이 타입이 도메인 엔티티나 비즈니스 모델을 표현하나요?**
   - ✅ 예 → `Response` 접미사 없이 사용
   - ❌ 아니오 → `Response` 접미사 사용 고려

### 네이밍 패턴 요약

| 타입 용도           | 네이밍 패턴                        | 예시                                            |
| ------------------- | ---------------------------------- | ----------------------------------------------- |
| API 응답 전용       | `{Entity}{Action}Response`         | `PlaceSummaryResponse`, `ReviewLikeResponse`    |
| Request/Response 쌍 | `{Entity}{Action}Request/Response` | `CommentCreateRequest`, `CommentCreateResponse` |
| 도메인 모델         | `{Entity}` 또는 `{Entity}{Detail}` | `Place`, `ReviewDetail`                         |
| 목록 아이템         | `{Entity}ListItem`                 | `PlaceListItem`, `PlaceBestListItem`            |
| 통계/집계 데이터    | `{Entity}{Type}`                   | `PlaceReviewStatistics`                         |

### 실제 코드 예시

**올바른 사용 예시:**

```typescript
// ✅ API 응답 전용 - Response 접미사 사용
export type PlaceSummaryResponse = { ... }
export type PlaceBookmarkResponse = { ... }

// ✅ 도메인 모델 - Response 접미사 없음
export type PlaceListItem = { ... }
export type ReviewDetail = { ... }

// ✅ Request/Response 쌍 - 둘 다 명시
export type CommentCreateRequest = { ... }
export type CommentCreateResponse = { ... }
```

**주의해야 할 경우:**

```typescript
// ⚠️ 여러 API에서 사용되는 경우 - Response 제거 고려
// 만약 PlaceReviewListItem이 여러 엔드포인트에서 사용된다면
export type PlaceReviewListItem = { ... }  // Response 없이

// ⚠️ 단일 엔드포인트 전용이라면
export type PlaceReviewListItemResponse = { ... }  // Response 포함
```

### 일관성 유지 원칙

1. **같은 패턴의 타입은 일관되게 네이밍**
   - 모든 API 응답 타입에 `Response` 접미사 사용
   - 모든 도메인 모델은 접미사 없이 사용

2. **팀 내 합의된 규칙 준수**
   - 새로운 타입 추가 시 기존 패턴 확인
   - 예외가 필요한 경우 팀과 논의 후 결정

3. **명확성 우선**
   - 타입 이름만 봐도 용도를 알 수 있어야 함
   - 모호한 경우 주석으로 용도 명시
