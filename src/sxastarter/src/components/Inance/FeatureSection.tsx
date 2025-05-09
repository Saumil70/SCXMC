import { Field, ImageField, Image, Text } from '@sitecore-jss/sitecore-jss-nextjs';

type CardItem = {
  id: string;
  fields: {
    Title: Field<string>;
    Image: ImageField;
  };
};

type FeatureSectionProps = {
  fields: {
    items: CardItem[];
  };
};

const FeatureSection = ({ fields }: FeatureSectionProps): JSX.Element => {
  const cards = fields?.items || [];

  return (
    <section className="feature_section">
      <div className="container">
        <div className="feature_container">
          {cards.map((card) => (
            <div className="box" key={card.id}>
              <div className="img-box">
                <Image field={card.fields.Image} />
              </div>
              <h5 className="name"> 
                <Text field={card.fields.Title} />
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
