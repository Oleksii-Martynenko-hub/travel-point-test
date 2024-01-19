import { Link, LinkProps } from 'react-router-dom';

import styles from './styled-link.module.scss';

function StyledLink({ classes, ...props }: LinkProps & { classes?: string }) {
  return <Link className={`${styles['styled-link']} ${classes}`} {...props} />;
}

export default StyledLink;
