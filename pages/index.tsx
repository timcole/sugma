import { useIdentity } from 'components/identity';
import { Section } from 'components/section';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  const me = useIdentity();

  return (
    <Section>
      <h2>Привет</h2>
      <pre>{JSON.stringify(me, null, 2)}</pre>
    </Section>
  );
};

export default HomePage;
