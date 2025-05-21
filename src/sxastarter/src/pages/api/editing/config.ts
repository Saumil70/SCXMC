import type { NextApiRequest, NextApiResponse } from 'next';
import { EditingConfigMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { components } from 'temp/componentBuilder';
import metadata from 'temp/metadata.json';

const middleware = new EditingConfigMiddleware({
  components,
  metadata,
}).getHandler();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://pages.sitecorecloud.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  return middleware(req, res);
}
