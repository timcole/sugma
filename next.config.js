const { readFile } = require('fs/promises');
const { join } = require('path');

module.exports = {
  image: {
    domains: ['www.gravatar.com'],
  },
  redirects: () => [
    {
      source: '/',
      destination: '/admin',
      permanent: true,
    },
  ],
  generateBuildId: async () => {
    const head = (
      await readFile(join(__dirname, '.git', 'HEAD'), 'utf8')
    ).trim();
    let refIndex = head.indexOf('ref:');
    if (refIndex === -1) refIndex = 0;
    const endIndex = head.indexOf('\n', refIndex + 4) + 1;
    const ref = head.slice(refIndex + 4, endIndex || undefined).trim();
    if (ref) id = (await readFile(join(__dirname, '.git', ref), 'utf8')).trim();
    return id;
  },
};
