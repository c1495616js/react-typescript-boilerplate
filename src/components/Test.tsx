import React, { ReactElement } from 'react';

interface Props {
  test?: string;
}

export default function Test({ test }: Props): ReactElement {
  return <div>{test}</div>;
}
