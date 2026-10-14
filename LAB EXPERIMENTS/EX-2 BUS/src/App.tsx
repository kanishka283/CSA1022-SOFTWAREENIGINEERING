import { useEffect, useMemo, useState } from "react";

type Page =
  | "login" | "register" | "reset" | "otp" | "home" | "results" | "details"
  | "seats" | "boarding" | "dropping" | "passengers" | "fare" | "payment"
  | "processing" | "confirmation" | "bookings" | "tracking" | "routes"
  | "alerts" | "profile" | "support" | "reschedule";

type IconName =
  | "bus" | "home" | "ticket" | "pin" | "route" | "bell" | "user" | "chevron"
  | "arrow" | "calendar" | "users" | "clock" | "star" | "wifi" | "bolt"
  | "check" | "shield" | "download" | "help" | "card" | "logout" | "swap"
  | "eye" | "close" | "menu" | "mail" | "phone";

const paths: Record<IconName, React.ReactNode> = {
  bus: <><rect x="4" y="3" width="16" height="16" rx="3"/><path d="M7 19v2m10-2v2M4 10h16M8 15h.01M16 15h.01M8 6h8"/></>,
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>,
  ticket: <><path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Z"/><path d="M9 6v12"/></>,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  route: <><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h3a3 3 0 0 0 3-3V8a3 3 0 0 1 3-3"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>, arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  users: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20a6 6 0 0 1 12 0m0-5a5 5 0 0 1 6 5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>,
  wifi: <><path d="M5 12a10 10 0 0 1 14 0M8 15a6 6 0 0 1 8 0"/><circle cx="12" cy="19" r="1"/></>,
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>,
  check: <path d="m5 12 4 4L19 6"/>, shield: <><path d="M12 2 4 5v6c0 5 3 9 8 11 5-2 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-5"/></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 20h16"/></>,
  help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4 2.2c-1 .7-1.5 1.2-1.5 2.3M12 17h.01"/></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></>,
  logout: <><path d="M10 4H4v16h6M14 8l4 4-4 4m4-4H9"/></>,
  swap: <><path d="m7 7 3-3 3 3M10 4v12m7 1-3 3-3-3m3 3V8"/></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>, menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
  phone: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3-1-5-3-6-6l2-2-2-4-2-2Z"/>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, onClick, variant = "primary", disabled = false, icon, type = "button" }: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger"; disabled?: boolean; icon?: IconName; type?: "button" | "submit";
}) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size={18}/>} {children}</button>;
}

function Field({ label, value, onChange, placeholder, type = "text", error }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; error?: boolean;
}) {
  return <label className={`field ${error ? "field-error" : ""}`}><span>{label}</span><input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}/></label>;
}

const nav = [
  ["home", "Home", "home"], ["home", "Book Bus", "ticket"], ["bookings", "My Bookings", "ticket"],
  ["tracking", "Track Bus", "pin"], ["routes", "Routes", "route"], ["alerts", "Alerts", "bell"],
] as [Page, string, IconName][];

const busData = [
  { name: "Chennai Express", type: "AC Semi-Sleeper", depart: "09:00 PM", arrive: "06:00 AM", duration: "9h", rating: 4.5, seats: 12, fare: 899 },
  { name: "GreenLine Travels", type: "AC Sleeper", depart: "10:30 PM", arrive: "07:00 AM", duration: "8h 30m", rating: 4.6, seats: 8, fare: 999 },
  { name: "City Rider", type: "AC Seater", depart: "08:30 PM", arrive: "05:30 AM", duration: "9h", rating: 4.2, seats: 20, fare: 699 },
];

