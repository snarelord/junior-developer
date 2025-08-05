import Image from "next/image";
import Content from "@/components/Content";
import styles from "./page.module.css";
import { fetchData } from "../app/utils/fetchData";
import { DataItem } from "@/types/types";

export default async function Home() {
  const data = await fetchData();

  // Group data by category
  const groupedData = data.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, DataItem[]>);

  // Capitalise categories nicely
  function normaliseCategory(category: string): string {
    const smallWords = new Set(["and", "or", "the", "a", "an", "at", "in", "of", "up", "as"]);
    return category
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w+\b/g, (word, offset) => {
        if (offset === 0 || !smallWords.has(word)) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
      });
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.header}>
          <Image src="/logo.png" alt="Citizens Advice SORT" width={150} height={150} priority />
          <h1 className={styles.title}>Citizens Advice SORT</h1>
          <h2 className={styles.subtitle}>Junior Developer Practical</h2>
        </div>

        {Object.entries(groupedData).map(([category, items]) => (
          <div key={category} className={styles.categorySection}>
            <h2 className={styles.category}>{normaliseCategory(category)}</h2>
            {items.map((item, index) => (
              <Content key={`${category}-${index}`} item={item} />
            ))}
          </div>
        ))}
      </main>
    </div>
  );
}
