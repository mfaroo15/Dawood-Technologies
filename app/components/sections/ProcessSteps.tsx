import { Reveal } from "./Reveal";
import styles from "./ProcessSteps.module.css";

type Step = { title: string; text: string };

const defaultSteps: Step[] = [
  { title: "Discover", text: "We learn how your business operates and define what technology needs to do." },
  { title: "Design", text: "Architecture, user flows and a delivery plan agreed before we build." },
  { title: "Build", text: "Development in short cycles with regular demos and updates." },
  { title: "Run & improve", text: "We host, support and keep improving the system after launch." },
];

// "How we work" row. Place it inside a section that supplies its own heading.
export function ProcessSteps({ steps = defaultSteps }: { steps?: readonly Step[] }) {
  return (
    <Reveal as="ol" variant="stagger" className={styles.steps}>
      {steps.map((step, index) => (
        <li key={step.title} className={styles.step}>
          <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          <h3 className={styles.title}>{step.title}</h3>
          <p className={styles.text}>{step.text}</p>
        </li>
      ))}
    </Reveal>
  );
}