const formatDate = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [from, setFrom] = useState("Chennai Central");
  const [to, setTo] = useState("Bangalore Majestic");
  const [date, setDate] = useState("2026-10-15");
  const [passengerCount, setPassengerCount] = useState(2);
  const [selectedBus, setSelectedBus] = useState(busData[0]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [seatGender, setSeatGender] = useState("Male");
  const [boarding, setBoarding] = useState("");
  const [dropping, setDropping] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [policy, setPolicy] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"upcoming" | "cancelled">("upcoming");
  const [cancelModal, setCancelModal] = useState(false);
  const [bookingTab, setBookingTab] = useState("Upcoming");
  const [filters, setFilters] = useState<string[]>([]);

  const go = (p: Page) => { setPage(p); setError(""); setProfileOpen(false); window.scrollTo(0, 0); };
  const notify = (m: string) => { setToast(m); window.setTimeout(() => setToast(""), 2800); };
  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));
  const requireFields = (keys: string[], msg: string, next: Page) => {
    if (keys.some(k => !form[k]?.trim())) setError(msg); else go(next);
  };

  useEffect(() => {
    if (page === "processing") {
      const timer = window.setTimeout(() => go("confirmation"), 2400);
      return () => window.clearTimeout(timer);
    }
  }, [page]);

  const authenticated = !["login", "register", "reset", "otp"].includes(page);
  const total = selectedBus.fare * Math.max(selectedSeats.length, passengerCount);
  const grandTotal = total + Math.round(total * .05) + 30;

  return <div className="app">
    {authenticated && <Header page={page} go={go} profileOpen={profileOpen} setProfileOpen={setProfileOpen}/>}
    {toast && <div className="toast"><Icon name="check" size={18}/>{toast}</div>}
    <main className={authenticated ? "main-shell" : ""}>
      {page === "login" && <Login go={go} form={form} update={update} error={error} setError={setError}/>}
      {page === "register" && <Register go={go} form={form} update={update} error={error} setError={setError}/>}
      {page === "reset" && <Reset go={go} form={form} update={update} error={error} setError={setError}/>}
      {page === "otp" && <Otp go={go} form={form} update={update} error={error} setError={setError} notify={notify}/>}
      {page === "home" && <Home from={from} to={to} date={date} count={passengerCount} setFrom={setFrom} setTo={setTo} setDate={setDate} setCount={setPassengerCount} search={() => go("results")} setError={setError} error={error}/>}
      {page === "results" && <Results from={from} to={to} date={date} count={passengerCount} filters={filters} setFilters={setFilters} choose={b => { setSelectedBus(b); go("details"); }}/>}
      {page === "details" && <Details bus={selectedBus} go={go}/>}
      {page === "seats" && <Seats selected={selectedSeats} setSelected={setSelectedSeats} count={passengerCount} fare={selectedBus.fare} gender={seatGender} setGender={setSeatGender} error={error} setError={setError} next={() => selectedSeats.length === passengerCount ? go("boarding") : setError("Please select the required number of seats.")}/>}
      {page === "boarding" && <PointPage kind="boarding" selected={boarding} setSelected={setBoarding} error={error} next={() => boarding ? go("dropping") : setError("Please select a boarding point.")}/>}
      {page === "dropping" && <PointPage kind="dropping" selected={dropping} setSelected={setDropping} error={error} next={() => dropping ? go("passengers") : setError("Please select a dropping point.")}/>}
      {page === "passengers" && <PassengerPage seats={selectedSeats} count={passengerCount} form={form} update={update} error={error} next={() => requireFields(selectedSeats.flatMap(s => [`name${s}`, `age${s}`, `gender${s}`, `id${s}`]).concat(["mobile", "email"]), "Please complete all passenger and contact details.", "fare")}/>}
      {page === "fare" && <Fare bus={selectedBus} date={date} seats={selectedSeats} boarding={boarding} dropping={dropping} base={total} total={grandTotal} policy={policy} setPolicy={setPolicy} error={error} next={() => policy ? go("payment") : setError("Please agree to the booking and cancellation policy.")}/>}
      {page === "payment" && <Payment total={grandTotal} method={paymentMethod} setMethod={setPaymentMethod} form={form} update={update} error={error} pay={() => { const keys = paymentMethod === "UPI" ? ["upi"] : paymentMethod.includes("Card") ? ["cardNo", "cardName", "expiry", "cvv"] : ["paymentChoice"]; requireFields(keys, "Please complete the required payment information.", "processing"); }}/>}
      {page === "processing" && <Processing/>}
      {page === "confirmation" && <Confirmation go={go} date={date} seats={selectedSeats} boarding={boarding} dropping={dropping} total={grandTotal} form={form} notify={notify}/>}
      {page === "bookings" && <Bookings status={bookingStatus} tab={bookingTab} setTab={setBookingTab} go={go} date={date} seats={selectedSeats} total={grandTotal} cancel={() => setCancelModal(true)}/>}
      {page === "tracking" && <Tracking go={go}/>}
      {page === "routes" && <Routes go={go} setTo={setTo}/>}
      {page === "alerts" && <Alerts/>}
      {page === "profile" && <Profile form={form} update={update} notify={notify} go={go}/>}
      {page === "support" && <Support/>}
      {page === "reschedule" && <Reschedule date={date} setDate={setDate} go={go} notify={notify}/>}
    </main>
    {cancelModal && <CancelModal close={() => setCancelModal(false)} confirm={() => { setBookingStatus("cancelled"); setBookingTab("Cancelled"); setCancelModal(false); notify("Cancellation successful. Refund of ₹1,726 initiated."); }}/>}
  </div>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`brand ${light ? "brand-light" : ""}`}><span className="logo-mark"><Icon name="bus" size={22}/></span><span><b>BusGo</b><small>Book. Track. Travel.</small></span></div>;
}

function Header({ page, go, profileOpen, setProfileOpen }: { page: Page; go: (p: Page) => void; profileOpen: boolean; setProfileOpen: (v: boolean) => void }) {
  return <header className="topbar"><Logo/><nav>{nav.map(([p, label, icon], i) => <button key={`${label}${i}`} className={(page === p || (label === "Book Bus" && ["results","details","seats","boarding","dropping","passengers","fare","payment"].includes(page))) ? "active" : ""} onClick={() => go(p)}><Icon name={icon} size={17}/>{label}</button>)}</nav><div className="header-actions"><button className="icon-button" onClick={() => go("alerts")}><Icon name="bell"/><span className="dot"/></button><button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}><span className="avatar">AK</span><span><b>Arun Kumar</b><small>Traveller</small></span><Icon name="chevron" size={15}/></button>{profileOpen && <div className="profile-menu">{[["profile","My Profile","user"],["profile","Saved Passengers","users"],["profile","Payment Methods","card"],["alerts","Notifications","bell"],["support","Help & Support","help"],["login","Logout","logout"]].map(([p,l,i]) => <button key={l} onClick={() => go(p as Page)}><Icon name={i as IconName} size={18}/>{l}</button>)}</div>}</div></header>;
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="auth"><section className="auth-visual"><Logo light/><div className="auth-copy"><span className="eyebrow light">India's smarter way to travel</span><h1>Your journey<br/>starts here.</h1><p>Book, track, and travel with confidence across 2,500+ destinations.</p></div><BusIllustration/><div className="trust-row"><span><b>10M+</b>Happy travellers</span><span><b>25K+</b>Daily trips</span><span><b>4.8/5</b>App rating</span></div></section><section className="auth-panel">{children}</section></div>;
}

function BusIllustration() {
  return <div className="bus-scene"><div className="moon"/><div className="road-line"/><div className="bus-art"><div className="bus-window"/><div className="bus-window second"/><span>BUSGO</span><i/><i/></div></div>;
}

function Login({ go, form, update, error, setError }: any) {
  const submit = () => (!form.login || !form.password) ? setError("Please enter a valid email/mobile number and password.") : go("otp");
  return <AuthLayout><div className="auth-card"><span className="eyebrow">Welcome to BusGo</span><h2>Welcome back</h2><p className="muted">Sign in to manage your trips and bookings.</p><Field label="Mobile number or email" value={form.login || ""} onChange={v => update("login", v)} placeholder="name@example.com"/><Field label="Password" type="password" value={form.password || ""} onChange={v => update("password", v)} placeholder="Enter your password"/><div className="split-line"><label className="check"><input type="checkbox"/> Remember me</label><button className="text-button" onClick={() => go("reset")}>Forgot password?</button></div>{error && <ErrorText text={error}/>}<Button onClick={submit}>Login securely <Icon name="arrow" size={18}/></Button><div className="divider"><span>or</span></div><Button variant="secondary" onClick={() => go("home")}>Continue as guest</Button><p className="auth-foot">New to BusGo? <button className="text-button" onClick={() => go("register")}>Create an account</button></p></div></AuthLayout>;
}

