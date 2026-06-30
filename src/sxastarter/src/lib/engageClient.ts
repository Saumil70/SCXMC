// lib/engageClient.ts
import { init } from '@sitecore/engage';

interface EngageInstance {
  pageView: (data: unknown) => Promise<unknown>;
  event: (name: string, data: unknown) => Promise<unknown>;
  identity: (data: unknown) => Promise<unknown>;
}

let engage: EngageInstance | null = null;

const loadEngage = async () => {
  if (engage) return engage; // ✅ Reuse existing instance

  engage = await init({
    clientKey: '4ba1946e5e3efd6b2a03ce30ebb03ca5',
    targetURL: 'https://api-engage-us.sitecorecloud.io',
    pointOfSale: 'demo',
    cookieDomain: 'localhost',
    cookieExpiryDays: 365,
    forceServerCookieMode: false,
    includeUTMParameters: true,
    webPersonalization: true,
  });

  return engage;
};

export { loadEngage };
