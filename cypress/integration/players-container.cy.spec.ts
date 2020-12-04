/// <reference types="cypress" />
// types for auto complete
type FIXTURES = {
  FIRST_PLAYER_HEART_BUTTON: string;
  PLAYERS_LIST: string;
  FAVORITES_LIST: string;
  PLAYERS_FILTER_INPUT: string;
  EDIT_BACKGROUND_BUTTON: string;
  BACKGROUND_COLOR_INPUT: string;
  HEART_ICON: string;
};

type Player = {
  id: string;
  first_name: string;
};

type Data = {
  data: Player[];
};

context('Player container flows', () => {
  let firstPlayer: Player, secondPlayer: Player, FIXTURES: FIXTURES;
  before(() => {
    cy.fixture('players')
      .as('players')
      .then(({ data }: Data) => {
        [firstPlayer, secondPlayer] = data;

        FIXTURES = {
          FIRST_PLAYER_HEART_BUTTON: `[data-testid=player-${firstPlayer.id}] > [data-testid=player-heart-button]`,
          PLAYERS_LIST: 'players-list',
          FAVORITES_LIST: 'favorites-list',
          PLAYERS_FILTER_INPUT: 'players-filter',
          EDIT_BACKGROUND_BUTTON: 'edit-background-button',
          BACKGROUND_COLOR_INPUT: 'background-color-input',
          HEART_ICON: `[data-testid=player-${firstPlayer.id}] > [data-testid=player-heart-button] .heart-icon`,
        };
      });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('marking and un-marking player', () => {
    // initial flow favorite list should be empty and data should have been loaded
    cy.findByTestId(FIXTURES.FIRST_PLAYER_HEART_BUTTON).should('not.be.empty');
    cy.findByTestId(FIXTURES.PLAYERS_LIST).should('be.empty');
    cy.contains(firstPlayer.first_name).should('be.visible');
    cy.contains(secondPlayer.first_name).should('be.visible');

    // expect player card to move into favorite list
    cy.findByTestId(FIXTURES.PLAYERS_LIST)
      .find(FIXTURES.FIRST_PLAYER_HEART_BUTTON)
      .click();

    cy.findByTestId(FIXTURES.FAVORITES_LIST).should(
      'contain',
      firstPlayer.first_name
    );

    // should test heart icon fill change to red
    cy.get(FIXTURES.HEART_ICON).should('have.css', 'fill', 'rgb(255, 0, 0)');

    // expect player card to move back to player list
    cy.findByTestId(FIXTURES.FAVORITES_LIST)
      .find(FIXTURES.FIRST_PLAYER_HEART_BUTTON)
      .click();
    cy.findByTestId(FIXTURES.PLAYERS_LIST).should(
      'contain',
      firstPlayer.first_name
    );

    // expect favorite list to be empty
    cy.findByTestId(FIXTURES.FAVORITES_LIST).should('be.empty');
  });

  it('should filter players by text and restore back when clearing input', () => {
    cy.findByTestId(FIXTURES.PLAYERS_FILTER_INPUT).type(firstPlayer.first_name);
    cy.contains(secondPlayer.first_name).should('not.exist');
    cy.findByTestId(FIXTURES.PLAYERS_FILTER_INPUT).clear();
    cy.contains(secondPlayer.first_name).should('exist');
  });

  it('should open modal and change background color', () => {
    cy.findByTestId(FIXTURES.EDIT_BACKGROUND_BUTTON).click();
    cy.findByTestId(FIXTURES.BACKGROUND_COLOR_INPUT)
      .clear()
      .type('#1B337F')
      .type('{esc}');

    cy.findByTestId(FIXTURES.BACKGROUND_COLOR_INPUT).should('not.exist');
    cy.findByTestId(FIXTURES.FAVORITES_LIST).should(
      'have.css',
      'background-color',
      'rgb(27, 51, 127)'
    );

    // change color to default one
    cy.findByTestId(FIXTURES.EDIT_BACKGROUND_BUTTON).click();
    cy.findByTestId(FIXTURES.BACKGROUND_COLOR_INPUT).clear().type('{esc}');
    cy.findByTestId(FIXTURES.FAVORITES_LIST).should(
      'have.css',
      'background-color',
      'rgb(243, 244, 246)'
    );

    // change color to white and test click out side to close modal
    cy.findByTestId(FIXTURES.EDIT_BACKGROUND_BUTTON).click();
    cy.findByTestId(FIXTURES.BACKGROUND_COLOR_INPUT).clear().type('#fff');

    cy.findByTestId(FIXTURES.FAVORITES_LIST)
      .click('bottomLeft')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.findByTestId(FIXTURES.BACKGROUND_COLOR_INPUT).should('not.exist');
  });
});
