import styles from "./Container.module.scss";

function Section({ children }: { children: React.ReactNode }) {
  return <section className={styles["section"]}>{children}</section>;
}

export default Section;
