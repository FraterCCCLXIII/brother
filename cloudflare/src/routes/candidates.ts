import { Env } from '../index'

export default async function candidates(req: Request, env: Env) {
  // TODO: use auth user id; for now hardcode or pass ?me=uid
  const { searchParams } = new URL(req.url)
  const me = searchParams.get('me') || 'me'

  // return profiles not yet swiped by me
  const sql = `
    SELECT p.*
    FROM profiles p
    LEFT JOIN swipes s ON s.swiper = ?1 AND s.target = p.id
    WHERE p.id <> ?1 AND s.target IS NULL
    LIMIT 25
  `
  const { results } = await env.DB.prepare(sql).bind(me).all()
  return new Response(JSON.stringify(results), { headers: { 'Content-Type': 'application/json' } })
}