function Register({ go, form, update, error, setError }: any) {
  const [agree, setAgree] = useState(false);
  const submit = () => {
    if (!form.regName || !form.regEmail || !form.regMobile || !form.regPassword || !agree) return setError("Please complete all fields and accept the terms.");
    if (form.regPassword !== form.regConfirm) return setError("Passwords do not match.");
    go("otp");
  };
  return <AuthLayout><div className="auth-card register-card"><button className="back-link" onClick={() => go("login")}>← Back to login</button><span className="eyebrow">Join BusGo</span><h2>Create your BusGo account</h2><div className="form-grid"><Field label="Full name" value={form.regName || ""} onChange={v => update("regName", v)} placeholder="Arun Kumar"/><Field label="Email" value={form.regEmail || ""} onChange={v => update("regEmail", v)} placeholder="arun@example.com"/><Field label="Mobile number" value={form.regMobile || ""} onChange={v => update("regMobile", v)} placeholder="+91 98765 43210"/><Field label="Password" type="password" value={form.regPassword || ""} onChange={v => update("regPassword", v)} placeholder="Minimum 8 characters"/><Field label="Confirm password" type="password" value={form.regConfirm || ""} onChange={v => update("regConfirm", v)} placeholder="Re-enter password"/></div><label className="check"><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}/> I agree to the Terms & Conditions</label>{error && <ErrorText text={error}/>}<Button onClick={submit}>Create account</Button><p className="auth-foot">Already have an account? <button className="text-button" onClick={() => go("login")}>Login</button></p></div></AuthLayout>;
}

function Reset({ go, form, update, error, setError }: any) {
  return <AuthLayout><div className="auth-card"><button className="back-link" onClick={() => go("login")}>← Back to login</button><span className="icon-bubble"><Icon name="shield" size={28}/></span><h2>Reset your password</h2><p className="muted">We'll send a secure reset link to your registered account.</p><Field label="Mobile number or email" value={form.reset || ""} onChange={v => update("reset", v)} placeholder="name@example.com"/>{error && <ErrorText text={error}/>}<Button onClick={() => form.reset ? (setError(""), go("login")) : setError("Please enter your email or mobile number.")}>Send reset link</Button></div></AuthLayout>;
}

function Otp({ go, form, update, error, setError, notify }: any) {
  const otp = form.otp || "";
  return <AuthLayout><div className="auth-card otp-card"><span className="icon-bubble"><Icon name="shield" size={28}/></span><h2>Verify your account</h2><p className="muted">Enter the 6-digit OTP sent to <b>+91 98••• ••210</b></p><div className="otp-boxes">{[0,1,2,3,4,5].map(i => <input key={i} maxLength={1} inputMode="numeric" value={otp[i] || ""} onChange={e => { const v = e.target.value.replace(/\D/g,""); update("otp", otp.slice(0,i)+v+otp.slice(i+1)); }}/>)}</div>{error && <ErrorText text={error}/>}<Button onClick={() => otp.length === 6 ? go("home") : setError("Please enter the complete 6-digit OTP.")}>Verify OTP</Button><p className="auth-foot">Didn't receive it? <button className="text-button" onClick={() => notify("A new OTP has been sent.")}>Resend OTP</button></p></div></AuthLayout>;
}

function Home({ from, to, date, count, setFrom, setTo, setDate, setCount, search, error }: any) {
  const routes = [["Bangalore","₹699","18"],["Coimbatore","₹549","24"],["Madurai","₹599","15"],["Pondicherry","₹349","20"]];
  return <><section className="hero"><div className="hero-content"><span className="eyebrow light">Seamless journeys, every time</span><h1>Where do you want to go?</h1><p>Find your bus, choose your seat, and travel with confidence.</p></div><div className="hero-orbit"><Icon name="bus" size={42}/></div></section><section className="search-card"><SearchField icon="pin" label="FROM"><select value={from} onChange={e => setFrom(e.target.value)}>{["Chennai Central","Koyambedu Bus Stand","Guindy","Tambaram","Velachery"].map(x => <option key={x}>{x}</option>)}</select><small>Chennai, Tamil Nadu</small></SearchField><button className="swap" onClick={() => { const a=from; setFrom(to); setTo(a); }}><Icon name="swap"/></button><SearchField icon="pin" label="TO"><select value={to} onChange={e => setTo(e.target.value)}>{["Bangalore Majestic","Electronic City","Hosur","Whitefield","Silk Board","Chennai Central"].map(x => <option key={x}>{x}</option>)}</select><small>Karnataka</small></SearchField><SearchField icon="calendar" label="DATE"><input type="date" value={date} onChange={e => setDate(e.target.value)}/><small>{formatDate(date)}</small></SearchField><SearchField icon="users" label="PASSENGERS"><div className="counter"><button onClick={() => setCount(Math.max(1,count-1))}>−</button><b>{count}</b><button onClick={() => setCount(Math.min(6,count+1))}>+</button></div><small>Maximum 6 travellers</small></SearchField><Button onClick={search}>Search buses <Icon name="arrow" size={18}/></Button></section>{error && <ErrorText text={error}/>}<section className="content-section"><SectionTitle eyebrow="Travel favourites" title="Popular routes" action="Explore all routes"/><div className="route-grid">{routes.map(([city, fare, buses]) => <article className="route-card" key={city}><div className="route-visual"><span>MAA</span><div><i/><Icon name="bus"/><i/></div><span>{city.slice(0,3).toUpperCase()}</span></div><h3>Chennai <Icon name="arrow" size={16}/> {city}</h3><p>From <b>{fare}</b> <span>• {buses} buses daily</span></p><Button variant="secondary" onClick={search}>View buses</Button></article>)}</div></section><section className="benefits"><div><Icon name="shield" size={28}/><span><b>Safe & verified</b><small>Trusted operators only</small></span></div><div><Icon name="pin" size={28}/><span><b>Live tracking</b><small>Know exactly where you are</small></span></div><div><Icon name="card" size={28}/><span><b>Secure payments</b><small>100% protected checkout</small></span></div><div><Icon name="help" size={28}/><span><b>24/7 support</b><small>We're always here to help</small></span></div></section></>;
}

function SearchField({ icon, label, children }: { icon: IconName; label: string; children: React.ReactNode }) { return <div className="search-field"><Icon name={icon}/><div><label>{label}</label>{children}</div></div>; }
function SectionTitle({ eyebrow, title, action }: { eyebrow: string; title: string; action?: string }) { return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action && <button className="text-button">{action} →</button>}</div>; }
function ErrorText({ text }: { text: string }) { return <div className="error-text">! &nbsp;{text}</div>; }

