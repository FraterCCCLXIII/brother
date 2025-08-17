import candidates from './routes/candidates'
import likes from './routes/likes'
import matches from './routes/matches'
import messages from './routes/messages'

export interface Env {
  DB: D1Database
  IMAGES: R2Bucket
  CORS_ORIGIN: string
}

function cors(res: Response, origin: string) {
  const h = new Headers(res.headers)
  h.set('Access-Control-Allow-Origin', origin)
  h.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  h.set('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  return new Response(res.body, { ...res, headers: h })
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS') {
      return cors(new Response(null, { status: 204 }), env.CORS_ORIGIN)
    }
    const url = new URL(req.url)
    try {
      if (url.pathname === '/health') return cors(new Response('ok'), env.CORS_ORIGIN)
      if (url.pathname === '/candidates' && req.method === 'GET') return cors(await candidates(req, env), env.CORS_ORIGIN)
      if (url.pathname === '/like' && req.method === 'POST') return cors(await likes.like(req, env), env.CORS_ORIGIN)
      if (url.pathname === '/pass' && req.method === 'POST') return cors(await likes.pass(req, env), env.CORS_ORIGIN)
      if (url.pathname === '/matches' && req.method === 'GET') return cors(await matches.list(req, env), env.CORS_ORIGIN)
      if (url.pathname === '/messages' && req.method === 'GET') return cors(await messages.list(req, env), env.CORS_ORIGIN)
      if (url.pathname === '/messages' && req.method === 'POST') return cors(await messages.send(req, env), env.CORS_ORIGIN)
      return cors(new Response('Not found', { status: 404 }), env.CORS_ORIGIN)
    } catch (e: any) {
      return cors(new Response(JSON.stringify({ error: e?.message || 'server error' }), { status: 500 }), env.CORS_ORIGIN)
    }
  }
}
