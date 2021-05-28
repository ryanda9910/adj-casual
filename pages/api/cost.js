export default async (req, res) => {
  const newBody = Object.keys(req.body).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(req.body[key]);
  }).join('&')
  const postCost = await fetch("https://api.rajaongkir.com/starter/cost/", {
    method: "POST",
    headers: {
      key: process.env.NEXT_PUBLIC_ENV_LOCAL_KEY_EXPEDITION,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:newBody
  });
  const dataCost = await postCost.json();
  res.status(200).json({ dataCost });
};
