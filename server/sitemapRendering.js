import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import winston from 'winston';
import api from './api';

const SITEMAP_EXCLUDE_PATH = [
  '/',
  '/checkout',
  '/checkout-success',
  '/account',
  '/cart',
  '/index',
  '/logout',
  '/index',
  '/customer-account',
  '/contacts',
  '/documents',
];

const sitemapRendering = (req, res) => {
  Promise.all([api.sitemap.getSitemap(), api.settings.getSettings()]).then(
    async ([sitemapResponse, settingsResponse]) => {
      const sitemapArray = sitemapResponse.data;
      console.log(sitemapArray);
      const settings = settingsResponse.data;
      const hostname =
        settings.domain && settings.domain.length > 0
          ? settings.domain
          : `${req.protocol}://${req.hostname}`;

      const urls = sitemapArray
        .filter(
          item =>
            item.type !== 'reserved' &&
            item.type !== 'search' &&
            !SITEMAP_EXCLUDE_PATH.includes(item.path),
        )
        .map(item => item.path);

      const stream = new SitemapStream({ hostname, urls });

      const sitemap = await streamToPromise(Readable.from(urls).pipe(stream));
      res.header('Content-Type', 'application/xml');
      res.send(sitemap.toString());
    },
  );
};

export default sitemapRendering;
