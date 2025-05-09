import { Field, Link, LinkField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import React from 'react';

type ContactSectionProps = {
  fields: {
    Title: Field<string>;
    Button: LinkField;
  };
};
function ContactSection({ fields }: ContactSectionProps) {
  return (
    <section className="contact_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2>
            <Text field={fields.Title} />
          </h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <form action="">
              <div>
                <input type="text" placeholder="Name" />
              </div>
              <div>
                <input type="text" placeholder="Phone Number" />
              </div>
              <div>
                <input type="email" placeholder="Email" />
              </div>
              <div>
                <input type="text" className="message-box" placeholder="Message" />
              </div>
              <div className="d-flex ">
                <button>
                  <Link field={fields.Button} />
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div className="map_container">
              <div className="map">
                <div id="googleMap" style={{ width: '100%', height: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
