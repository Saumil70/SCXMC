import { Field, Image, ImageField, Link, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type CardItem = {
  fields: {
    CardTitle: Field<string>;
    CardDescription: Field<string>;
    CardImage: ImageField;
  };
};
type SeviceSectionProps = {
  fields: {
    ServicesHeading: Field<string>;
    Button: LinkField;
    Services: CardItem[];
  };
};

function ServiceSection({ fields }: SeviceSectionProps) {
  const cards = fields?.Services || [];
  return (
    <section className="service_section layout_padding">
      <div className="container ">
        <div className="heading_container heading_center">
          <h2>
            <Text field={fields.ServicesHeading} />
          </h2>
        </div>
        <div className="row">
          {cards.map((card, index) => (
            <div className="col-sm-6 col-md-4 mx-auto" key={index}>
              <div className="box">
                <div className="img-box">
                  <Image field={card.fields.CardImage} />
                </div>
                <div className="detail-box">
                  <h5>
                    <Text field={card.fields.CardTitle} />
                  </h5>
                  <p>
                    <Text field={card.fields.CardDescription} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="btn-box">
          <Link field={fields.Button} />
        </div>
      </div>
    </section>
  );
}

export default ServiceSection;
