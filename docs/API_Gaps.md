# Mobile API Gaps vs Backend (linksports_server)

## Existing Endpoints (from routes/controllers)
- POST `/api/v1/auth/register`
- POST `/api/v1/auth/login` (expects `{ login, password }`, returns `{ token, user }`)
- POST `/api/v1/auth/verify_email`
- POST `/api/v1/auth/resend_email_code`
- POST `/api/v1/auth/logout`
- GET `/api/v1/auth/me`

- GET `/api/v1/profiles/me`
- GET `/api/v1/profiles/:id`
- PATCH `/api/v1/profiles/:id`
- PATCH `/api/v1/profiles/:id/complete_setup`
- POST `/api/v1/profiles/:id/upload_image` (expects `profile_image`)
- GET `/api/v1/profiles/search` (supports `q`, `location`, `sport_id`, `user_type`, `offset`)

- GET `/api/v1/sports`
- GET `/api/v1/sports/:id`
- GET `/api/v1/sports/categories`

## Gaps for Mobile MVP
- Feed/Posts
  - Needed: `GET /api/v1/posts` (with pagination), `POST /api/v1/posts` (text + image + link), `POST /api/v1/posts/:id/like`, `DELETE /api/v1/posts/:id/unlike`
  - Current: Only server-side HTML `resources :posts, only: [:create]` outside API; no JSON posts controller under `api/v1`.

- Connections/Discovery
  - Needed: `GET /api/v1/connections`, `GET /api/v1/connections/requests`, `POST /api/v1/connections`, `PATCH /api/v1/connections/:id` (accept/reject), `DELETE /api/v1/connections/:id`.
  - Current: Not present in API namespace.

- Messages
  - Needed (phase 1.5): `GET /api/v1/messages`, `GET /api/v1/messages/conversations`, `POST /api/v1/messages`.
  - Current: Not present.

- Events
  - Optional MVP: `GET /api/v1/events` (+ show, register/unregister)
  - Current: Not present.

- Uploads
  - Profile image supported at `/profiles/:id/upload_image`.
  - Needed for posts media: `POST /api/v1/posts/:id/upload_media` or include multipart on create.

- Pagination conventions
  - Profiles search uses `offset` and implicit `limit` 20. Recommend `page` + `per_page` for consistency across lists.

## Recommendations
- Introduce `Api::V1::PostsController` with CRUD subset and likes.
- Add `Api::V1::ConnectionsController` for basic networking.
- Define pagination standard across endpoints.
- Consider `GET /api/v1/feed` to aggregate posts from user + connections.
- Standardize error schema as `{ success: false, error: { code, message, details } }` already used.

