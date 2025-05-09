import { Field, Image, ImageField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type CardItem = {
  fields: {
    ClientImage: ImageField;
    ClientName: Field<string>;
    Review: Field<string>;
  };
};
type ClientSectionProps = {
  fields: {
    ClientSectionHeading: Field<string>;
    Cards: CardItem[];
  };
};
function ClientSection({ fields }: ClientSectionProps) {
  const cards = fields?.Cards;
  return (
    <section className="client_section ">
      <div className="container">
        <div className="heading_container heading_center">
          <h2>
            <Text field={fields.ClientSectionHeading} />
          </h2>
        </div>

        <div className="carousel-wrap layout_padding2-top">
          <div className="owl-carousel">
            {cards.map((card, index) => (
              <div className="item" key={index}>
                <div className="box">
                  <div className="client_id">
                    <div className="img-box">
                      <Image field={card.fields.ClientImage} />
                    </div>
                    <div className="client_detail">
                      <div className="client_info">
                        <h6>
                          <Text field={card.fields.ClientName} />
                        </h6>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                      </div>
                      <i className="fa fa-quote-left" aria-hidden="true"></i>
                    </div>
                  </div>
                  <div className="client_text">
                    <p>
                      <Text field={card.fields.Review} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientSection;
