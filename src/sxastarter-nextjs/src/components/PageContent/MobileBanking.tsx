import React from 'react';
import {
  Field,
  ImageField,
  Image,
  RichTextField,
  LinkField,
  Text,
  RichText,
  Link,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Title: Field<string>;
  Text: RichTextField;
  Image: ImageField;
  Features: RichTextField;
  AppStoreLinks: LinkField;
}

export type MobileBankingProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: MobileBankingProps): JSX.Element => {
  if (!props) {
    return <div>Error: Component props are undefined</div>;
  }

  const id = props?.params?.RenderingIdentifier;

  return (
    <div
      className={`component mobile-banking ${props?.params?.styles?.trimEnd() || ''}`}
      id={id ? id : undefined}
    >
      <div className="mobile-banking-container">
        {/* Hero Image */}
        <div className="mobile-banking-hero">
          <Image field={props.fields.Image} className="hero-image" alt="Mobile Banking App" />
        </div>

        {/* Content */}
        <div className="mobile-banking-content">
          {/* Title */}
          <h2 className="mobile-banking-title">
            <Text field={props.fields.Title} />
          </h2>

          {/* Description */}
          <div className="mobile-banking-description">
            <RichText field={props.fields.Text} />
          </div>

          {/* App Store Link */}
          <div className="mobile-banking-cta">
            <Link field={props.fields.AppStoreLinks} className="btn-download-app">
              Download app
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};