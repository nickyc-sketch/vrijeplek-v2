exports.requireUser = (context) => {
  const u = context.clientContext && context.clientContext.user;
  if (!u) return null;
  return { sub: u.sub, email: u.email };
};
exports.json = (code, obj) => ({ statusCode: code, headers:{ "content-type":"application/json" }, body: JSON.stringify(obj) });
