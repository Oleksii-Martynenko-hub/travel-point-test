import {
  getDetailsLink,
  getTitle,
  getUserEmail,
  getUserItem,
  getUserList,
  getUserName,
  getUserWebsite,
} from '../support/app.po';

describe('e2e', () => {
  beforeEach(() => cy.visit('/'));

  let firstUser: { name: string; email: string; website: string } | null = null;

  it('should display title message', () => {
    getTitle().contains(/Список користувачів сайту/);
  });

  it('should request users', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/users',
    }).as('usersDataCheck');

    cy.wait('@usersDataCheck').then((interception) => {
      const { response } = interception;
      if (!response) {
        throw new Error('API call has no response');
      }
      assert.isArray(response.body, 'API call has users data');
      assert.equal(response.body.length, 10, 'API call has users data');
      assert.isObject(response.body[0], 'API call has users data');
      assert.hasAllKeys(
        response.body[0],
        [
          'id',
          'name',
          'username',
          'email',
          'website',
          'phone',
          'address',
          'company',
        ],
        'API call has users data'
      );

      firstUser = response.body[0];
    });
  });

  it('should contain user item with correct data and details link', () => {
    getUserList().within(() => {
      getUserItem()
        .first()
        .within(() => {
          if (firstUser) {
            getUserName().contains(firstUser?.name);
            getUserEmail().contains(firstUser?.email);
            getUserWebsite().contains(firstUser?.website);
          }

          getDetailsLink()
            .contains('Деталі')
            .should('have.attr', 'href', '/user-profile/1');
        });
    });
  });
});
