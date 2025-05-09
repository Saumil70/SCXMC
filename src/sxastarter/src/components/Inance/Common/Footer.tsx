import { Field, LinkField, Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type InfoItem = {
  fields: {
    Icon: Field<string>;
    Info: Field<string>;
  };
};

type SocialMediaHandle = {
  fields: {
    SocialMediaLink: LinkField;
  };
};

type FooterProps = {
  fields: {
    FooterTitle: Field<string>;
    SocialMediaTitle: Field<string>;
    Copyright: Field<string>;
    InfoItems: InfoItem[];
    SocialMediaHandles: SocialMediaHandle[];
  };
};

function Footer({ fields }: FooterProps) {
  return (
    <>
      <section className="info_section">
        <div className="container">
          <h4>
            <Text field={fields.FooterTitle} />
          </h4>
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="info_items">
                <div className="row">
                  {fields.InfoItems?.map((item, index) => (
                    <div className="col-md-4" key={index}>
                      <div className="item">
                        <div className="img-box">
                          <i className={item.fields.Icon?.value} aria-hidden="true"></i>
                        </div>
                        <p>{item.fields.Info?.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="social-box">
          <h4>
            <Text field={fields.SocialMediaTitle} />
          </h4>
          <div className="box">
            {fields.SocialMediaHandles?.map((handle, index) => (
              <Link field={handle.fields.SocialMediaLink} key={index}>
                <i className={handle.fields.SocialMediaLink?.value?.text} aria-hidden="true"></i>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer_section">
        <div className="container">
          <p>{fields.Copyright?.value}</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
