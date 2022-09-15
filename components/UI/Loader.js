
import styles from './Loader.module.scss'

export const Loader = () => {

  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export const LoaderLarge = () => {
  return (
    <div className={styles.loaderLarge}>
      <div className={styles.spinner}></div>
    </div>
  );
}
