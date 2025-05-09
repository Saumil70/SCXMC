import React from 'react';
import { Field, ImageField, LinkField, Text, Image, Link } from '@sitecore-jss/sitecore-jss-nextjs';

type AboutSectionProps = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    Button: LinkField;
  };
};

function AboutSection({ fields }: AboutSectionProps) {
  return (
    <section className="about_section layout_padding-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="detail-box">
              <h2>
                <Text field={fields.Title} />
              </h2>
              <p>
                <Text field={fields.Description} />
              </p>
              <Link field={fields.Button} />
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <div className="img-box">
              <Image field={fields.Image} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
