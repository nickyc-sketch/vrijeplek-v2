import { getClient, json } from './_lib/db.js';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'method' });
  const { email, password, full_name } = JSON.parse(event.body || '{}');
  if (!email || !password) return json(400, { error: 'missing' });

  const supa = getClient();
  const { data, error } = await supa.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: full_name || null },
      emailRedirectTo: `${new URL(event.rawUrl).origin}/bevestigen.html`,
    },
  });
  if (error) return json(400, { error: error.message });
  return json(200, { user: data.user });
};
