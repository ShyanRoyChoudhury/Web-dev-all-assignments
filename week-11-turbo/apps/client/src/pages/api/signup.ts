// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Admin } from "db";
import jwt from 'jsonwebtoken';
import { ensuredbConnected } from '@/lib/dbConnect';
type Data = {
  token?: string,
  message?: string
}
const SECRET = 's3cr3T';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    await ensuredbConnected();
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
    } else {
        const obj = { username: username, password: password };
        const newAdmin = new Admin(obj);
        newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    }
}
