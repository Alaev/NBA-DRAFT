/// <reference types="cypress" />
import React from 'react';
import { mount, unmount } from 'cypress-react-unit-test';
import PlayersContainer from './players-container';
import { RecoilRoot } from 'recoil';
import { worker } from '../../mocks/browser';
import { Player } from '../../types/player';

type Data = {
  data: Player[];
};

describe('Players component test using cypress', () => {
  let firstPlayer: Player, secondPlayer: Player;
  before(() => {
    cy.fixture('players')
      .as('players')
      .then(({ data }: Data) => {
        [firstPlayer, secondPlayer] = data;
      });
    // Start the mocking conditionally in test env
    worker.start();
  });

  beforeEach(() => {
    mount(
      <RecoilRoot>
        <PlayersContainer />
      </RecoilRoot>
    );
  });

  afterEach(() => {
    // Reset handlers
    worker.resetHandlers();
    unmount();
  });

  it('should render container with players and empty favorites', () => {
    cy.contains(firstPlayer.first_name).should('be.visible');
    cy.contains(secondPlayer.first_name).should('be.visible');
    cy.findByTestId('players-list').should('not.be.empty');
    cy.findByTestId('favorites-list').should('be.empty');
  });

  it('should filter out second player from the list', () => {
    cy.findByTestId('players-filter')
      .should('be.visible')
      .type(firstPlayer.first_name);

    cy.contains(secondPlayer.first_name).should('not.exist');
  });

  it('should move player between lists on click and test heart color change', () => {
    cy.findByTestId('players-list')
      .find(
        `[data-testid=player-${firstPlayer.id}] > [data-testid=player-heart-button]`
      )
      .click();

    cy.findByTestId('players-list').should('not.be.empty');
    cy.findByTestId('favorites-list').should('not.be.empty');

    // should test heart icon fill change to red
    cy.get(`[data-testid=player-${firstPlayer.id}] > [data-testid=player-heart-button] .heart-icon`).should('have.css', 'fill', 'rgb(255, 0, 0)');
  });
});
