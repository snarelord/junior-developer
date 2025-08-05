import { DataItem } from "../types/types";
import React from "react";
import styles from "./Content.module.css";

type Props = {
  item: DataItem;
};

export default function Content({ item }: Props) {
  const { citedSources, nonCitedSources } = separateSources(item);

  function separateSources(item: DataItem) {
    const cited = item.sources.filter((source) => item.content.includes(source.source));
    const nonCited = item.sources.filter((source) => !item.content.includes(source.source));
    return { citedSources: cited, nonCitedSources: nonCited };
  }

  function formatNumberedContent(text: string): string {
    return text.replace(/(\d+\\s*[^.]+?\.)\s*/g, (p1) => p1.trim() + "\n");
  }

  return (
    <div className={styles.card}>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: formatNumberedContent(item.content).replace(/\n/g, "<br />"),
        }}
      />

      {citedSources.length > 0 && (
        <>
          <h3 className={styles.sourcesHeading}>Cited Sources</h3>
          <ul className={styles.sources}>
            {citedSources.map((src) => (
              <li key={src.id} className={styles.sourceItem}>
                <img src={src.favicon || "/defaultFavicon.png"} alt="" className={styles.favicon} />
                <a href={src.source} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                  {src.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {nonCitedSources.length > 0 && (
        <>
          <h3 className={styles.sourcesHeading}>Additional Resources</h3>
          <ul className={styles.sources}>
            {nonCitedSources.map((src) => (
              <li key={src.id} className={styles.sourceItem}>
                <img src={src.favicon || "/defaultFavicon.png"} alt="" className={styles.favicon} />
                <a href={src.source} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                  {src.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
