import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', (c) => c.json({ ok: true }))

// 배포 시 web 빌드 결과가 ./public에 들어간다. 개발 중엔 Vite가 화면을 맡는다.
app.use('/*', serveStatic({ root: './public' }))
app.get('*', serveStatic({ path: './public/index.html' }))

const port = Number(process.env.PORT ?? 3001)
serve({ fetch: app.fetch, port }, (info) => console.log(`server on :${info.port}`))
