import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../util/Firebase';

export async function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const data = JSON.parse(body);
  try {
    let doc = await db.doc(`users/${data.email}`).get();
    if (doc.exists) {
      return res.status(201).json({});
    } else {
      const newData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
      await db
        .doc(`users/${data.email}`)
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
