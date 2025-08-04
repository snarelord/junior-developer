import Image from "next/image";
import Content from "@/components/Content";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Image src="/logo.png" alt="Citizens Advice SORT" width={150} height={150} priority />
          <h1 className={styles.title}>Citizens Advice SORT</h1>
          <h2 className={styles.subtitle}>Junior Developer Practical</h2>
        </div>
        <Content />
      </main>
    </div>
  );
}
