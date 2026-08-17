"use client";

import { FormEvent, useEffect, useState } from "react";

type View =
  | "home"
  | "lookup"
  | "checking"
  | "authentic"
  | "register"
  | "passport"
  | "transfer"
  | "transfer-complete"
  | "suspicious"
  | "invalid"
  | "dashboard";

type DashboardFilter = "All activity" | "Verified" | "Flagged" | "Transfers";

const SAMPLE_SERIAL = "CB-2026-000184";

const product = {
  name: "Élan Structured Tote",
  collection: "Commuter Collection 2026",
  colour: "Midnight Black",
  serial: SAMPLE_SERIAL,
  batch: "CB26-CM-041",
};

const activityRows = [
  { serial: "CB-2026-000184", product: "Élan Structured Tote", market: "Lagos, NG", time: "2 min ago", status: "Verified" },
  { serial: "CB-2026-009999", product: "Nova Shoulder Bag", market: "Dubai, UAE", time: "8 min ago", status: "Flagged" },
  { serial: "CB-2025-003821", product: "Aster Mini Tote", market: "Nairobi, KE", time: "14 min ago", status: "Transfer" },
  { serial: "CB-2026-001108", product: "Élan Structured Tote", market: "Riyadh, SA", time: "19 min ago", status: "Verified" },
  { serial: "CB-2025-002714", product: "Luna Crossbody", market: "Accra, GH", time: "31 min ago", status: "Verified" },
];

const marketRows = [
  { name: "Nigeria", value: 38 },
  { name: "United Arab Emirates", value: 24 },
  { name: "Kenya", value: 16 },
  { name: "Saudi Arabia", value: 13 },
  { name: "Other markets", value: 9 },
];

