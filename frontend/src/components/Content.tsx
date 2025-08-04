"use client";

import React, { useEffect, useState } from "react";
import styles from "./Content.module.css";
import { DataItem } from "../types/types";

const Content = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/data");

        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`);
        }

        const json: DataItem[] = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const separateSources = (item: DataItem) => {
    const citedSources = item.sources.filter((source) => item.content.includes(source.source));
    const nonCitedSources = item.sources.filter((source) => !item.content.includes(source.source));
    return { citedSources, nonCitedSources };
  };

  const groupedData = data.reduce<Record<string, DataItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

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

  function formatNumberedContent(text: string): string {
    return text.replace(/(\d+\.\s*[^.]+?\.)\s*/g, (p1) => p1.trim() + "\n");
  }

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      {Object.entries(groupedData).map(([category, items]) => (
        <div key={category} className={styles.categorySection}>
          <h2 className={styles.category}>{normaliseCategory(category)}</h2>
          {items.map((item, index) => {
            const { citedSources, nonCitedSources } = separateSources(item);
            return (
              <div key={`${category}-${index}`} className={styles.card}>
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
          })}
        </div>
      ))}
    </div>
  );
};

export default Content;
