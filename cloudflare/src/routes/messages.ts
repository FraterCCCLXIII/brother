import { Env } from '../index'

export default {
  async list(req: Request, env: Env) {
    const url = new URL(req.url)
    const matchId = url.searchParams.get('matchId')
    if (!matchId) throw new Error('matchId required')
    const { results } = await env.DB.prepare(
      'SELECT id, match_id, sender, body, created_at FROM messages WHERE match_id = ?1 ORDER BY id DESC LIMIT 50'
    ).bind(matchId).all()
    return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } })
  },
  async send(req: Request, env: Env) {
    const { matchId, sender = 'me', body } = await req.json()
    if (!matchId || !body) throw new Error('matchId and body required')
    await env.DB.prepare('INSERT INTO messages(match_id, sender, body) VALUES(?1,?2,?3)')
      .bind(matchId, sender, body).run()
    const row = await env.DB.prepare('SELECT last_insert_rowid() as id').first()
    return new Response(JSON.stringify({
      id: row?.id, matchId, sender, body, created_at: Math.floor(Date.now()/1000)
    }), { headers: { 'Content-Type': 'application/json' } })
  }
}
