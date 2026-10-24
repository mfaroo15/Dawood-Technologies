"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import styles from "./Faq.module.css";

type FaqItem = { question: string; answer: string };

const defaultItems: FaqItem[] = [
  { question: "How long does a typical project take?", answer: "It depends on scope. Smaller projects take a few weeks; larger systems are delivered in phases over several months. We agree a timeline before we start." },
  { question: "Do you work with our existing systems?", answer: "Yes. We review what you already use and integrate with it wherever that makes sense, rather than replacing everything." },
  { question: "Who owns the work when the project ends?", answer: "You do. Code, data and accounts are set up in your name." },
  { question: "Do you provide support after launch?", answer: "Yes. We host, monitor and keep improving the systems we build." },
];

export function Faq({ items = defaultItems }: { items?: readonly FaqItem[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.faq}>
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${id}-panel-${index}`;
        return (
          <div key={item.question} className={styles.item}>
            <h3 className={styles.question}>
              <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen(expanded ? null : index)}>
                {item.question}
                <ChevronDown aria-hidden="true" size={20} className={styles.icon} />
              </button>
            </h3>
            <div id={panelId} className={styles.answer} hidden={!expanded}>
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
