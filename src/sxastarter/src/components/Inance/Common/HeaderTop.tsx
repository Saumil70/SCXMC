import { Field, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type HeaderTopProps = {
  fields: {
    Phone: Field<string>;
    Email: Field<string>;
  };
};
function HeaderTop({ fields }: HeaderTopProps) {
  return (
    <header className="header_section">
      <div className="header_top">
        <div className="container-fluid">
          <div className="contact_nav">
            <a href="">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <span>
                {' '}
                Call : <Text field={fields.Phone} />{' '}
              </span>
            </a>
            <a href="">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <span>
                {' '}
                Email : <Text field={fields.Email} />{' '}
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderTop;
