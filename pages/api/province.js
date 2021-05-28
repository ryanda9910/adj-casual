export default async(req,res) => {
  const getprovinceData = await fetch(
    "https://api.rajaongkir.com/starter/province",
    {
      headers: {
        key: process.env.NEXT_PUBLIC_ENV_LOCAL_KEY_EXPEDITION,
      },
    }
  );
  const dataProvince = await getprovinceData.json();
  res.status(200).json({dataProvince})
}