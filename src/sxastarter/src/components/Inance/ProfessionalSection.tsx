import { Field, Image, ImageField, LinkField, Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type ProfessionalSectionProps = {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    Image: ImageField;
    Button: LinkField;
  };
};

function ProfessionalSection({ fields }: ProfessionalSectionProps) {
  return (
    <section className="professional_section layout_padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="img-box">
              <Image field={fields.Image} />
            </div>
          </div>
          <div className="col-md-6 ">
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
        </div>
      </div>
    </section>
  );
}

export default ProfessionalSection;
