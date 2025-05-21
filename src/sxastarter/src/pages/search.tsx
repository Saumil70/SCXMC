// pages/search.tsx
import { useState, useEffect } from 'react';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('UPWM63BYVD', 'aaed66faa719c86f30d541a56b01bbd7');
const index = searchClient.initIndex('services');

type SearchResult = {
  objectID: string;
  title: string;
  description: string;
  image: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const performSearch = async (q: string) => {
    const res = await index.search(q || '');
    const hits = res.hits.map((hit: any) => ({
      objectID: hit.objectID,
      title: hit.title,
      description: hit.description,
      image: hit.image,
    }));
    setResults(hits);
  };

  useEffect(() => {
    performSearch('');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
  };

  console.log('Search results:', results);
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="d-flex justify-content-center mt-5">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
          className="form-control"
          style={{ width: '70%', maxWidth: '600px' }}
        />
      </div>

      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <section className="service_section layout_padding">
          <div className="container ">
            <div className="row">
              {results.map((card) => (
                <div className="col-sm-6 col-md-4" key={card.objectID}>
                  <div className="box">
                    <div className="img-box">
                      <img src={card.image} alt={card.title} height={512} width={512} />
                    </div>
                    <div className="detail-box">
                      <h5>{card.title}</h5>
                      <p>{card.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
