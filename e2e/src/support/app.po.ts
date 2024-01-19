export const getTitle = () => cy.get('h1');

export const getUserList = () => cy.get('ul[class*="user-list"]');
export const getUserItem = () => cy.get('li[class*="user-item"]');
export const getUserName = () => cy.get('p[class*="user-name"]');
export const getUserEmail = () => cy.get('a[class*="email-link"]');
export const getUserWebsite = () => cy.get('a[class*="website-link"]');

export const getDetailsLink = () => cy.get('a[class*="details-link"]');
