// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db } from '../../public/firebase';

export default async(req,res) => {
  const entries = await db.collection('product').get();
  const data = entries.docs.map(entry => ({
    id: entry.id,
    ...entry.data()
  }));
  res.status(200).json({data})
}
