import React from 'react';
import Test from '@/components/Test';
import { render } from '@testing-library/react';

test('it works', () => {
  const props = 'TEST';
  const { getByTestId } = render(<Test test={props} />);
  expect(getByTestId('test').textContent).toEqual(props);
});
