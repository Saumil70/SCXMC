import React, { CSSProperties } from 'react';
import {
  Image as JssImage,
  Link as JssLink,
  ImageField,
  Field,
  LinkField,
  Text,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Image?: ImageField;
  ImageCaption?: Field<string>;
  TargetUrl?: LinkField;
}

type ImageProps = {
  params?: { [key: string]: string };
  fields?: Fields;
};

const ImageDefault = (props: ImageProps): JSX.Element => (
  <div className={`component image ${props.params?.styles ?? ''}`.trimEnd()}>
    <div className="component-content">
      <span className="is-empty-hint">Image</span>
    </div>
  </div>
);

export const Banner = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const isPageEditing = sitecoreContext.pageEditing;
  const imageField = props.fields?.Image;
  const classHeroBannerEmpty =
    isPageEditing && imageField?.value?.class === 'scEmptyImage' ? 'hero-banner-empty' : '';
  const backgroundStyle = imageField?.value?.src
    ? ({ backgroundImage: `url('${imageField.value.src}')` } as CSSProperties)
    : undefined;
  const modifyImageProps = imageField
    ? {
        ...imageField,
        editable: imageField.editable
          ?.replace(`width="${imageField.value?.width ?? ''}"`, 'width="100%"')
          .replace(`height="${imageField.value?.height ?? ''}"`, 'height="100%"'),
      }
    : undefined;
  const id = props.params?.RenderingIdentifier;

  return (
    <div
      className={`component hero-banner ${props.params?.styles ?? ''} ${classHeroBannerEmpty}`}
      id={id ? id : undefined}
    >
      <div className="component-content sc-sxa-image-hero-banner" style={backgroundStyle}>
        {sitecoreContext.pageEditing && modifyImageProps ? (
          <JssImage field={modifyImageProps} />
        ) : null}
      </div>
    </div>
  );
};

export const Default = (props: ImageProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const imageField = props.fields?.Image;
  const targetUrl = props.fields?.TargetUrl;
  const imageCaption = props.fields?.ImageCaption;

  if (imageField || imageCaption || targetUrl) {
    const Image = () => (imageField ? <JssImage field={imageField} /> : null);
    const id = props.params?.RenderingIdentifier;

    return (
      <div className={`component image ${props.params?.styles ?? ''}`} id={id ? id : undefined}>
        <div className="component-content">
          {sitecoreContext.pageState === 'edit' || !targetUrl?.value?.href ? (
            <Image />
          ) : targetUrl ? (
            <JssLink field={targetUrl}>
              <Image />
            </JssLink>
          ) : (
            <Image />
          )}
          {imageCaption ? (
            <Text tag="span" className="image-caption field-imagecaption" field={imageCaption} />
          ) : null}
        </div>
      </div>
    );
  }

  return <ImageDefault {...props} />;
};
