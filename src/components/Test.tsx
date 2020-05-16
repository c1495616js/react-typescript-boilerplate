import React, { ReactElement } from 'react';
import '@/styles/index.scss';
interface Props {
  test?: string;
}

export default function Test({ test }: Props): ReactElement {
  return <div data-testid="test">{test}</div>;
}
