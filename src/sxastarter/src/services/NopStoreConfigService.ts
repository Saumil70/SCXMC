// External packages
import https from 'https';

import axios from 'axios';

import { SecureHost } from 'src/lib/setting';

// Type definitions
type SitecoreItemResponse = {
  [key: string]: any;
};

type NopStoreConfig = {
  COMMERCE_BASE_URL: string;
  API_KEY: string;
};

const SSC_URL = `${SecureHost}/sitecore/api/ssc/item/%7B186A3175-B991-45FE-AE7F-7764DEBC1925%7D?sc_apikey=6071D444-23D9-4574-A310-D39802B02436`;

const fetchNopStoreConfig = async (): Promise<NopStoreConfig | null> => {
  try {
    const res = await axios.get<SitecoreItemResponse>(SSC_URL, {
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),

      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status !== 200) {
      throw new Error(`Sitecore SSC fetch failed: ${res.status}`);
    }
    const data = res.data;
    console.log('Data:', data);

    // Extract only the required fields
    return {
      COMMERCE_BASE_URL: data.COMMERCE_BASE_URL || '',
      API_KEY: data.API_KEY || '',
    };
  } catch (error) {
    console.error('Error fetching Sitecore SSC config:', error);
    return null;
  }
};

export { fetchNopStoreConfig };
