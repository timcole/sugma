import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { Section } from 'components/section';
import prisma from 'lib/db';
import { AccessMiddleware } from 'lib/access';

const Redirect: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ link, headers }) => {
  return (
    <Section>
      Redirecting...
      <pre>{JSON.stringify(link, null, 2)}</pre>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
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
  const link = await prisma.link.findUnique({
    where: { slug: slug as string },
    select: { id: true, destination: true, permanent: true },
  });
  if (!link) return { notFound: true };

  const user = await AccessMiddleware(host, cookies.CF_Authorization).catch(
    () => null,
  );
  await prisma.click
    .create({
      data: {
        referer,
        // Don't log IP if they're not logged in and DNT header
        ip: !user && dnt === '1' ? '' : (ip as string),
        country: country as string,
        linkId: link.id,
        userId: user?.sub,
      },
    })
    .then(console.log)
    .catch(console.error);

  return { props: { link } };
};

export default Redirect;