function Results({ from, to, date, count, filters, setFilters, choose }: any) {
  const toggle = (x: string) => setFilters((f: string[]) => f.includes(x) ? f.filter(y => y !== x) : [...f,x]);
  const visible = busData.filter(b => !filters.includes("Sleeper") || b.type.includes("Sleeper"));
  return <div className="page"><PageHead crumb="Home / Search results" title="Available buses" subtitle={`${from} → ${to} · ${formatDate(date)} · ${count} Passengers`}/><div className="results-layout"><aside className="filter-panel"><div className="filter-head"><h3>Filters</h3><button onClick={() => setFilters([])}>Clear all</button></div>{[["Bus type",["AC","Non-AC","Sleeper","Seater"]],["Departure time",["Before 6 PM","6 PM – 10 PM","After 10 PM"]],["Bus operator",["Chennai Express","GreenLine Travels","City Rider"]],["Rating",["4.5 & above","4.0 & above"]]].map(([title,opts]: any) => <div className="filter-group" key={title}><b>{title}</b>{opts.map((o:string) => <label className="check" key={o}><input type="checkbox" checked={filters.includes(o)} onChange={() => toggle(o)}/>{o}</label>)}</div>)}<div className="filter-group"><b>Price range</b><input className="range" type="range" min="300" max="1500" defaultValue="1100"/><small>₹300 — ₹1,500</small></div></aside><section className="results"><div className="result-tools"><span><b>{visible.length} buses</b> found for your journey</span><select><option>Recommended</option><option>Lowest fare</option><option>Highest rated</option></select></div>{visible.map((bus,i) => <BusCard key={bus.name} bus={bus} recommended={i===0} onClick={() => choose(bus)}/>)}</section></div></div>;
}

function BusCard({ bus, recommended, onClick }: any) {
  return <article className="bus-card">{recommended && <span className="recommended">BEST VALUE</span>}<div className="bus-card-top"><div className="operator"><span className="operator-logo"><Icon name="bus"/></span><div><h3>{bus.name}</h3><p>{bus.type} · 2+2</p></div></div><div className="rating"><Icon name="star" size={15}/> {bus.rating}<small> 1.2k reviews</small></div></div><div className="journey-row"><div><b>{bus.depart}</b><span>Chennai</span></div><div className="journey-line"><small>{bus.duration}</small><i/><Icon name="bus" size={18}/><i/></div><div><b>{bus.arrive}</b><span>Bangalore <small>+1 day</small></span></div><div className="fare"><small>Starting from</small><strong>₹{bus.fare}</strong><span>per seat</span></div></div><div className="bus-card-foot"><div className="amenities"><span><Icon name="wifi" size={15}/> Wi-Fi</span><span><Icon name="bolt" size={15}/> Charging</span><span>◉ Water</span><button>+3 more</button></div><div><span className="seats-left">{bus.seats} seats left</span><Button onClick={onClick}>View seats</Button></div></div></article>;
}

function PageHead({ crumb, title, subtitle }: { crumb?: string; title: string; subtitle?: string }) { return <header className="page-head">{crumb && <span>{crumb}</span>}<h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</header>; }

function Details({ bus, go }: any) {
  const [tab,setTab]=useState("Overview");
  return <div className="page"><PageHead crumb="Search results / Bus details" title={bus.name} subtitle="Chennai → Bangalore · 15 October 2026"/><div className="details-grid"><section><div className="bus-hero-image"><div className="big-bus"><span>BUSGO</span><i/><i/><i/></div><div className="image-badge"><Icon name="shield"/> Verified premium operator</div></div><div className="tabs">{["Overview","Boarding points","Cancellation policy","Reviews"].map(t => <button className={tab===t?"active":""} onClick={() => setTab(t)} key={t}>{t}</button>)}</div><div className="detail-card">{tab === "Overview" ? <><h3>About this bus</h3><p>Travel overnight in a clean, climate-controlled semi-sleeper coach operated by an experienced crew.</p><div className="amenity-grid">{[["wifi","Wi-Fi"],["bolt","Charging point"],["card","Water bottle"],["shield","Blanket"],["eye","Reading light"],["pin","Live tracking"]].map(([i,l]) => <span key={l}><Icon name={i as IconName}/>{l}</span>)}</div></> : tab === "Boarding points" ? <Timeline items={["08:15 PM · Chennai Central","08:35 PM · Koyambedu Bus Stand","08:55 PM · Guindy"]}/> : tab === "Cancellation policy" ? <Policy/> : <><h3>Passenger reviews</h3><p>“Clean bus, polite staff and right on time.” — Priya S. &nbsp; ★ 4.5</p></>}</div></section><aside className="trip-summary"><span className="rating large"><Icon name="star"/> {bus.rating} <small>/ 5</small></span><h3>Trip summary</h3><div className="time-summary"><div><b>{bus.depart}</b><small>Chennai</small></div><div><span>{bus.duration}</span><i/></div><div><b>{bus.arrive}</b><small>Bangalore</small></div></div><dl><div><dt>Bus type</dt><dd>AC Semi-Sleeper 2+2</dd></div><div><dt>Seats available</dt><dd className="green">{bus.seats} seats</dd></div><div><dt>Fare per seat</dt><dd>₹{bus.fare}</dd></div></dl><Button variant="secondary" onClick={() => notifyRoute()}>View route</Button><Button onClick={() => go("seats")}>Select seats <Icon name="arrow" size={17}/></Button><p><Icon name="shield" size={15}/> Free cancellation within 24 hours</p></aside></div></div>;
}
const notifyRoute = () => window.alert("Route: Chennai Central → Koyambedu → Guindy → Hosur → Electronic City → Bangalore Majestic");

