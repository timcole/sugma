import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { Section } from 'components/section';
import prisma from 'lib/db';
import { AccessMiddleware } from 'lib/access';
import styled from 'styled-components';

const Redirect: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ link }) => {
  return (
    <Section>
      <RedirectLink href={link.destination}>
        Redirecting to <b>{new URL(link.destination).host}</b>...
      </RedirectLink>
    </Section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { slug },
  req: {
    cookies,
    headers: {
      host,
      referer,
      'cf-connecting-ip': ip,
      'cf-ipcountry': country,
      dnt,
    },
  },
}) => {
  const [link, user] = await Promise.all([
    prisma.link.findUnique({
      where: { slug: slug as string },
      select: { id: true, destination: true, permanent: true },
    }),
    AccessMiddleware(host, cookies.CF_Authorization).catch(() => null),
  ]);
  if (!link) return { notFound: true };

  await prisma.click.create({
    data: {
      referer,
      // Don't log IP if they're not logged in and DNT header
      ip: !user && dnt === '1' ? '' : (ip as string),
      country: country as string,
      linkId: link.id,
      userId: user?.sub,
    },
  });

  return {
    props: { link },
    redirect: { destination: link.destination, permanent: link.permanent },
  };
};

export default Redirect;

const RedirectLink = styled.a`
  text-decoration: none;
  color: inherit;
`;
