import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React, { useEffect, useState } from 'react';

type Page = {
  name: string;
  url: string;
};

type HeaderBottomProps = {
  fields: {
    SiteName: Field<string>;
    Navigation: Page[];
  };
};

function HeaderBottom({ fields }: HeaderBottomProps) {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <header className="header_section">
      <div className="header_bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="/">
              <span>
                <Text field={fields.SiteName} />
              </span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span> </span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav">
                {fields.Navigation && fields.Navigation.length > 0 ? (
                  fields.Navigation.map((page, index) => {
                    const isActive = currentPath === page.url;

                    return (
                      <li className={`nav-item ${isActive ? 'active' : ''}`} key={index}>
                        <a className="nav-link" href={page.url}>
                          {page.name}
                          {isActive && <span className="sr-only">(current)</span>}
                        </a>
                      </li>
                    );
                  })
                ) : (
                  <li className="nav-item">
                    <span className="nav-link">No navigation available</span>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderBottom;
