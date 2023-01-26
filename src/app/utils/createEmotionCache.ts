// eslint-disable-next-line import/no-extraneous-dependencies
import createCache from '@emotion/cache';

const createEmotionCache = () => createCache({ key: 'css', prepend: true });

export default createEmotionCache;