function Seats({ selected, setSelected, count, fare, gender, setGender, error, setError, next }: any) {
  const booked=[3,7,8,18,22,29,34,41,47], ladies=[11,12,31], blocked=[25,50];
  const click=(n:number)=>{
    if(booked.includes(n)) return setError("This seat is already booked. Please choose another seat.");
    if(blocked.includes(n)) return setError("This seat is blocked by the operator.");
    if(ladies.includes(n) && gender !== "Female") return setError("This seat is reserved for female passengers.");
    if(selected.includes(n)) { setSelected(selected.filter((x:number)=>x!==n)); setError(""); }
    else if(selected.length>=count) setError(`You can select only ${count} seats.`);
    else { setSelected([...selected,n]); setError(""); }
  };
  return <div className="page"><PageHead crumb="Bus details / Seat selection" title="Choose your seats" subtitle="Chennai → Bangalore · Chennai Express · AC Semi-Sleeper 2+2"/><div className="seat-layout"><section className="seat-map-card"><div className="seat-toolbar"><div className="seat-legend">{[["available","Available"],["selected","Selected"],["booked","Booked"],["ladies","Ladies only"],["blocked","Blocked"]].map(([c,l]) => <span key={c}><i className={c}/>{l}</span>)}</div><label>Passenger eligibility <select value={gender} onChange={e => { setGender(e.target.value); setError(""); }}><option>Male</option><option>Female</option></select></label></div><div className="bus-shell"><div className="driver"><span><Icon name="bus" size={28}/> DRIVER CABIN</span><i>◉</i></div><div className="window-labels"><span>WINDOW</span><span>AISLE</span><span>WINDOW</span></div><div className="seat-grid">{Array.from({length:52},(_,i)=>i+1).map(n => { const state=booked.includes(n)?"booked":blocked.includes(n)?"blocked":ladies.includes(n)?"ladies":selected.includes(n)?"selected":"available"; return <button key={n} className={`seat ${state}`} onClick={() => click(n)} title={`Seat ${n} — ${state}`}><span>{n}</span><i/><i/></button>; })}</div><div className="bus-rear">REAR</div></div></section><aside className="booking-summary"><span className="eyebrow">Booking summary</span><h3>Your journey</h3><div className="mini-route"><i/><div><b>Chennai</b><small>09:00 PM · 15 Oct</small><b>Bangalore</b><small>06:00 AM · 16 Oct</small></div></div><hr/><div className="selected-list"><span>Selected seats <b>{selected.length}/{count}</b></span><div>{selected.length ? selected.map((n:number)=><i key={n}>{n}</i>) : <small>No seats selected yet</small>}</div></div><dl><div><dt>Passengers</dt><dd>{count}</dd></div><div><dt>Base fare</dt><dd>₹{fare*selected.length}</dd></div></dl>{error && <ErrorText text={error}/>}<div className="summary-total"><span>Total</span><b>₹{fare*selected.length}</b></div><Button disabled={selected.length!==count} onClick={next}>Continue <Icon name="arrow" size={17}/></Button><p className="secure-note"><Icon name="shield" size={15}/> Secure seat selection</p></aside></div></div>;
}

const points = {
  boarding: [["Chennai Central","08:15 PM","Main entrance","Near Central Railway Station"],["Koyambedu Bus Stand","08:35 PM","Platform 12","Koyambedu Bus Terminus"],["Guindy","08:55 PM","Near Kathipara Junction",""]],
  dropping: [["Hosur","05:30 AM","Hosur Bus Stand",""],["Electronic City","06:00 AM","Toll Gate",""],["Bangalore Majestic","06:30 AM","KBS Terminal 2",""],["Silk Board","06:15 AM","Bus Stop",""]],
};
function PointPage({ kind, selected, setSelected, error, next }: any) {
  const boarding=kind==="boarding";
  return <div className="page narrow"><PageHead crumb={`Seat selection / ${boarding?"Boarding":"Dropping"} point`} title={`Select ${boarding?"boarding":"dropping"} point`} subtitle="Choose the most convenient stop for your journey."/><div className="point-layout"><section className="point-card"><div className="route-banner"><span>Chennai</span><i/><Icon name="bus"/><i/><span>Bangalore</span></div>{points[kind as keyof typeof points].map(([name,time,place,address],i)=><button className={`point-option ${selected===name?"active":""}`} onClick={()=>setSelected(name)} key={name}><span className="radio"/><div className="timeline-dot">{i+1}</div><div><b>{name}</b><small>{place}{address && ` · ${address}`}</small></div><strong>{time}</strong></button>)}{error&&<ErrorText text={error}/>}<div className="point-actions"><Button disabled={!selected} onClick={next}>Continue to {boarding?"dropping point":"passenger details"} <Icon name="arrow" size={17}/></Button></div></section><aside className="info-card"><Icon name="clock" size={28}/><h3>Arrive 15 minutes early</h3><p>Please be at your selected point before the scheduled departure time.</p></aside></div></div>;
}

function PassengerPage({ seats, count, form, update, error, next }: any) {
  const actualSeats=seats.length?seats:Array.from({length:count},(_,i)=>i+1);
  return <div className="page narrow"><PageHead crumb="Dropping point / Passenger details" title="Passenger details" subtitle="Enter details exactly as shown on a valid government ID."/><div className="passenger-layout"><section>{actualSeats.map((s:number,i:number)=><div className="form-card" key={s}><div className="form-card-head"><span className="number">{i+1}</span><div><h3>Passenger {i+1}</h3><small>Seat {s} · AC Semi-Sleeper</small></div></div><div className="form-grid cols-2"><Field label="Full name" value={form[`name${s}`]||""} onChange={v=>update(`name${s}`,v)} placeholder="As per government ID"/><Field label="Age" type="number" value={form[`age${s}`]||""} onChange={v=>update(`age${s}`,v)} placeholder="Age"/><SelectField label="Gender" value={form[`gender${s}`]||""} onChange={(v:string)=>update(`gender${s}`,v)} options={["Select gender","Male","Female","Other"]}/><SelectField label="ID type" value={form[`idType${s}`]||""} onChange={(v:string)=>update(`idType${s}`,v)} options={["Aadhaar Card","Driving Licence","Passport","Voter ID"]}/><Field label="ID number" value={form[`id${s}`]||""} onChange={v=>update(`id${s}`,v)} placeholder="Enter ID number"/></div></div>)}<div className="form-card"><div className="form-card-head"><span className="number"><Icon name="phone" size={18}/></span><div><h3>Contact information</h3><small>Your ticket will be sent to these details</small></div></div><div className="form-grid cols-2"><Field label="Mobile number" value={form.mobile||""} onChange={v=>update("mobile",v)} placeholder="+91 98765 43210"/><Field label="Email address" value={form.email||""} onChange={v=>update("email",v)} placeholder="name@example.com"/></div><label className="check"><input type="checkbox" defaultChecked/> Send booking details to my email</label></div>{error&&<ErrorText text={error}/>}<div className="right-action"><Button onClick={next}>Continue to fare summary <Icon name="arrow" size={17}/></Button></div></section><aside className="info-card sticky"><Icon name="shield" size={28}/><h3>Your data is secure</h3><p>Passenger details are encrypted and only shared with the bus operator for this trip.</p></aside></div></div>;
}
function SelectField({label,value,onChange,options}:any){return <label className="field"><span>{label}</span><select value={value} onChange={e=>onChange(e.target.value)}>{options.map((x:string)=><option key={x} value={x.startsWith("Select")?"":x}>{x}</option>)}</select></label>}

