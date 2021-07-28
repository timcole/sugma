import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { AccessMiddleware, getIdentity } from 'lib/access';
import prisma from 'lib/db';
import { useCallback, useEffect, useState } from 'react';
import { useIdentity } from 'components/identity';
import Links from 'components/links';

const Admin: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> =
  ({ links: ssrLinks, identity }) => {
    const [links, setLinks] = useState(ssrLinks);
    const { setIdentity, events } = useIdentity();

    const addLink = useCallback(
      (link) => {
        setLinks((oldLinks) => [...oldLinks, link]);
        events.once('newLink', (link) => addLink(link));
      },
      [links],
    );

    useEffect(() => {
      setIdentity(identity);
      events.once('newLink', (link) => addLink(link));
    }, []);

    return (
      <>
        <Links links={links} />
      </>
    );
  };

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  if (
    !(await AccessMiddleware(
      ctx.req.headers.host,
      ctx.req.cookies.CF_Authorization,
    ).catch(() => null))
  )
    return {
      redirect: { permanent: false, destination: '/cdn-cgi/access/logout' },
    };

  const [identity, links] = await Promise.all([
    getIdentity(ctx.req.headers.host, ctx.req.cookies.CF_Authorization),
    prisma.link.findMany({
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
    }),
  ]);

  return {
    props: { identity, links },
  };
};

export default Admin;
