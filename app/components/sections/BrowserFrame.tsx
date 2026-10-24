import Image from "next/image";
import styles from "./BrowserFrame.module.css";

type BrowserFrameProps = {
  src: string;
  alt: string;
  domain: string;
  sizes: string;
  preload?: boolean;
};

// A 1440x900 website screenshot inside a simple browser window.
export function BrowserFrame({ src, alt, domain, sizes, preload }: BrowserFrameProps) {
  return (
    <div className={styles.browser}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}><i /><i /><i /></span>
        <span className={styles.url}>{domain}</span>
      </div>
      <div className={styles.shot}>
        <Image src={src} alt={alt} width={1440} height={900} sizes={sizes} preload={preload} />
      </div>
    </div>
  );
}