function Policy(){return <div className="policy"><h3>Cancellation policy</h3>{[["Before 48 hours","90% refund"],["24–48 hours","75% refund"],["12–24 hours","50% refund"],["Below 12 hours","No refund"]].map(([a,b])=><div key={a}><span>{a}</span><b>{b}</b></div>)}</div>}
function Fare({bus,date,seats,boarding,dropping,base,total,policy,setPolicy,error,next}:any){
  return <div className="page narrow"><PageHead crumb="Passenger details / Review booking" title="Review your booking" subtitle="Check your trip details before proceeding to payment."/><div className="fare-layout"><section><div className="ticket-card"><div className="ticket-head"><span className="operator-logo"><Icon name="bus"/></span><div><h3>{bus.name}</h3><p>AC Semi-Sleeper 2+2</p></div><span className="status">ON TIME</span></div><div className="ticket-route"><div><b>09:00 PM</b><span>Chennai</span><small>{formatDate(date)}</small></div><div><small>9h overnight</small><i/><Icon name="bus"/></div><div><b>06:00 AM</b><span>Bangalore</span><small>16 October 2026</small></div></div><div className="ticket-meta"><span><small>SEATS</small><b>{seats.join(", ")}</b></span><span><small>BOARDING</small><b>{boarding||"Chennai Central"}</b></span><span><small>DROPPING</small><b>{dropping||"Bangalore Majestic"}</b></span></div></div><Policy/></section><aside className="booking-summary fare-summary"><span className="eyebrow">Fare details</span><h3>Price breakdown</h3><dl><div><dt>Base fare ({seats.length||2} seats)</dt><dd>₹{base}</dd></div><div><dt>GST (5%)</dt><dd>₹{Math.round(base*.05)}</dd></div><div><dt>Convenience fee</dt><dd>₹30</dd></div></dl><div className="summary-total"><span>Total amount</span><b>₹{total}</b></div><label className="check policy-check"><input type="checkbox" checked={policy} onChange={e=>setPolicy(e.target.checked)}/> I agree to the booking and cancellation policy</label>{error&&<ErrorText text={error}/>}<Button disabled={!policy} onClick={next}>Proceed to payment <Icon name="arrow" size={17}/></Button><p className="secure-note"><Icon name="shield" size={15}/> 100% secure checkout</p></aside></div></div>
}

function Payment({total,method,setMethod,form,update,error,pay}:any){
  const methods=[["UPI","bolt"],["Credit Card","card"],["Debit Card","card"],["Net Banking","shield"],["Wallet","user"]];
  return <div className="page narrow"><PageHead crumb="Review booking / Payment" title="Secure payment" subtitle="Complete your payment to confirm the booking."/><div className="payment-layout"><section className="payment-card"><div className="payment-methods">{methods.map(([m,i])=><button className={method===m?"active":""} onClick={()=>setMethod(m)} key={m}><Icon name={i as IconName}/><span>{m}</span>{method===m&&<Icon name="check" size={15}/>}</button>)}</div><div className="payment-form"><span className="secure-label"><Icon name="shield" size={16}/> Your payment information is encrypted</span><h3>Pay with {method}</h3>{method==="UPI"?<><Field label="UPI ID" value={form.upi||""} onChange={v=>update("upi",v)} placeholder="name@bank"/><div className="upi-apps"><button>G Pay</button><button>PhonePe</button><button>Paytm</button></div></>:method.includes("Card")?<div className="form-grid cols-2"><div className="wide"><Field label="Card number" value={form.cardNo||""} onChange={v=>update("cardNo",v)} placeholder="1234 5678 9012 3456"/></div><div className="wide"><Field label="Card holder name" value={form.cardName||""} onChange={v=>update("cardName",v)} placeholder="Name on card"/></div><Field label="Expiry date" value={form.expiry||""} onChange={v=>update("expiry",v)} placeholder="MM / YY"/><Field label="CVV" type="password" value={form.cvv||""} onChange={v=>update("cvv",v)} placeholder="•••"/></div>:<SelectField label={method==="Net Banking"?"Select bank":"Select wallet"} value={form.paymentChoice||""} onChange={(v:string)=>update("paymentChoice",v)} options={method==="Net Banking"?["Select bank","HDFC Bank","State Bank of India","ICICI Bank","Axis Bank"]:["Select wallet","Amazon Pay","Paytm","Mobikwik"]}/>} {error&&<ErrorText text={error}/>}<Button onClick={pay}>Pay ₹{total} securely <Icon name="arrow" size={17}/></Button></div></section><aside className="amount-card"><small>Total amount</small><strong>₹{total}</strong><span>Chennai → Bangalore</span><hr/><p><Icon name="shield"/> PCI DSS compliant</p><p><Icon name="check"/> Instant confirmation</p><p><Icon name="help"/> 24/7 payment support</p></aside></div></div>
}

function Processing(){return <div className="process-screen"><div className="spinner"><Icon name="card" size={32}/></div><span className="eyebrow">Secured by BusGo Pay</span><h1>Processing your payment</h1><p>Please do not close this window or press the back button.</p><div className="process-steps"><span className="done"><Icon name="check"/>Payment initiated</span><i/><span className="current">Bank verification</span><i/><span>Confirmation</span></div></div>}

