import styles from "./Container.module.scss";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className={styles["wrapper"]}>{children}</div>;
}

export default Wrapper;
