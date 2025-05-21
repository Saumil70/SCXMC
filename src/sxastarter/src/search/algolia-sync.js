const algoliasearch = require('algoliasearch');
const axios = require('axios');

const ALGOLIA_APP_ID = 'UPWM63BYVD';
const ALGOLIA_ADMIN_API_KEY = '3ec054b3bba0845008cafb5f0bc48b6a';

const SITECORE_GRAPHQL_ENDPOINT =
  'https://xmc-sourceved15434-jsitecorexmc413-dev0494.sitecorecloud.io/sitecore/api/graph/edge';
const LANGUAGE = 'en';

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

const query = `
query {
  item(path: "/sitecore/content/Inance/inance/Home/Data/ServiceSection", language: "${LANGUAGE}") {
    children {
      results {
        id
        name
        CardTitle: field(name: "CardTitle") {
          value
        }
        CardDescription: field(name: "CardDescription") {
          value
        }
        CardImage: field(name: "CardImage") {
          jsonValue
        }
      }
    }
  }
}
`;

async function fetchSitecoreProducts() {
  try {
    const response = await axios.post(
      SITECORE_GRAPHQL_ENDPOINT,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          'sc_apikey': 'BE62093C-DD6E-43D4-A4B5-16978445E75F',
        },
      }
    );

    const results = response.data?.data?.item?.children?.results || [];
    console.log('Fetched products from Sitecore:', results);
    return results.map((item) => ({
      objectID: item.id,
      title: item.CardTitle?.value || item.name || '',
      description: item.CardDescription?.value || '',
      image: item.CardImage?.jsonValue?.value?.src || '',
    }));
  } catch (error) {
    console.error('Error fetching products from Sitecore:', error);
    return [];
  }
}

async function sync() {
  const services = await fetchSitecoreProducts();
  if (services.length > 0) {
    try {
      const index = client.initIndex('services');
      await index.saveObjects(services);
      console.log(`Indexed ${services.length} items into Algolia`);
    } catch (err) {
      console.error('Error uploading to Algolia:', err);
    }
  } else {
    console.log('No products found to index.');
  }
}

sync();
