import {
  RichText as JssRichText,
  RichTextField,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

interface RichTextFields {
  Content?: RichTextField;
  [key: string]: RichTextField | undefined;
}

type RichTextProps = ComponentProps & {
  fields: RichTextFields;
};

const RichText = ({ fields }: RichTextProps): JSX.Element => {
  const field =
    fields.Content ??
    (Object.values(fields).find((value) => value !== undefined) as RichTextField | undefined);

  if (!field) {
    return <div className="richText">[RichText]</div>;
  }

  return <JssRichText field={field} />;
};

export default withDatasourceCheck()<RichTextProps>(RichText);
