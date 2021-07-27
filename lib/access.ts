import { decode, verify } from 'jsonwebtoken';
import jwkToPem, { JWK } from 'jwk-to-pem';
import { AccessPayload } from 'types/access';
import { Identity } from 'types/identity';

type AccessCerts = {
  keys: JWK[] | (JWK & { kid: string })[];
};

export async function AccessMiddleware(
  host: string,
  auth: string,
): Promise<AccessPayload> {
  if (!auth) return Promise.reject({ error: 'unauthorized' });
  const access = await isValidJwt(host, auth);
  if (!access) return Promise.reject({ error: 'unauthorized' });

  return Promise.resolve(access as AccessPayload);
}

const cacheCerts: { lastUpdated: Date; certs: AccessCerts } = {
  lastUpdated: null,
  certs: null,
};

async function isValidJwt(
  host: string,
  token: string,
): Promise<boolean | AccessPayload> {
  if (
    !cacheCerts.certs ||
    new Date().getTime() - cacheCerts.lastUpdated.getTime() >= 3600000
  ) {
    cacheCerts.lastUpdated = new Date();
    cacheCerts.certs = await fetch(`https://${host}/cdn-cgi/access/certs`).then(
      (data) => data.json(),
    );
  }

  const decoded = decode(token, { complete: true });
  const key = cacheCerts.certs?.keys?.filter(
    ({ kid }: { kid: string }) => kid === decoded.header.kid,
  );
  const pem = key.length ? jwkToPem(key[0]) : '';

  try {
    return verify(token, pem, {
      algorithms: ['RS256'],
      audience: process.env.ACCESS_AUD,
    }) as AccessPayload;
  } catch (err) {
    return false;
  }
}

export const getIdentity = async (
  host: string,
  auth: string,
): Promise<Identity> =>
  await fetch(`https://${host}/cdn-cgi/access/get-identity`, {
    headers: {
      Cookie: `CF_Authorization=${auth}`,
    },
  }).then((data) => data.json());
