import { db } from '../../../public/firebase';

export default async(req, res)=>{
  const { id } = req.query;
  const data = (await db.collection("order").doc(id).get()).data()
  res.status(200).json({data})
}