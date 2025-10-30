import { getClient, json } from './_lib/db.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'method' });
  let payload; try { payload = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'invalid_json' }); }
  const { email, password, full_name } = payload;
  if (!email || !password) return json(400, { error: 'missing_email_or_password' });

  // Hardcode naar de productie-URL zodat de mail altijd juist is
  const redirect = `https://www.vrijeplek.be/bevestigen.html`;

  const supa = getClient();
  const { data, error } = await supa.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: full_name || null },
      emailRedirectTo: redirect,
    },
  });

  if (error) return json(400, { error: error.message });
  return json(200, { ok: true });
};
