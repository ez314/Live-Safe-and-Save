import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../util/Firebase';

export async function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const data = JSON.parse(body);
  try {
    let doc = await db.doc(`account/${data.email}`).get();
    if (doc.exists) {
      return res.status(201).json({});
    } else {
      const newData = {
        first_name: data.first_name,
        last_name: data.first_name,
        password: data.password,
        phone: data.email,
      };
      await db
        .doc(`account/${data.email}`)
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

export default async function handleRegistrationRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return handleRegister(req, res);
  } else {
    return;
  }
}
