const { getDb } = require("./_common/db");
const { requireUser, json } = require("./_common/auth");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") return json(405, { error: "method" });
  const user = requireUser(context);
  if (!user) return json(401, { error: "auth" });

  const body = JSON.parse(event.body || "{}");
  const { name, vat, category, address, email, phone, intro, logo_url } = body;
  if (!name || !vat || !category || !address || !email) return json(400, { error: "missing" });

  const db = await getDb();
  const doc = {
    owner_sub: user.sub,
    name, vat, category, address, email,
    phone: phone || "", intro: intro || "",
    logo_url: logo_url || "",
    views_total: 0, reviews_count: 0, rating_sum: 0,
    status: "active",
    created_at: new Date()
  };
  const r = await db.collection("businesses").insertOne(doc);
  return json(200, { ok: true, id: r.insertedId.toString() });
};
