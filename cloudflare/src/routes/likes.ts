import { Env } from '../index'

// Simple UID generator (replace with nanoid later if needed)
const uid = () => Math.random().toString(36).slice(2, 10)

async function ensureMatch(swiper: string, target: string, env: Env) {
  const mutual = await env.DB.prepare(
    'SELECT 1 FROM swipes WHERE swiper = ?1 AND target = ?2 AND decision = 1'
  ).bind(target, swiper).first()
  if (mutual) {
    const [a, b] = [swiper, target].sort()
    const id = 'm_' + uid()
    await env.DB.prepare('INSERT OR IGNORE INTO matches(id,a,b) VALUES(?1,?2,?3)').bind(id, a, b).run()
    return { id, a, b }
  }
  return null
}

export default {
  async like(req: Request, env: Env) {
    const { swiper = 'me', target } = await req.json()
    if (!target) throw new Error('target required')
    await env.DB.prepare('INSERT OR REPLACE INTO swipes(swiper,target,decision) VALUES(?1,?2,1)')
      .bind(swiper, target).run()
    const matched = await ensureMatch(swiper, target, env)
    return new Response(JSON.stringify({ matched }), { headers: { 'Content-Type': 'application/json' } })
  },
  async pass(req: Request, env: Env) {
    const { swiper = 'me', target } = await req.json()
    if (!target) throw new Error('target required')
    await env.DB.prepare('INSERT OR REPLACE INTO swipes(swiper,target,decision) VALUES(?1,?2,0)')
      .bind(swiper, target).run()
    return new Response('{}', { headers: { 'Content-Type': 'application/json' } })
  }
}
