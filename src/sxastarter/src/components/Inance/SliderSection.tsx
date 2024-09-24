import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  Text, 
  RichText,
  Image,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

type SliderSectionProps = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    Button: LinkField;
  };
};

function SliderSection({ fields }: SliderSectionProps) {
  return (
    <section className="slider_section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="detail-box">
              <h1>
                <Text field={fields.Title} />
              </h1>
              <RichText field={fields.Description} />
              <Link field={fields.Button} className="btn btn-primary" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="img-box">
              <Image field={fields.Image} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SliderSection;
