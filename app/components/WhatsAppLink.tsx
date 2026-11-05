import Image from "next/image";
import type { ComponentProps } from "react";
import styles from "./WhatsAppButton.module.css";

const whatsappUrl = "https://wa.me/923323132729?text=Hi%20Dawood%20Technologies%2C%20I%27d%20like%20to%20discuss%20a%20project.";

// The pill and circle as one link, used by the floating button and the one in the footer. The official glyph-only
// logo sits on a white circle, scaled only (a lossless 96px copy of the original in public/brand): no recoloring or
// cropping. It skips the image optimizer because lossy re-encoding shifts the brand green. The link's aria-label names it, so alt is empty.
export function WhatsAppLink({ className, ...props }: ComponentProps<"a">) {
  return (
    <a {...props} className={`${styles.link} ${className ?? ""}`} href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Message us on WhatsApp">
      <span className={styles.label} aria-hidden="true">Message us</span>
      <span className={styles.circle}>
        <Image className={styles.logo} src="/brand/whatsapp-logo-96.png" alt="" width={34} height={34} unoptimized />
      </span>
    </a>
  );
}

// The footer's copy. It stays hidden, and out of the accessibility tree, until WhatsAppButton hands over to it.
export function FooterWhatsAppLink() {
  return <WhatsAppLink className={styles.inFooter} />;
}
