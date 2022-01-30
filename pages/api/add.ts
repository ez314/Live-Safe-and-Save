import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../util/Firebase';

export async function handleAdd(req: NextApiRequest, res: NextApiResponse) {
  console.log('TEST');
  const { body } = req;
  const data = JSON.parse(body);
  try {
    let doc = await db
      .doc(`assets/${data.owner}_${data.type}_${data.assetName}`)
      .get();
    if (doc.exists) {
      return res.status(201).json({});
    } else {
      const newData = {
        assetName: data.name,
        img: data.imgUrl,
        invoice: data.invoiceUrl,
        lastUpdated: data.lastUpdated,
        owner: data.owner,
        type: data.type,
      };
      await db
        .doc(`assets/${data.owner}_${data.type}_${data.assetName}`)
        .create({
          ...newData,
        })
        .then();
      return res.status(200).json({ data: newData });
    }
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export default async function handleAddRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('TES');
  if (req.method === 'POST') {
    return handleAdd(req, res);
  } else {
    return;
  }
}
