import Image from "next/image";
import styles from "./WhatsAppButton.module.css";

const whatsappUrl = "https://wa.me/923323132729?text=Hi%20Dawood%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project.";

// Floating chat button on every page. The official glyph-only logo sits on a white circle,
// scaled only (a lossless 96px copy of the original in public/brand): no recoloring or cropping.
// It skips the image optimizer because lossy re-encoding shifts the brand green. The link's aria-label names it, so alt is empty.
export function WhatsAppButton() {
  return (
    <aside aria-label="Contact shortcut">
      <a className={styles.button} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">
        <Image className={styles.logo} src="/brand/whatsapp-logo-96.png" alt="" width={34} height={34} unoptimized />
        <span className={styles.label} aria-hidden="true">Message us</span>
      </a>
    </aside>
  );
}