function Confirmation({go,date,seats,boarding,dropping,total,form,notify}:any){
  return <div className="page confirmation"><div className="success-mark"><Icon name="check" size={42}/></div><span className="eyebrow green-text">Payment successful</span><h1>Booking confirmed!</h1><p>Your bus ticket has been successfully booked and sent to your email.</p><div className="confirmation-grid"><section className="ticket-full"><div className="ticket-top"><Logo/><div><small>PNR NUMBER</small><strong>BG8K29P4</strong></div></div><div className="ticket-title"><div><h2>Chennai <Icon name="arrow"/> Bangalore</h2><p>{formatDate(date)} · Overnight journey</p></div><span className="status">CONFIRMED</span></div><div className="ticket-route large"><div><b>09:00 PM</b><span>Chennai</span><small>{boarding||"Chennai Central"}</small></div><div><small>9h</small><i/><Icon name="bus" size={25}/></div><div><b>06:00 AM</b><span>Bangalore</span><small>{dropping||"Bangalore Majestic"}</small></div></div><div className="ticket-meta grid4"><span><small>BUS</small><b>Chennai Express</b></span><span><small>BUS TYPE</small><b>AC Semi-Sleeper 2+2</b></span><span><small>SEATS</small><b>{seats.join(", ")||"12, 13"}</b></span><span><small>TOTAL PAID</small><b>₹{total}</b></span></div><div className="passenger-ticket"><div><small>PASSENGERS</small><b>{seats.map((s:number)=>form[`name${s}`]||`Passenger ${s}`).join(" · ")||"Arun Kumar · Priya Kumar"}</b><span>Bus reg. TN 01 AB 1234 · Reporting time 08:45 PM</span></div><Qr/></div></section><aside className="confirmation-actions"><h3>What's next?</h3><Button onClick={()=>notify("Ticket downloaded successfully.")} icon="download">Download ticket</Button><Button variant="secondary" onClick={()=>go("bookings")} icon="eye">View booking</Button><Button variant="secondary" onClick={()=>go("tracking")} icon="pin">Track bus</Button><Button variant="ghost" onClick={()=>go("home")} icon="home">Go to home</Button><div className="support-mini"><Icon name="help"/><span><b>Need help?</b><small>Customer support is available 24/7</small></span></div></aside></div></div>
}
function Qr(){return <div className="qr" aria-label="QR ticket code">{Array.from({length:49},(_,i)=><i key={i} className={(i*7+i%5)%3===0||[0,1,7,8,40,41,47,48].includes(i)?"fill":""}/>)}</div>}

function Bookings({status,tab,setTab,go,date,seats,total,cancel}:any){
  return <div className="page"><PageHead crumb="Home / My bookings" title="My bookings" subtitle="Manage your journeys, tickets, cancellations, and refunds."/><div className="booking-tabs">{["Upcoming","Completed","Cancelled"].map(t=><button className={tab===t?"active":""} onClick={()=>setTab(t)} key={t}>{t}<span>{t===(status==="cancelled"?"Cancelled":"Upcoming")?1:0}</span></button>)}</div>{tab===(status==="cancelled"?"Cancelled":"Upcoming")?<article className="my-booking"><div className="booking-strip"><span className={`status ${status}`}>{status==="cancelled"?"CANCELLED":"CONFIRMED"}</span><span>PNR <b>BG8K29P4</b></span><small>Booked on 02 Sep 2026</small></div><div className="booking-body"><div className="booking-operator"><span className="operator-logo"><Icon name="bus"/></span><div><h3>Chennai Express</h3><p>AC Semi-Sleeper 2+2</p></div></div><div className="booking-route"><div><b>09:00 PM</b><span>Chennai</span><small>{formatDate(date)}</small></div><i/><Icon name="arrow"/><div><b>06:00 AM</b><span>Bangalore</span><small>16 October 2026</small></div></div><div className="booking-data"><span><small>SEATS</small><b>{seats.join(", ")||"12, 13"}</b></span><span><small>PAID</small><b>₹{total}</b></span></div></div>{status==="upcoming"&&<div className="booking-actions"><Button variant="secondary" onClick={()=>go("confirmation")} icon="eye">View ticket</Button><Button variant="secondary" onClick={()=>go("tracking")} icon="pin">Track bus</Button><button className="text-danger" onClick={cancel}>Cancel booking</button><Button variant="ghost" onClick={()=>go("reschedule")} icon="calendar">Reschedule</Button></div>}{status==="cancelled"&&<div className="refund-note"><Icon name="check"/> Refund of ₹1,726 initiated to your original payment method.</div>}</article>:<div className="empty-state"><span className="icon-bubble"><Icon name="ticket" size={30}/></span><h3>No {tab.toLowerCase()} bookings</h3><p>Your {tab.toLowerCase()} trips will appear here.</p><Button onClick={()=>go("home")}>Book a bus</Button></div>}</div>
}

function CancelModal({close,confirm}:any){return <div className="modal-backdrop"><div className="modal"><button className="modal-close" onClick={close}><Icon name="close"/></button><span className="danger-icon">!</span><h2>Cancel booking?</h2><p>This action cannot be undone. Please review the refund details.</p><div className="cancel-info"><span>PNR <b>BG8K29P4</b></span><span>Seats <b>12, 13</b></span><hr/><span>Total paid <b>₹1,918</b></span><span>Cancellation charge <b className="red">− ₹192</b></span><strong>Estimated refund <b>₹1,726</b></strong></div><div className="modal-actions"><Button variant="secondary" onClick={close}>Keep booking</Button><Button variant="danger" onClick={confirm}>Cancel booking</Button></div></div></div>}

function Tracking({go}:any){return <div className="page"><PageHead crumb="My bookings / Live tracking" title="Live bus tracking" subtitle="Chennai Express · Chennai → Bangalore"/><div className="tracking-layout"><section className="map"><div className="map-grid"/><div className="map-label label-start">Chennai</div><div className="map-label label-stop">Vellore</div><div className="map-label label-current">Hosur</div><div className="map-label label-end">Bangalore</div><svg viewBox="0 0 800 480"><path className="route-shadow" d="M95 380 C210 300,255 335,350 235 S565 250,700 95"/><path className="route-path" d="M95 380 C210 300,255 335,350 235 S565 250,700 95"/></svg><span className="map-pin start"><i/></span><span className="map-pin stop"><i/></span><span className="map-pin end"><i/></span><span className="moving-bus"><Icon name="bus" size={26}/></span><div className="map-controls"><button>+</button><button>−</button></div></section><aside className="tracking-card"><div className="tracking-status"><span className="pulse"/><div><small>LIVE STATUS</small><b>On time</b></div><span>Updated 2 min ago</span></div><h3>Chennai Express</h3><p>TN 01 AB 1234 · AC Semi-Sleeper</p><div className="track-timeline"><i/><div><small>CURRENT LOCATION</small><b>Hosur</b><span>Near Hosur Bus Stand</span><small>NEXT STOP</small><b>Electronic City</b><span>ETA in 45 minutes</span></div></div><div className="track-stats"><span><Icon name="clock"/><b>45 min</b><small>ETA</small></span><span><Icon name="route"/><b>62 km/h</b><small>Speed</small></span></div><Button variant="secondary" onClick={()=>go("bookings")}>← Back to booking</Button><p className="secure-note"><Icon name="phone"/> Operator support: +91 44 4000 9000</p></aside></div></div>}

