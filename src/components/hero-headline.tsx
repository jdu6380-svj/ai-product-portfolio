import type { CSSProperties } from "react";

const heroLines = ["让 AI 真正解决问题，", "让想法成为产品。"];
const contactLines = ["好的产品，", "从一次值得深入的交流开始。"];

function AnimatedLines({ lines }: { lines: string[] }) {
  return lines.map((line, lineIndex) => (
    <span className={`hero-line${lineIndex === 1 ? " hero-line-accent" : ""}`} aria-hidden="true" key={line}>
      {Array.from(line).map((character, index) => (
        <span
          className="hero-char"
          key={`${lineIndex}-${index}`}
          style={{ "--char-delay": `${lineIndex * 420 + index * 42}ms` } as CSSProperties}
        >
          <span className="hero-char-glyph">
            <span className="hero-char-hover-target">{character === " " ? "\u00a0" : character}</span>
          </span>
        </span>
      ))}
    </span>
  ));
}

export function HeroHeadline({ id }: { id?: string }) {
  return <h1 className="portfolio-hero-title" id={id} aria-label={heroLines.join("")}><AnimatedLines lines={heroLines} /></h1>;
}

export function ContactHeadline({ id }: { id?: string }) {
  return <h2 className="five-contact-title" id={id} aria-label={contactLines.join("")}><AnimatedLines lines={contactLines} /></h2>;
}
