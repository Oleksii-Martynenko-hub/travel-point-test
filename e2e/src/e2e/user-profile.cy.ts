import { getDetailsLink, getTitle } from '../support/app.po';
import {
  getBackLink,
  getUserAddress,
  getUserCompany,
  getUserEmail,
  getUserName,
  getUserNickname,
  getUserPhone,
  getUserWebsite,
} from '../support/user-profile.po';

describe('e2e', () => {
  let firstUser:
    | ({ [key: string]: string } & {
        company: { name: string };
        address: { street: string };
      })
    | null = null;

  it('should request users', () => {
    cy.visit('/');

    cy.intercept({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users',
    }).as('usersDataCheck');

    cy.wait('@usersDataCheck').then((interception) => {
      const { response } = interception;
      if (!response) {
        throw new Error('API call has no response');
      }
      assert.isNotEmpty(response.body, 'API call has users data');

      firstUser = response.body[0];
    });
  });

  it('should contain user details link follow to user profile', () => {
    cy.visit('/');

    getDetailsLink()
      .first()
      .contains('Деталі')
      .should('have.attr', 'href', '/user-profile/1')
      .click();

    cy.url().should('include', '/user-profile/1');

    getUserName().contains(firstUser?.name as string);
  });

  it('should contain correct user data', () => {
    cy.visit('/user-profile/1');

    if (firstUser) {
      getUserName().contains(firstUser.name);
      getUserEmail().contains(firstUser.email);
      getUserWebsite().contains(firstUser.website);
      getUserPhone().contains(firstUser.phone.split(' ')[0]);
      getUserNickname().contains(firstUser.username);
      getUserCompany().contains(firstUser.company.name);
      getUserAddress().contains(firstUser.address.street);
    }
  });

  it('should return to home by click back', () => {
    cy.visit('/user-profile/1');

    getBackLink().contains('Back').should('have.attr', 'href', '/').click();

    cy.url().should('equal', (Cypress.config().baseUrl + '/') as string);

    getTitle().contains(/Список користувачів сайту/);
  });
});