function Routes({go,setTo}:any){const rs=[["Bangalore","₹699","18"],["Coimbatore","₹549","24"],["Madurai","₹599","15"],["Pondicherry","₹349","20"],["Hyderabad","₹1,199","8"],["Chennai","₹699","22"]];return <div className="page"><PageHead crumb="Home / Routes" title="Popular routes" subtitle="Discover our most-travelled routes with verified operators and great fares."/><div className="route-grid routes-page">{rs.map(([to,fare,n],i)=><article className="route-card" key={`${to}${i}`}><span className="route-index">0{i+1}</span><div className="route-visual"><span>{i===5?"BLR":"MAA"}</span><div><i/><Icon name="bus"/><i/></div><span>{to.slice(0,3).toUpperCase()}</span></div><h3>{i===5?"Bangalore":"Chennai"} <Icon name="arrow" size={16}/> {to}</h3><p>From <b>{fare}</b> <span>• {n} buses daily</span></p><Button variant="secondary" onClick={()=>{setTo(to);go("results")}}>View buses</Button></article>)}</div></div>}

function Alerts(){const alerts=[["check","Booking confirmed","Your booking BG8K29P4 has been confirmed.","2 min ago","success"],["bus","Bus update","Your Chennai Express bus is on time.","1 hour ago","info"],["clock","Trip reminder","Your bus departs tomorrow at 09:00 PM.","Yesterday","warning"],["bell","Travel alert","Please arrive at the boarding point 15 minutes before departure.","Yesterday","danger"]];return <div className="page narrow"><PageHead crumb="Home / Alerts" title="Notifications & alerts" subtitle="Stay updated with your journeys and account activity."/><div className="alerts-card">{alerts.map(([icon,title,text,time,type])=><article className={`alert-row ${type}`} key={title}><span><Icon name={icon as IconName}/></span><div><h3>{title}</h3><p>{text}</p></div><small>{time}</small><i/></article>)}</div></div>}

function Profile({form,update,notify,go}:any){const [editing,setEditing]=useState(false);return <div className="page narrow"><PageHead crumb="Account / Profile" title="My profile" subtitle="Manage your personal information and travel preferences."/><div className="profile-layout"><aside className="profile-aside"><span className="profile-avatar">AK</span><h3>Arun Kumar</h3><p>Member since August 2024</p><div><span><b>24</b>Trips</span><span><b>6</b>Saved routes</span></div></aside><section className="profile-sections"><div className="form-card"><div className="card-title"><div><h3>Personal information</h3><p>Your contact and identity details</p></div><Button variant="secondary" onClick={()=>setEditing(!editing)}>{editing?"Cancel":"Edit profile"}</Button></div><div className="form-grid cols-2"><Field label="Full name" value={form.profileName||"Arun Kumar"} onChange={v=>update("profileName",v)}/><Field label="Email" value={form.profileEmail||"arun.kumar@example.com"} onChange={v=>update("profileEmail",v)}/><Field label="Mobile number" value={form.profileMobile||"+91 98765 43210"} onChange={v=>update("profileMobile",v)}/></div>{editing&&<Button onClick={()=>{setEditing(false);notify("Profile changes saved.")}}>Save changes</Button>}</div>{[["Saved passengers","2 passengers saved","users"],["Payment methods","1 card · 1 UPI ID","card"],["Notification preferences","Email, SMS and WhatsApp enabled","bell"],["Travel preferences","Window seat · AC buses","route"]].map(([t,s,i])=><button className="settings-row" key={t}><Icon name={i as IconName}/><span><b>{t}</b><small>{s}</small></span><Icon name="chevron"/></button>)}<Button variant="ghost" icon="logout" onClick={()=>go("login")}>Logout</Button></section></div></div>}

function Support(){const [open,setOpen]=useState(0);const qs=[["How can I cancel my booking?","Open My Bookings, select your upcoming trip, and choose Cancel booking. Your eligible refund is shown before confirmation."],["How do I reschedule?","Choose Reschedule on an upcoming booking, then select a new date and bus."],["Where can I find my PNR?","Your PNR appears on the ticket, confirmation screen, email, and My Bookings."],["How does refund work?","Refunds are calculated from the operator's cancellation policy and returned to your original payment method."],["How can I track my bus?","Select Track bus from your booking or the main navigation to see live location and ETA."]];return <div className="page narrow"><PageHead crumb="Account / Help" title="Help & support" subtitle="Find quick answers or connect with our travel support team."/><div className="support-layout"><section className="faq"><span className="eyebrow">Frequently asked questions</span>{qs.map(([q,a],i)=><button className={`faq-item ${open===i?"open":""}`} onClick={()=>setOpen(open===i?-1:i)} key={q}><span><b>{q}</b><Icon name="chevron"/></span>{open===i&&<p>{a}</p>}</button>)}</section><aside className="support-options"><h3>Still need help?</h3><p>Our team is available around the clock.</p><button><Icon name="help"/><span><b>Contact support</b><small>Start a live conversation</small></span></button><button><Icon name="phone"/><span><b>Call operator</b><small>+91 44 4000 9000</small></span></button><button><Icon name="mail"/><span><b>Email support</b><small>help@busgo.in</small></span></button></aside></div></div>}

function Reschedule({date,setDate,go,notify}:any){const [bus,setBus]=useState("Chennai Express · 09:00 PM");return <div className="page narrow"><PageHead crumb="My bookings / Reschedule" title="Reschedule your trip" subtitle="Choose a new date and departure. Your current seats will be released after confirmation."/><div className="reschedule-grid"><section className="form-card"><h3>Current trip</h3><div className="current-trip"><Icon name="bus"/><span><b>Chennai → Bangalore</b><small>15 October 2026 · 09:00 PM · Seats 12, 13</small></span></div><div className="form-grid cols-2"><label className="field"><span>New date</span><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><SelectField label="New bus & departure" value={bus} onChange={setBus} options={["Chennai Express · 09:00 PM","GreenLine Travels · 10:30 PM","City Rider · 08:30 PM"]}/></div><div className="fare-difference"><span>Fare difference</span><b>+ ₹100</b></div><Button onClick={()=>{notify("Trip rescheduled successfully.");go("bookings")}}>Confirm reschedule</Button></section><aside className="info-card"><Icon name="calendar" size={28}/><h3>Flexible travel</h3><p>Your updated ticket and departure information will be sent immediately after confirmation.</p></aside></div></div>}

function Timeline({items}:{items:string[]}){return <div className="simple-timeline">{items.map(x=><span key={x}><i/>{x}</span>)}</div>}
