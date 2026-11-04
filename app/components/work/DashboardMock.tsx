import { BarChart3, Boxes, FileText, LayoutDashboard, MessageSquare, Package, ShoppingCart, Users, Warehouse, type LucideIcon } from "lucide-react";
import type { CaseStudy } from "@/app/data/case-studies";
import styles from "./DashboardMock.module.css";

type Tone = "toneGreen" | "toneAmber" | "toneBlue";
type Row = { cells: [string, string]; status: string; tone: Tone };
type Screen = {
  windowTitle: string;
  nav: { label: string; icon: LucideIcon; active?: boolean }[];
  title: string;
  tag: string;
  columns: [string, string, string];
  rows: Row[];
};

const screens: Record<CaseStudy["visual"], Screen> = {
  blue: {
    windowTitle: "Operations · Overview",
    nav: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Orders", icon: ShoppingCart },
      { label: "Inventory", icon: Boxes },
      { label: "Customers", icon: Users },
      { label: "Enquiries", icon: MessageSquare },
      { label: "Reports", icon: BarChart3 },
    ],
    title: "Orders overview",
    tag: "This quarter",
    columns: ["Order", "Product", "Status"],
    rows: [
      { cells: ["Site delivery", "RCC pipe"], status: "Dispatched", tone: "toneGreen" },
      { cells: ["Project order", "RCC pipe"], status: "In production", tone: "toneAmber" },
      { cells: ["New enquiry", "Quotation"], status: "Open", tone: "toneBlue" },
    ],
  },
  green: {
    windowTitle: "Trading · Stock",
    nav: [
      { label: "Dashboard", icon: LayoutDashboard },
      { label: "Products", icon: Package },
      { label: "Stock", icon: Warehouse, active: true },
      { label: "Clients", icon: Users },
      { label: "Enquiries", icon: MessageSquare },
      { label: "Records", icon: FileText },
    ],
    title: "Stock by warehouse",
    tag: "Live",
    columns: ["Product", "Client", "Status"],
    rows: [
      { cells: ["Lot A", "Wholesale account"], status: "In stock", tone: "toneGreen" },
      { cells: ["Lot B", "Export order"], status: "Reserved", tone: "toneAmber" },
      { cells: ["Lot C", "Retail account"], status: "Delivered", tone: "toneGreen" },
      { cells: ["Lot D", "New enquiry"], status: "Quoted", tone: "toneBlue" },
    ],
  },
};

const warehouses = [{ name: "Warehouse A", level: 78 }, { name: "Warehouse B", level: 54 }, { name: "Warehouse C", level: 31 }];

// A gentle rise from left to right, with no axis values.
const line = "M0 50 C 30 47, 48 44, 75 39 S 122 36, 150 29 S 200 25, 228 18 S 275 11, 300 7";

function OrderChart() {
  return (
    <div className={styles.chart}>
      <div className={styles.chartHead}><span className={styles.chartTitle}>Order volume</span><span className={styles.chartMeta}>Weekly</span></div>
      <svg className={styles.chartPlot} viewBox="0 0 300 60" preserveAspectRatio="none" focusable="false">
        <defs>
          <linearGradient id="order-volume-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1268e8" stopOpacity=".2" />
            <stop offset="1" stopColor="#1268e8" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[12, 30, 48].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="#eef1f5" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
        <path d={`${line} L300 60 L0 60 Z`} fill="url(#order-volume-fill)" />
        <path d={line} fill="none" stroke="#1268e8" strokeWidth="1.8" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}

function StockTiles() {
  return (
    <div className={styles.warehouses}>
      {warehouses.map(({ name, level }) => (
        <div className={styles.warehouse} key={name}>
          <span className={styles.warehouseName}>{name}</span>
          <span className={styles.track}><span className={styles.fill} style={{ width: `${level}%` }} /></span>
        </div>
      ))}
    </div>
  );
}

// Illustrative software screens built from HTML and SVG, with sample labels and no metrics.
export function DashboardMock({ visual }: { visual: CaseStudy["visual"] }) {
  const screen = screens[visual];
  return (
    <div className={`${styles.visual} ${styles[visual]}`} aria-hidden="true">
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className={styles.dots}><span /><span /><span /></span>
          <span className={styles.windowTitle}>{screen.windowTitle}</span>
        </div>
        <div className={styles.body}>
          <div className={styles.sidebar}>
            {screen.nav.map(({ label, icon: Icon, active }) => (
              <span className={active ? styles.navActive : styles.nav} key={label}><Icon size={11} strokeWidth={2} /><span className={styles.navLabel}>{label}</span></span>
            ))}
          </div>
          <div className={styles.main}>
            <div className={styles.mainHead}>
              <span className={styles.mainTitle}>{screen.title}</span>
              <span className={styles.tag}>{screen.tag}</span>
            </div>
            {visual === "blue" ? <OrderChart /> : <StockTiles />}
            <div className={`${styles.table} ${visual === "green" ? styles.tableStock : ""}`}>
              <div className={styles.headRow}>{screen.columns.map((column) => <span key={column}>{column}</span>)}</div>
              {screen.rows.map(({ cells, status, tone }) => (
                <div className={styles.row} key={cells[0]}>
                  <span className={styles.cellStrong}>{cells[0]}</span>
                  <span className={styles.cell}>{cells[1]}</span>
                  <span className={`${styles.status} ${styles[tone]}`}>{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
