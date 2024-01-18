import { Link, LinkProps } from 'react-router-dom';

import styles from './styled-link.module.scss';

function StyledLink(props: LinkProps) {
  return <Link className={styles['styled-link']} {...props} />;
}

export default StyledLink;
