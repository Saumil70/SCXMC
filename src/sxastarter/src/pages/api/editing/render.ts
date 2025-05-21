import type { NextApiRequest, NextApiResponse } from 'next';
import { EditingRenderMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/editing';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '2mb',
    },
    responseLimit: false,
  },
};

const middleware = new EditingRenderMiddleware().getHandler();

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
