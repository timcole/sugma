import { AccessMiddleware, getIdentity } from 'lib/access';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/db';

async function Me(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'method_not_allowed' });

  if (
    !(await AccessMiddleware(
      req.headers.host,
      req.cookies.CF_Authorization,
    ).catch((err) => res.status(401).json(err)))
  )
    return;

  const me = await getIdentity(req.headers.host, req.cookies.CF_Authorization);
  const dbUser = { id: me.user_uuid, email: me.email, name: me.name };

  if (me.id)
    await prisma.user.upsert({
      where: { id: me.user_uuid },
      update: dbUser,
      create: dbUser,
    });

  res.status(200).json(me);
}

export default Me;
