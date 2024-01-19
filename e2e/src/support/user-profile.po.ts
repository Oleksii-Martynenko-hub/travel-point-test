export const getBackLink = () => cy.get('a[class*="back-link"]');

export const getUserName = () => cy.get('h2[class*="user-name"]');
export const getUserWebsite = () => cy.get('a[class*="website-link"]');
export const getUserEmail = () => cy.get('a[class*="email-link"]');
export const getUserPhone = () => cy.get('a[class*="phone-link"]');
export const getUserNickname = () => cy.get('p[class*="user-nickname"]');
export const getUserCompany = () => cy.get('p[class*="user-company"]');
export const getUserAddress = () => cy.get('p[class*="user-address"]');
