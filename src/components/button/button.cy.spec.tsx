// Type support
/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import React from 'react';
import { mount } from 'cypress-react-unit-test';
import Button from './button';
import faker from 'faker';

describe('<Button> component test using cypress', () => {
  let children: string;

  before(() => {
    children = faker.lorem.word();
  });

  it('should render and handle click', () => {
    const stub = cy.stub();
    mount(<Button onClick={stub}>{children}</Button>);
    cy.findByText(children).click();
    expect(stub).toHaveBeenCalled;
  });
});
