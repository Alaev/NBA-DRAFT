import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';
import faker from 'faker';

describe('<Button> test using jest', () => {
  let buttonText: string;
  before(() => {
    buttonText = faker.lorem.word();
  });

  it('should render and handle click', () => {
    const spy = jest.fn();
    const { getByText } = render(<Button onClick={spy}>{buttonText}</Button>);
    fireEvent.click(getByText(buttonText));
    expect(spy).toHaveBeenCalled;
  });
});