function ArrowIcon() {
  return <span aria-hidden="true">→</span>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="back-button" onClick={onClick} type="button">
      <span aria-hidden="true">←</span> Back
    </button>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? "brand-mark--compact" : ""}`}>
      <span className="brand-word">CHRISBELLA</span>
      <span className="brand-verify">VERIFY</span>
    </div>
  );
}

function ProductIllustration() {
  return (
    <div className="product-stage" aria-label="Concept illustration of a Chrisbella handbag">
      <div className="stage-glow" />
      <div className="bag">
        <div className="bag-handle" />
        <div className="bag-body">
          <div className="bag-seam" />
          <div className="bag-lock" />
          <span className="bag-monogram">CB</span>
        </div>
      </div>
      <div className="product-chip">
        <span className="live-dot" /> Unique product identity
      </div>
    </div>
  );
}

function ProductSummary({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`product-summary ${compact ? "product-summary--compact" : ""}`}>
      <div className="mini-bag" aria-hidden="true">
        <div className="mini-handle" />
        <span>CB</span>
      </div>
      <div>
        <p className="eyebrow">{product.collection}</p>
        <h3>{product.name}</h3>
        <p>{product.colour}</p>
      </div>
    </div>
  );
}

function StepLabel({ current }: { current: number }) {
  return (
    <div className="steps" aria-label={`Step ${current} of 3`}>
      {[1, 2, 3].map((step) => (
        <span key={step} className={step <= current ? "step step--active" : "step"} />
      ))}
      <span>Step {current} of 3</span>
    </div>
  );
}

function BrandDashboard({ filter, onFilterChange, onReturn }: { filter: DashboardFilter; onFilterChange: (filter: DashboardFilter) => void; onReturn: () => void }) {
  const rows = activityRows.filter((row) => {
    if (filter === "All activity") return true;
    if (filter === "Transfers") return row.status === "Transfer";
    return row.status === filter;
  });

  return (
    <div className="dashboard-view view-enter">
      <div className="dashboard-heading">
        <div>
          <p className="kicker"><span /> Product identity operations</p>
          <h1>Protection that grows<br />with the brand.</h1>
          <p>Monitor verification, ownership and suspicious product activity across key markets.</p>
        </div>
        <div className="dashboard-heading-actions">
          <span className="live-status"><span /> Registry live</span>
          <button className="button button--dark" type="button" onClick={() => onFilterChange("Flagged")}>Review flagged products <ArrowIcon /></button>
        </div>
      </div>

      <div className="metric-grid">
        <article><span>Total verifications</span><strong>12,480</strong><small className="metric-positive">↗ 28.4% this month</small></article>
        <article><span>Registered owners</span><strong>7,912</strong><small>63.4% registration rate</small></article>
        <article><span>Ownership transfers</span><strong>416</strong><small className="metric-positive">↗ 8.2% this month</small></article>
        <article className="metric-alert"><span>Flagged activity</span><strong>64</strong><small>12 awaiting review</small></article>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-card chart-card">
          <div className="card-heading">
            <div><span>Verification activity</span><strong>Last 30 days</strong></div>
            <span className="chart-total">+2,741 scans</span>
          </div>
          <div className="chart-wrap">
            <div className="chart-y"><span>500</span><span>300</span><span>100</span><span>0</span></div>
            <svg viewBox="0 0 720 230" role="img" aria-label="Verification scans trending upward over 30 days">
              <defs>
                <linearGradient id="scan-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b89355" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#b89355" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path className="chart-area" d="M0 190 C60 176 82 180 126 151 S214 172 264 133 S350 142 401 99 S492 118 540 72 S627 82 720 31 L720 230 L0 230 Z" />
              <path className="chart-line" d="M0 190 C60 176 82 180 126 151 S214 172 264 133 S350 142 401 99 S492 118 540 72 S627 82 720 31" />
              <circle cx="720" cy="31" r="6" />
            </svg>
          </div>
          <div className="chart-labels"><span>14 Jul</span><span>21 Jul</span><span>28 Jul</span><span>4 Aug</span><span>12 Aug</span></div>
        </section>

        <section className="dashboard-card market-card">
          <div className="card-heading"><div><span>Top markets</span><strong>Share of verification</strong></div></div>
          <div className="market-list">
            {marketRows.map((market, index) => (
              <div className="market-row" key={market.name}>
                <span className="market-rank">{String(index + 1).padStart(2, "0")}</span>
                <div><strong>{market.name}</strong><span><i style={{ width: `${market.value}%` }} /></span></div>
                <b>{market.value}%</b>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-card activity-table-card">
          <div className="card-heading activity-heading">
            <div><span>Registry activity</span><strong>Latest product events</strong></div>
            <div className="filter-tabs" aria-label="Filter activity">
              {(["All activity", "Verified", "Flagged", "Transfers"] as DashboardFilter[]).map((item) => (
                <button className={filter === item ? "filter-tab filter-tab--active" : "filter-tab"} type="button" key={item} onClick={() => onFilterChange(item)}>{item}</button>
              ))}
            </div>
          </div>
          <div className="activity-table" role="table" aria-label="Recent registry activity">
            <div className="activity-tr activity-th" role="row"><span>Product identity</span><span>Product</span><span>Market</span><span>Activity</span><span>Status</span></div>
            {rows.map((row) => (
              <div className="activity-tr" role="row" key={row.serial}>
                <span data-label="Identity"><strong>{row.serial}</strong></span>
                <span data-label="Product">{row.product}</span>
                <span data-label="Market">{row.market}</span>
                <span data-label="Activity">{row.time}</span>
                <span data-label="Status"><i className={`status-tag status-tag--${row.status.toLowerCase()}`}>{row.status}</i></span>
              </div>
            ))}
          </div>
          {rows.length === 0 && <p className="empty-state">No activity matches this filter.</p>}
        </section>

        <aside className="dashboard-card risk-card">
          <span className="risk-icon">!</span>
          <p>Priority review</p>
          <h2>One code scanned in three markets.</h2>
          <span>CB-2026-009999 was scanned in Lagos, Dubai and Nairobi within 72 hours.</span>
          <button type="button" onClick={() => onFilterChange("Flagged")}>Open investigation <ArrowIcon /></button>
        </aside>
      </div>

      <div className="dashboard-footnote">
        <span>Concept data refreshed moments ago</span>
        <button type="button" onClick={onReturn}>Return to customer experience <ArrowIcon /></button>
      </div>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [serial, setSerial] = useState(SAMPLE_SERIAL);
  const [ownerName, setOwnerName] = useState("Amara Okafor");
  const [ownerEmail, setOwnerEmail] = useState("amara@example.com");
  const [newOwner, setNewOwner] = useState("zainab@example.com");
  const [dashboardFilter, setDashboardFilter] = useState<DashboardFilter>("All activity");

  useEffect(() => {
    if (view !== "checking") return;
    const timer = window.setTimeout(() => setView("authentic"), 1150);
    return () => window.clearTimeout(timer);
  }, [view]);

  function verifySerial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = serial.trim().toUpperCase();
    if (normalized === SAMPLE_SERIAL) setView("checking");
    else if (normalized === "CB-2026-009999") setView("suspicious");
    else setView("invalid");
  }

  function registerProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setView("passport");
  }

  function transferProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setView("transfer-complete");
  }

  return (
    <main>
      <div className="concept-banner">
        <span>Independent concept demonstration</span>
        <span className="banner-separator" />
        <span>Not an official Chrisbella service</span>
      </div>

      <header className="site-header">
        <a className="brand-link" href="#top" onClick={() => setView("home")}>
          <BrandMark compact />
        </a>
        <nav aria-label="Primary navigation">
          <button className={view === "dashboard" ? "nav-link" : "nav-link nav-link--active"} type="button" onClick={() => setView("home")}>
            Verify a product
          </button>
          <button className="nav-link" type="button" onClick={() => setView("passport")}>
            My products
          </button>
          <button className={view === "dashboard" ? "nav-link nav-link--active" : "nav-link"} type="button" onClick={() => setView("dashboard")}>
            Brand dashboard
          </button>
          <button className="portal-pill portal-pill--button" type="button" onClick={() => setView(view === "dashboard" ? "home" : "dashboard")}>
            {view === "dashboard" ? "Customer portal" : "Brand portal"}
          </button>
        </nav>
      </header>

      <section id="top" className="experience-shell">
        {view === "dashboard" && <BrandDashboard filter={dashboardFilter} onFilterChange={setDashboardFilter} onReturn={() => setView("home")} />}
        {view === "home" && (
          <div className="home-view view-enter">
            <div className="hero-copy">
              <p className="kicker"><span /> Confidence in every detail</p>
              <h1>Know your bag.<br /><em>Own its story.</em></h1>
              <p className="hero-description">
                Verify the authenticity of your Chrisbella product and unlock its secure digital ownership record.
              </p>
              <div className="hero-actions">
                <button className="button button--dark" type="button" onClick={() => setView("checking")}>
                  <span className="scan-corners" aria-hidden="true" /> Scan QR code
                </button>
                <button className="button button--light" type="button" onClick={() => setView("lookup")}>
                  Enter serial number <ArrowIcon />
                </button>
              </div>
              <div className="trust-row">
                <div><span className="trust-icon">✓</span><span><strong>Instant verification</strong><small>No account required</small></span></div>
                <div><span className="trust-icon">◇</span><span><strong>Secure ownership</strong><small>Transfer when you choose</small></span></div>
              </div>
            </div>
            <ProductIllustration />
          </div>
        )}

        {view === "lookup" && (
          <div className="form-view view-enter">
            <BackButton onClick={() => setView("home")} />
            <StepLabel current={1} />
            <div className="view-heading">
              <p className="kicker"><span /> Product verification</p>
              <h2>Enter the serial number</h2>
              <p>You will find it on the authenticity label inside your product.</p>
            </div>
            <form className="verification-form" onSubmit={verifySerial}>
              <label htmlFor="serial">Product serial number</label>
              <div className="input-with-prefix">
                <span>CB</span>
                <input id="serial" value={serial} onChange={(event) => setSerial(event.target.value)} autoComplete="off" />
              </div>
              <p className="field-hint">Try <button type="button" onClick={() => setSerial(SAMPLE_SERIAL)}>{SAMPLE_SERIAL}</button> for an authentic result.</p>
              <button className="button button--dark button--full" type="submit">Verify product <ArrowIcon /></button>
            </form>
            <div className="scenario-links">
              <span>Demo other outcomes:</span>
              <button type="button" onClick={() => { setSerial("CB-2026-009999"); setView("suspicious"); }}>Suspicious code</button>
              <button type="button" onClick={() => { setSerial("UNKNOWN-001"); setView("invalid"); }}>Invalid code</button>
            </div>
          </div>
        )}

        {view === "checking" && (
          <div className="status-view view-enter" role="status" aria-live="polite">
            <div className="scanner-orbit"><div className="scanner-mark">CB</div></div>
            <p className="kicker"><span /> Secure product registry</p>
            <h2>Checking your product…</h2>
            <p>Matching this identity with Chrisbella&apos;s production record.</p>
            <div className="checking-lines"><span /><span /><span /></div>
          </div>
        )}

        {view === "authentic" && (
          <div className="result-view view-enter">
            <BackButton onClick={() => setView("home")} />
            <StepLabel current={2} />
            <div className="success-seal"><span>✓</span></div>
            <p className="result-label result-label--success">Authenticity confirmed</p>
            <h2>This is a genuine<br />Chrisbella product.</h2>
            <p className="result-copy">This product identity matches an original production record and is available for registration.</p>
            <ProductSummary />
            <dl className="detail-grid">
              <div><dt>Serial number</dt><dd>{product.serial}</dd></div>
              <div><dt>Production batch</dt><dd>{product.batch}</dd></div>
              <div><dt>First verification</dt><dd>Today • Lagos, NG</dd></div>
              <div><dt>Ownership status</dt><dd><span className="status-dot" /> Unregistered</dd></div>
            </dl>
            <button className="button button--gold button--full" type="button" onClick={() => setView("register")}>
              Register as my product <ArrowIcon />
            </button>
            <button className="text-button" type="button" onClick={() => setView("home")}>Continue without registering</button>
          </div>
        )}

        {view === "register" && (
          <div className="form-view view-enter">
            <BackButton onClick={() => setView("authentic")} />
            <StepLabel current={3} />
            <div className="view-heading">
              <p className="kicker"><span /> Digital ownership</p>
              <h2>Make it officially yours</h2>
              <p>Registering creates a secure digital record and unlocks ownership services.</p>
            </div>
            <ProductSummary compact />
            <form className="registration-form" onSubmit={registerProduct}>
              <label htmlFor="owner-name">Full name</label>
              <input id="owner-name" value={ownerName} onChange={(event) => setOwnerName(event.target.value)} required />
              <label htmlFor="owner-email">Email address</label>
              <input id="owner-email" type="email" value={ownerEmail} onChange={(event) => setOwnerEmail(event.target.value)} required />
              <label htmlFor="claim-code">Private registration code</label>
              <input id="claim-code" value="7814 5290" readOnly />
              <p className="field-hint">For a live product, this one-time code would be hidden inside the bag.</p>
              <label className="consent-row"><input type="checkbox" defaultChecked /> <span>I agree to create a digital ownership record for this product.</span></label>
              <button className="button button--dark button--full" type="submit">Complete registration <ArrowIcon /></button>
            </form>
          </div>
        )}

        {view === "passport" && (
          <div className="passport-view view-enter">
            <div className="passport-topline">
              <BackButton onClick={() => setView("home")} />
              <span className="passport-badge"><span>✓</span> Registered</span>
            </div>
            <div className="passport-title">
              <p className="kicker"><span /> Digital product passport</p>
              <h2>{ownerName || "Amara Okafor"}&apos;s<br />Élan Tote</h2>
            </div>
            <ProductSummary />
            <div className="ownership-card">
              <div>
                <p>Registered owner</p>
                <strong>{ownerName || "Amara Okafor"}</strong>
                <small>Owner since 12 August 2026</small>
              </div>
              <div className="owner-monogram">{(ownerName || "AO").split(" ").map((word) => word[0]).join("").slice(0, 2)}</div>
            </div>
            <dl className="passport-details">
              <div><dt>Product identity</dt><dd>{product.serial}</dd></div>
              <div><dt>Collection</dt><dd>Commuter 2026</dd></div>
              <div><dt>Warranty</dt><dd><span className="positive-text">Active until Aug 2027</span></dd></div>
              <div><dt>Authenticity</dt><dd>Verified original</dd></div>
            </dl>
            <div className="passport-actions">
              <button className="button button--dark" type="button" onClick={() => setView("transfer")}>Transfer ownership <ArrowIcon /></button>
              <button className="button button--light" type="button">Get support</button>
            </div>
            <p className="passport-footnote">This record is unique to the product and updates when ownership changes.</p>
          </div>
        )}

        {view === "transfer" && (
          <div className="form-view view-enter">
            <BackButton onClick={() => setView("passport")} />
            <div className="view-heading">
              <p className="kicker"><span /> Secure transfer</p>
              <h2>Pass on the story</h2>
              <p>The new owner will receive a protected invitation. Ownership changes only after they accept.</p>
            </div>
            <ProductSummary compact />
            <div className="transfer-path" aria-label="Ownership transfer path">
              <div className="person-node"><span>AO</span><strong>{ownerName}</strong><small>Current owner</small></div>
              <div className="transfer-arrow"><span>•••</span><b>→</b></div>
              <div className="person-node person-node--new"><span>?</span><strong>New owner</strong><small>Pending invite</small></div>
            </div>
            <form className="registration-form" onSubmit={transferProduct}>
              <label htmlFor="new-owner">New owner&apos;s email</label>
              <input id="new-owner" type="email" value={newOwner} onChange={(event) => setNewOwner(event.target.value)} required />
              <label htmlFor="transfer-code">Confirm with security code</label>
              <input id="transfer-code" value="482 117" readOnly />
              <button className="button button--gold button--full" type="submit">Send transfer invitation <ArrowIcon /></button>
            </form>
          </div>
        )}

        {view === "transfer-complete" && (
          <div className="status-view view-enter">
            <div className="success-seal"><span>✓</span></div>
            <p className="result-label result-label--success">Invitation sent</p>
            <h2>Transfer in progress</h2>
            <p><strong>{newOwner}</strong> has 48 hours to accept. You remain the registered owner until then.</p>
            <div className="timeline-card">
              <div className="timeline-item timeline-item--done"><span>✓</span><div><strong>Transfer requested</strong><small>Just now</small></div></div>
              <div className="timeline-line" />
              <div className="timeline-item"><span>2</span><div><strong>New owner accepts</strong><small>Awaiting response</small></div></div>
              <div className="timeline-line timeline-line--muted" />
              <div className="timeline-item timeline-item--muted"><span>3</span><div><strong>Registry updated</strong><small>Completes automatically</small></div></div>
            </div>
            <button className="button button--dark button--full" type="button" onClick={() => setView("passport")}>Return to product passport</button>
          </div>
        )}

        {view === "suspicious" && (
          <div className="result-view result-view--warning view-enter">
            <BackButton onClick={() => setView("lookup")} />
            <div className="warning-seal">!</div>
            <p className="result-label result-label--warning">Additional check required</p>
            <h2>This code has unusual activity.</h2>
            <p className="result-copy">It has been scanned several times from different locations. This does not automatically mean the product is counterfeit.</p>
            <div className="activity-card">
              <p>Recent verification activity</p>
              <div><span>Lagos, Nigeria</span><strong>Today</strong></div>
              <div><span>Dubai, UAE</span><strong>Yesterday</strong></div>
              <div><span>Nairobi, Kenya</span><strong>3 days ago</strong></div>
            </div>
            <button className="button button--dark button--full" type="button">Request manual review</button>
            <button className="text-button" type="button" onClick={() => setView("lookup")}>Try another serial number</button>
          </div>
        )}

        {view === "invalid" && (
          <div className="result-view result-view--danger view-enter">
            <BackButton onClick={() => setView("lookup")} />
            <div className="danger-seal">×</div>
            <p className="result-label result-label--danger">Code not recognised</p>
            <h2>We could not verify this product.</h2>
            <p className="result-copy">Check the serial carefully and try again. If the code is correct, the product may require further review.</p>
            <div className="entered-code"><span>Serial entered</span><strong>{serial || "UNKNOWN-001"}</strong></div>
            <div className="guidance-card">
              <strong>Before you continue</strong>
              <ul><li>Check the characters and spacing</li><li>Confirm you are using the product label</li><li>Do not complete a purchase if you are unsure</li></ul>
            </div>
            <button className="button button--dark button--full" type="button" onClick={() => setView("lookup")}>Try again</button>
            <button className="text-button" type="button">Report a suspected counterfeit</button>
          </div>
        )}
      </section>

      <footer className="site-footer">
        <BrandMark compact />
        <p>Concept prepared to demonstrate product authentication and digital ownership.</p>
        <span>Sample data • No personal information is stored</span>
      </footer>
    </main>
  );
}
