import StyledLink from '../../components/common/styled-link/styled-link';

import styles from './page-not-found.module.scss';

export const PageNotFound = () => (
  <div className={styles['page-not-found']}>
    <p className={styles['error']}>404 Error</p>

    <h2 className="title">Page not found</h2>
    <p className={styles.description}>
      Sorry, the page you are looking for could not be found or has been
      removed.
    </p>

    <StyledLink classes={styles['back-link']} to="/">
      Back to home page
    </StyledLink>
  </div>
);

export default PageNotFound;
