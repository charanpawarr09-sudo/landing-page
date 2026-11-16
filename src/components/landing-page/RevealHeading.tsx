import { Fragment } from "react";
import styles from "./landing-page.module.css";

export function RevealHeading({
  as: Tag = "h2",
  id,
  lines,
}: {
  as?: "h1" | "h2";
  id: string;
  lines: readonly string[];
}) {
  return (
    <Tag id={id} aria-label={lines.join(" ")} data-scroll-heading>
      {lines.map((line) => (
        <span className={styles.revealLine} aria-hidden="true" key={line}>
          {line.split(" ").map((word, index, words) => (
            <Fragment key={`${word}-${index}`}>
              <span className={styles.revealWord} data-reveal-word>{word}</span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
