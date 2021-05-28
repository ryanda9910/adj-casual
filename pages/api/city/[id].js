export default async(req,res) => {
  const {id}=req.query
  const getcityData = await fetch(
    `https://api.rajaongkir.com/starter/city?province=${id}`,
    {
      headers: {
        key: process.env.NEXT_PUBLIC_ENV_LOCAL_KEY_EXPEDITION,
      },
    }
  );
  const dataCity = await getcityData.json();
  res.status(200).json({dataCity});
}