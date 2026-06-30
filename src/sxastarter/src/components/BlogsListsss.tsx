import React from 'react';
import { Field } from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  Heading: Field<string>;
}

export type BlogsListProps = {
  fields: Fields;
};

export const Default = (props: BlogsListProps): JSX.Element => {
  console.log('🔍 BlogsList props:', props);

  return (
    <div className="container-default">
      <h1>blogs</h1>
      <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
        {JSON.stringify(props.fields, null, 2)}
      </pre>
    </div>
  );
};
