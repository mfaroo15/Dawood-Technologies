import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import styles from "./CtaBand.module.css";

type CtaBandProps = {
  heading?: string;
  text?: string;
  button?: { label: string; href: string };
};

export function CtaBand({
  heading = "Bring us the business challenge.",
  text = "Book a 30-minute introduction call. We'll help define the right technology path.",
  button = { label: "Book an introduction call", href: "/contact" },
}: CtaBandProps) {
  return (
    <section className={styles.band}>
      <Reveal className={`container ${styles.inner}`}>
        <div>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.text}>{text}</p>
        </div>
        <Link className={styles.button} href={button.href}>{button.label} <ArrowUpRight aria-hidden="true" size={17} /></Link>
      </Reveal>
    </section>
  );
}
