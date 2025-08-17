import { Env } from '../index'

export default {
  async list(req: Request, env: Env) {
    const me = new URL(req.url).searchParams.get('me') || 'me'
    const { results } = await env.DB.prepare(
      'SELECT * FROM matches WHERE a = ?1 OR b = ?1 ORDER BY created_at DESC'
    ).bind(me).all()
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } })
  }
}
