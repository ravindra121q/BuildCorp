export const setCache = (req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=86400');
  }
  next();
};
