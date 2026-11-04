import { Bell, LineChart, List, Settings, TrendingUp } from "lucide-react";
import styles from "./PhoneMockup.module.css";

type Tone = "amber" | "green" | "blue" | "gray";

const rows: { ticker: string; name: string; status: string; price: string; change: string; down?: boolean; tone: Tone; progress: number }[] = [
  { ticker: "MEBL", name: "Meezan Bank", status: "Buy at Rs 520 · 0.9% away", price: "524.58", change: "+0.58%", tone: "amber", progress: 91 },
  { ticker: "LUCK", name: "Lucky Cement", status: "Sell target reached", price: "420.10", change: "+10.6%", tone: "green", progress: 100 },
  { ticker: "SYS", name: "Systems Ltd", status: "Buy at Rs 590 · 5.2% away", price: "622.40", change: "+3.4%", tone: "blue", progress: 72 },
  { ticker: "ENGRO", name: "Engro Corp", status: "Watching · no target", price: "318.75", change: "−0.4%", down: true, tone: "gray", progress: 30 },
];

const tabs = [
  { label: "Watchlist", icon: List, active: true },
  { label: "Alerts", icon: Bell },
  { label: "Market", icon: LineChart },
  { label: "Settings", icon: Settings },
];

// CSS-only phone. Sizes are in em against a width-based font size, so the whole phone scales to fit.
// Hidden from assistive technology; the summary below describes it instead.
export function PhoneMockup() {
  return (
    <figure className={styles.figure}>
      <p className="visually-hidden">Illustration of the PSX Sharia Alerts mobile app: a watchlist of stocks showing how close each is to its target price, the KSE-100 and KMI-30 indexes, and a notification that a sell target has been reached.</p>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.scale}>
          <div className={styles.frame}>
            <div className={styles.screen}>
              <span className={styles.notch} />
              <div className={styles.head}>
                <div>
                  <span className={styles.greeting}>Good morning</span>
                  <span className={styles.heading}>Your watchlist</span>
                </div>
                <span className={styles.bell}><Bell size="1.5em" /><span className={styles.badge}>3</span></span>
              </div>
              <div className={styles.indexes}>
                <div><span className={styles.indexName}>KSE-100</span><span className={styles.indexValue}>165,736</span><span className={styles.indexChange}>▲0.77%</span></div>
                <div><span className={styles.indexName}>KMI-30</span><span className={styles.indexValue}>236,958</span><span className={styles.indexChange}>▲0.56%</span></div>
              </div>
              <div className={styles.rows}>
                {rows.map((row) => (
                  <div className={styles.row} key={row.ticker}>
                    <span className={styles.ticker}>{row.ticker}</span>
                    <div className={styles.info}>
                      <span className={styles.name}>{row.name}</span>
                      <span className={styles.status}>{row.status}</span>
                      <span className={styles.track}><span className={`${styles.fill} ${styles[row.tone]}`} style={{ width: `${row.progress}%` }} /></span>
                    </div>
                    <div className={styles.price}>
                      <span className={styles.priceValue}>{row.price}</span>
                      <span className={row.down ? styles.down : styles.up}>{row.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.tabs}>
                {tabs.map(({ label, icon: Icon, active }) => (
                  <span className={active ? styles.tabActive : styles.tab} key={label}><Icon size="1.7em" />{label}</span>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.notification}>
            <span className={styles.appIcon}><TrendingUp size="1.6em" /></span>
            <div className={styles.notificationText}>
              <span className={styles.notificationApp}>PSX Sharia Alerts · now</span>
              <span className={styles.notificationBody}>Sell target reached: LUCK +10.6%</span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className={styles.caption}>Illustrative screens</figcaption>
    </figure>
  );
}
