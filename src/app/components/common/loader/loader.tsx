import styles from './loader.module.scss';

type Props = {
  isFullPage?: boolean;
  size?: string;
  borderWidth?: string;
};

const Loader = ({
  isFullPage = false,
  size = '5rem',
  borderWidth = '0.6rem',
}: Props) => {
  const loaderElement = (
    <div
      style={
        {
          '--size': size,
          '--border-width': borderWidth,
        } as React.CSSProperties
      }
      className={styles['loader']}
      role="status"
      aria-label="loader"
    ></div>
  );

  return isFullPage ? (
    <div aria-label="full-page-wrapper" className={styles['full-page-wrapper']}>
      {loaderElement}
    </div>
  ) : (
    <div className={styles['loader-wrapper']}>{loaderElement}</div>
  );
};

export default Loader;
