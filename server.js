import cacheableResponse from 'cacheable-response';
import express from 'express'
import next from 'next';
import logger from './src/libs/logger';
import config from './config';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import robotsRendering from './server/robotsRendering';
import sitemapRendering from './server/sitemapRendering';
import router from './server/routes';

const port = parseInt(config.port) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handle = app.getRequestHandler()

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res }) => {
    const rawResEnd = res.end
    const data = await new Promise((resolve) => {
      res.end = (payload) => {
        resolve(res.statusCode === 200 && payload)
      }
      app.render(req, res, req.path, {
        ...req.query,
        ...req.params,
      })
    })
    res.end = rawResEnd
    return { data }
  },
  send: ({ data, res }) => res.send(data),
})

const httpsOptions = {
  key: fs.readFileSync('./localhost.crt'),
  cert: fs.readFileSync('./localhost.key')
};

app.prepare().then(() => {
  const server = express()
  server.use(cors())

  // server.get('/', (req, res) => ssrCache({ req, res }))

  server.get('/robots.txt', robotsRendering);
  server.get('/sitemap.xml', sitemapRendering);

  server.get('*', (req, res) => handle(req, res))

  server.use(logger.sendResponse)
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})