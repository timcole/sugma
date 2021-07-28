import { AccessMiddleware } from 'lib/access';
import { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import prisma from 'lib/db';

async function Create(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'method_not_allowed' });

  const auth = await AccessMiddleware(
    req.headers.host,
    req.cookies.CF_Authorization,
  ).catch((err) => res.status(401).json(err));
  if (!auth) return;

  let { slug, destination, permanent } = req.body;
  if (!destination)
    return res.status(400).json({ field: 'destination', error: 'missing' });
  destination = destination.startsWith('http')
    ? destination
    : `https://${destination}`;

  try {
    new URL(destination);
  } catch (e) {
    return res.status(400).json({
      field: 'destination',
      error: e.code.toLowerCase().replace('err_', ''),
    });
  }

  try {
    const link = await prisma.link.create({
      data: {
        slug: slug ? slug : nanoid(11),
        destination,
        permanent,
        authorId: auth.sub,
      },
      select: {
        id: true,
        destination: true,
        slug: true,
        permanent: true,
        author: { select: { name: true, email: true } },
        _count: {
          select: { clicks: true },
        },
      },
    });

    res.status(200).json(link);
  } catch (e) {
    res.status(500).json({ error: 'database_error' });
  }
}

export default Create;
