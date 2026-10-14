import { useEffect, useMemo, useState } from "react";

type Screen =
  | "splash" | "login" | "register" | "reset" | "home" | "search"
  | "categories" | "listing" | "product" | "cart" | "checkout"
  | "payment" | "success" | "orders" | "tracking" | "wishlist"
  | "deals" | "profile" | "help" | "concepts" | "feedback"
  | "addresses" | "methods" | "notifications" | "settings";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  original: number;
  rating: number;
  image: string;
  badge?: string;
};

const photos = {
  headphones: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=85",
  pinkHeadphones: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=900&q=85",
  watch: "https://images.unsplash.com/photo-1580477371194-4593e3c7c6cf?auto=format&fit=crop&w=900&q=85",
  whiteHeadphones: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=900&q=85",
};

const products: Product[] = [
  { id: 1, name: "Wireless Bluetooth Headphones", category: "Electronics", price: 2499, original: 3999, rating: 4.5, image: photos.headphones, badge: "Bestseller" },
  { id: 2, name: "Active Smart Watch", category: "Electronics", price: 3199, original: 4999, rating: 4.7, image: photos.watch, badge: "New" },
  { id: 3, name: "Cloud Wireless Headset", category: "Electronics", price: 1899, original: 2999, rating: 4.3, image: photos.pinkHeadphones },
  { id: 4, name: "Studio Comfort Headphones", category: "Electronics", price: 2199, original: 3499, rating: 4.4, image: photos.whiteHeadphones },
];

const categoryItems = [
  ["Electronics", "devices"], ["Fashion", "shirt"], ["Beauty", "sparkles"],
  ["Home & Kitchen", "home"], ["Sports", "activity"], ["Accessories", "watch"],
];

const navItems: [string, string, Screen][] = [
  ["home", "Home", "home"], ["grid", "Categories", "categories"],
  ["heart", "Wishlist", "wishlist"], ["bag", "Cart", "cart"], ["user", "Profile", "profile"],
];

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

function Icon({ name, size = 20, filled = false }: { name: string; size?: number; filled?: boolean }) {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.7-7.5 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    arrowLeft: <><path d="m15 18-6-6 6-6"/><path d="M9 12h12"/></>,
    arrowRight: <><path d="m9 18 6-6-6-6"/></>,
    plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
    minus: <path d="M5 12h14"/>,
    star: <path d="m12 2 3 6 7 .9-5 4.8 1.2 6.8L12 17.3l-6.2 3.2L7 13.7 2 8.9 9 8l3-6Z"/>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    filter: <path d="M4 6h16M7 12h10M10 18h4"/>,
    sort: <><path d="M8 6h12M8 12h8M8 18h4"/><path d="M4 4v16m0 0-2-2m2 2 2-2"/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3m3 0-1 14H7L6 7"/><path d="M10 11v6M14 11v6"/></>,
    tag: <><path d="m20 13-7 7L4 11V4h7l9 9Z"/><circle cx="8.5" cy="8.5" r="1"/></>,
    truck: <><path d="M3 5h11v12H3zM14 9h4l3 4v4h-7z"/><circle cx="7" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    credit: <><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.8 1.8c-1 .7-1.6 1.2-1.6 2.7M12 17h.01"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M14 3h7v18h-7"/></>,
    package: <><path d="m3 6 9-4 9 4-9 4-9-4Z"/><path d="m3 6 9 4 9-4v12l-9 4-9-4V6Z"/><path d="M12 10v12"/></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    camera: <><rect x="3" y="5" width="18" height="15" rx="3"/><circle cx="12" cy="12.5" r="4"/><path d="m8 5 1-2h6l1 2"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    x: <path d="m6 6 12 12M18 6 6 18"/>,
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.package}</svg>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="logo-wrap"><div className="logo-mark"><Icon name="bag" size={compact ? 17 : 24}/><span>S</span></div>{!compact && <div className="logo-text">Shop<span>Ease</span></div>}</div>;
}

function AppHeader({ title, back, right }: { title: string; back?: () => void; right?: React.ReactNode }) {
  return <div className="app-header">
    {back ? <button className="icon-button" onClick={back} aria-label="Go back"><Icon name="arrowLeft"/></button> : <Logo compact/>}
    <div className="header-title">{title}</div>
    <div className="header-action">{right || <span/>}</div>
  </div>;
}

function BottomNav({ screen, go, count }: { screen: Screen; go: (s: Screen) => void; count: number }) {
  return <nav className="bottom-nav">
    {navItems.map(([icon, label, target]) => <button key={target} onClick={() => go(target)} className={screen === target ? "nav-item active" : "nav-item"}>
      <span className="nav-icon"><Icon name={icon} size={21} filled={target === "heart" && screen === target}/>{target === "cart" && count > 0 && <i>{count}</i>}</span>
      <span>{label}</span>
    </button>)}
  </nav>;
}

function Field({ label, placeholder, type = "text", value, onChange, icon }: { label?: string; placeholder: string; type?: string; value?: string; onChange?: (v: string) => void; icon?: string }) {
  return <label className="field">{label && <span>{label}</span>}<div className="field-control">{icon && <Icon name={icon} size={18}/>}<input type={type} placeholder={placeholder} value={value} onChange={e => onChange?.(e.target.value)}/>{type === "password" && <Icon name="eye" size={18}/>}</div></label>;
}

function PrimaryButton({ children, onClick, variant = "primary", icon, disabled = false }: { children: React.ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: string; disabled?: boolean }) {
  return <button className={`button ${variant}`} onClick={onClick} disabled={disabled}>{icon && <Icon name={icon} size={18}/>}<span>{children}</span></button>;
}

function Toast({ text }: { text: string }) {
  return <div className="toast"><span><Icon name="check" size={14}/></span>{text}</div>;
}

function ProductCard({ product, onOpen, onAdd, wished, onWish, detailed = false }: { product: Product; onOpen: () => void; onAdd: () => void; wished: boolean; onWish: () => void; detailed?: boolean }) {
  const discount = Math.round((1 - product.price / product.original) * 100);
  return <article className={detailed ? "product-card detailed" : "product-card"}>
    <div className="product-image" onClick={onOpen}>
      <img src={product.image} alt={product.name}/>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button className={wished ? "wish active" : "wish"} onClick={(e) => { e.stopPropagation(); onWish(); }} aria-label="Save product"><Icon name="heart" size={17} filled={wished}/></button>
    </div>
    <div className="product-content" onClick={onOpen}>
      <div className="product-name">{product.name}</div>
      <div className="rating"><Icon name="star" size={12} filled/>{product.rating} <span>(238)</span></div>
      {detailed && <div className="micro-spec">40h battery · ANC · Bluetooth 5.3</div>}
      <div className="price-row"><b>{money(product.price)}</b><del>{money(product.original)}</del></div>
      <div className="product-bottom"><span>{discount}% off</span><button onClick={(e) => { e.stopPropagation(); onAdd(); }}><Icon name="plus" size={16}/> Add</button></div>
    </div>
  </article>;
}

function LoginScreen({ go }: { go: (s: Screen) => void }) {
  const [remember, setRemember] = useState(true);
  return <div className="auth-screen">
    <div className="auth-visual"><Logo/><div className="auth-orb orb-one"/><div className="auth-orb orb-two"/></div>
    <div className="auth-card">
      <div className="eyebrow">SHOP SMART. LIVE BETTER.</div>
      <div className="title">Welcome back</div>
      <div className="subtitle">Sign in to continue your shopping journey.</div>
      <Field label="Email or mobile number" placeholder="hello@example.com" icon="mail"/>
      <Field label="Password" placeholder="Enter your password" type="password" icon="lock"/>
      <div className="form-meta"><button className="check-label" onClick={() => setRemember(!remember)}><span className={remember ? "checkbox checked" : "checkbox"}>{remember && <Icon name="check" size={12}/>}</span>Remember me</button><button className="text-link" onClick={() => go("reset")}>Forgot password?</button></div>
      <PrimaryButton onClick={() => go("home")}>Login</PrimaryButton>
      <div className="divider"><span>or</span></div>
      <PrimaryButton variant="secondary" onClick={() => go("register")}>Create Account</PrimaryButton>
      <button className="guest" onClick={() => go("home")}>Continue as Guest <Icon name="arrowRight" size={16}/></button>
    </div>
  </div>;
}

function RegisterScreen({ go }: { go: (s: Screen) => void }) {
  const [agreed, setAgreed] = useState(false);
  return <div className="scroll-screen no-nav"><AppHeader title="Create Account" back={() => go("login")}/>
    <div className="page auth-form"><div className="title">Let’s get started</div><div className="subtitle">Create your ShopEase account in a minute.</div>
      <Field label="Full Name" placeholder="Your full name" icon="user"/><Field label="Email" placeholder="hello@example.com" icon="mail"/>
      <Field label="Mobile Number" placeholder="+91 98765 43210" icon="phone"/><Field label="Password" placeholder="Create a password" type="password" icon="lock"/>
      <Field label="Confirm Password" placeholder="Repeat your password" type="password" icon="lock"/>
      <button className="check-label terms" onClick={() => setAgreed(!agreed)}><span className={agreed ? "checkbox checked" : "checkbox"}>{agreed && <Icon name="check" size={12}/>}</span>I agree to <b>Terms & Conditions</b></button>
      <PrimaryButton onClick={() => go("home")} disabled={!agreed}>Create Account</PrimaryButton>
      <div className="center-note">Already have an account? <button onClick={() => go("login")}>Login</button></div>
    </div>
  </div>;
}

function HomeScreen({ go, add, toggleWish, wishlist }: { go: (s: Screen) => void; add: (p: Product) => void; toggleWish: (p: Product) => void; wishlist: number[] }) {
  return <div className="scroll-screen">
    <div className="home-top">
      <div><div className="welcome">Good morning,</div><Logo/></div>
      <div className="header-icons"><button className="icon-button dot" onClick={() => go("notifications")}><Icon name="bell"/></button><button className="avatar-mini" onClick={() => go("profile")}>AS</button></div>
    </div>
    <main className="page home-page">
      <button className="search-box" onClick={() => go("search")}><Icon name="search"/><span>Search products, brands and more</span><Icon name="filter" size={18}/></button>
      <section className="hero-banner">
        <div className="hero-copy"><span className="sale-kicker">THIS WEEK ONLY</span><div>Mega Sale</div><b>Up to 60% OFF</b><button onClick={() => go("deals")}>Shop Now <Icon name="arrowRight" size={16}/></button></div>
        <div className="hero-product"><img src={photos.pinkHeadphones} alt="Pink headphones sale"/></div>
        <span className="bubble b1"/><span className="bubble b2"/>
      </section>
      <div className="section-head"><div><b>Shop by category</b><span>Find what you love</span></div><button onClick={() => go("categories")}>See all <Icon name="arrowRight" size={14}/></button></div>
      <div className="category-scroll">{categoryItems.map(([name, icon], index) => <button className="category-chip" key={name} onClick={() => go("listing")}><span className={`cat-icon c${index}`}><Icon name={icon}/></span><b>{name.replace(" & Kitchen", "")}</b></button>)}</div>
      <section className="deal-strip" onClick={() => go("deals")}><span><Icon name="tag" size={18}/></span><div><b>Deal of the day</b><small>Ends in 08 : 42 : 18</small></div><strong>View deals</strong></section>
      <div className="section-head"><div><b>Popular products</b><span>Picked for you</span></div><button onClick={() => go("listing")}>See all <Icon name="arrowRight" size={14}/></button></div>
      <div className="product-grid">{products.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onOpen={() => go("product")} onAdd={() => add(p)} wished={wishlist.includes(p.id)} onWish={() => toggleWish(p)}/>)}</div>
      <button className="concept-card" onClick={() => go("concepts")}><span><Icon name="sparkles"/><b>Help shape ShopEase</b><small>Compare our two interface concepts</small></span><Icon name="arrowRight"/></button>
    </main>
  </div>;
}

function SearchScreen({ go, add, wishlist, toggleWish }: { go: (s: Screen) => void; add: (p: Product) => void; wishlist: number[]; toggleWish: (p: Product) => void }) {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const search = () => { if (!query.trim()) setError("Please enter a product name."); else { setError(""); setSubmitted(true); } };
  return <div className="scroll-screen"><AppHeader title="Search Products" back={() => go("home")}/>
    <main className="page">
      <div className="search-input"><Icon name="search"/><input autoFocus value={query} onChange={e => { setQuery(e.target.value); setError(""); }} placeholder="Search for products..."/>{query && <button onClick={() => { setQuery(""); setSubmitted(false); }}><Icon name="x" size={17}/></button>}<button className="search-submit" onClick={search}>Search</button></div>
      {error && <div className="error"><Icon name="help" size={16}/>{error}</div>}
      {!submitted ? <>
        <div className="list-heading">Recent searches <button>Clear all</button></div>
        <div className="search-list">{["Wireless Headphones", "Smart Watch", "Running Shoes"].map(x => <button key={x} onClick={() => { setQuery(x); setSubmitted(true); }}><Icon name="search" size={17}/><span>{x}</span><Icon name="arrowRight" size={15}/></button>)}</div>
        <div className="list-heading">Popular searches</div><div className="tag-cloud">{["Electronics", "Fashion", "Home Appliances", "Skincare", "Bluetooth Speakers"].map(x => <button key={x} onClick={() => { setQuery(x); setSubmitted(true); }}>{x}</button>)}</div>
      </> : <>
        <div className="result-copy"><b>Results for “{query}”</b><span>4 products found</span></div>
        <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p} onOpen={() => go("product")} onAdd={() => add(p)} wished={wishlist.includes(p.id)} onWish={() => toggleWish(p)}/>)}</div>
      </>}
    </main>
  </div>;
}

function CategoriesScreen({ go }: { go: (s: Screen) => void }) {
  return <div className="scroll-screen"><AppHeader title="Categories"/><main className="page">
    <div className="category-hero"><div><span>Explore</span><b>Everything you need,<br/>all in one place.</b></div><Icon name="grid" size={56}/></div>
    <div className="category-grid">{categoryItems.map(([name, icon], i) => <button key={name} className={`category-card card-${i}`} onClick={() => go("listing")}><span><Icon name={icon} size={30}/></span><div><b>{name}</b><small>{i % 2 ? "180+ products" : "240+ products"}</small></div><Icon name="arrowRight" size={17}/></button>)}</div>
  </main></div>;
}

function ListingScreen({ go, add, wishlist, toggleWish }: { go: (s: Screen) => void; add: (p: Product) => void; wishlist: number[]; toggleWish: (p: Product) => void }) {
  const [panel, setPanel] = useState<"filter" | "sort" | null>(null);
  const [sort, setSort] = useState("Popular");
  return <div className="scroll-screen"><AppHeader title="Electronics" back={() => go("categories")} right={<button className="icon-button" onClick={() => go("search")}><Icon name="search"/></button>}/>
    <main className="page">
      <div className="listing-meta"><div><b>Electronics</b><span>128 products</span></div><div className="control-row"><button onClick={() => setPanel("filter")}><Icon name="filter" size={17}/>Filter</button><button onClick={() => setPanel("sort")}><Icon name="sort" size={17}/>{sort}</button></div></div>
      <div className="active-filter"><span>Fast delivery <button>×</button></span><span>4★ & above <button>×</button></span></div>
      <div className="product-grid">{products.map(p => <ProductCard key={p.id} product={p} onOpen={() => go("product")} onAdd={() => add(p)} wished={wishlist.includes(p.id)} onWish={() => toggleWish(p)}/>)}</div>
    </main>
    {panel && <div className="sheet-overlay" onClick={() => setPanel(null)}><div className="bottom-sheet" onClick={e => e.stopPropagation()}><div className="sheet-handle"/><div className="sheet-head"><b>{panel === "filter" ? "Filter products" : "Sort by"}</b><button onClick={() => setPanel(null)}><Icon name="x"/></button></div>
      {panel === "sort" ? <div className="radio-list">{["Popular", "Price Low to High", "Price High to Low", "Rating"].map(x => <button key={x} onClick={() => { setSort(x); setPanel(null); }}><span className={sort === x ? "radio checked" : "radio"}/>{x}</button>)}</div> :
      <div className="filters">{["Price", "Brand", "Rating", "Discount", "Availability"].map((x, i) => <div className="filter-line" key={x}><span><b>{x}</b><small>{i === 0 ? "₹500 – ₹5,000" : "All"}</small></span><Icon name="arrowRight" size={17}/></div>)}<div className="sheet-actions"><PrimaryButton variant="secondary" onClick={() => setPanel(null)}>Clear</PrimaryButton><PrimaryButton onClick={() => setPanel(null)}>Show 128 items</PrimaryButton></div></div>}
    </div></div>}
  </div>;
}

function ProductScreen({ go, add, wished, toggleWish }: { go: (s: Screen) => void; add: (p: Product) => void; wished: boolean; toggleWish: () => void }) {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("Description");
  const p = products[0];
  return <div className="scroll-screen product-screen">
    <div className="product-topbar"><button className="icon-button" onClick={() => go("listing")}><Icon name="arrowLeft"/></button><div><button className={wished ? "icon-button wished" : "icon-button"} onClick={toggleWish}><Icon name="heart" filled={wished}/></button><button className="icon-button"><Icon name="share"/></button></div></div>
    <div className="detail-image"><img src={p.image} alt={p.name}/><div className="image-dots"><i className="active"/><i/><i/></div><span>1 / 3</span></div>
    <main className="page detail-content">
      <div className="brand-line">AUDIOCORE <span>Bestseller</span></div>
      <div className="detail-title">{p.name}</div>
      <div className="detail-rating"><span><Icon name="star" size={13} filled/>4.5</span><b>2,381 ratings</b><i>In stock</i></div>
      <div className="detail-price"><b>{money(p.price)}</b><del>{money(p.original)}</del><span>37% OFF</span></div>
      <div className="pay-note">Inclusive of all taxes · EMI from ₹121/month</div>
      <div className="service-row"><div><span><Icon name="truck"/></span><b>Free Delivery</b></div><div><span><Icon name="package"/></span><b>7-Day Replace</b></div><div><span><Icon name="shield"/></span><b>1-Year Warranty</b></div></div>
      <div className="quantity-row"><div><b>Quantity</b><span>Only 8 left</span></div><div className="stepper"><button onClick={() => setQty(Math.max(1, qty - 1))}><Icon name="minus" size={16}/></button><b>{qty}</b><button onClick={() => setQty(qty + 1)}><Icon name="plus" size={16}/></button></div></div>
      <div className="detail-tabs">{["Description", "Specifications", "Reviews", "Delivery"].map(x => <button className={tab === x ? "active" : ""} key={x} onClick={() => setTab(x)}>{x}</button>)}</div>
      <div className="tab-copy">{tab === "Description" && "Immersive sound meets all-day comfort. Hybrid active noise cancellation, spatial audio and up to 40 hours of battery life keep every moment crystal clear."}{tab === "Specifications" && "Bluetooth 5.3 · 40 mm drivers · USB-C fast charging · 252 g · Foldable design · Dual-device pairing."}{tab === "Reviews" && "Customers love the deep bass, premium finish and comfortable ear cushions. 92% would recommend this product."}{tab === "Delivery" && "Free delivery by 15 October. Order within 6 hours for same-day dispatch. Easy 7-day replacement available."}</div>
    </main>
    <div className="sticky-actions"><PrimaryButton variant="secondary" onClick={() => add(p)} icon="bag">Add to Cart</PrimaryButton><PrimaryButton onClick={() => { add(p); go("checkout"); }}>Buy Now</PrimaryButton></div>
  </div>;
}

function CartScreen({ go, cart, setCart }: { go: (s: Screen) => void; cart: Record<number, number>; setCart: React.Dispatch<React.SetStateAction<Record<number, number>>> }) {
  const entries = products.filter(p => cart[p.id]);
  const subtotal = entries.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const update = (id: number, n: number) => setCart(c => { const next = { ...c }; if (n <= 0) delete next[id]; else next[id] = n; return next; });
  return <div className="scroll-screen"><AppHeader title={`My Cart${entries.length ? ` (${entries.length})` : ""}`}/><main className="page">
    {!entries.length ? <div className="empty-state"><div className="empty-art"><Icon name="bag" size={52}/><span>0</span></div><div className="title">Your Cart is Empty</div><p>Your next favorite thing is just a tap away.</p><PrimaryButton onClick={() => go("home")}>Continue Shopping</PrimaryButton></div> : <>
      <div className="delivery-banner"><Icon name="truck"/><span><b>Free delivery unlocked!</b><small>Your order qualifies for free shipping.</small></span><Icon name="check" size={18}/></div>
      <div className="cart-list">{entries.map(p => <div className="cart-item" key={p.id}><img src={p.image} alt={p.name}/><div className="cart-info"><b>{p.name}</b><small>Black · Standard</small><div><strong>{money(p.price)}</strong><del>{money(p.original)}</del></div><div className="cart-controls"><div className="stepper small"><button onClick={() => update(p.id, cart[p.id] - 1)}><Icon name="minus" size={14}/></button><b>{cart[p.id]}</b><button onClick={() => update(p.id, cart[p.id] + 1)}><Icon name="plus" size={14}/></button></div><button className="remove" onClick={() => update(p.id, 0)}><Icon name="trash" size={15}/>Remove</button></div></div></div>)}</div>
      <button className="coupon-row"><span><Icon name="tag"/><b>Apply coupon</b></span><Icon name="arrowRight"/></button>
      <div className="summary-card"><b>Order summary</b><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div><span>Delivery</span><strong className="success">FREE</strong></div><div><span>Discount</span><strong className="success">−{money(Math.round(subtotal * .1))}</strong></div><hr/><div className="total"><span>Total</span><strong>{money(Math.round(subtotal * .9))}</strong></div><small>You save {money(Math.round(subtotal * .1))} on this order</small></div>
      <PrimaryButton onClick={() => go("checkout")}>Proceed to Checkout</PrimaryButton>
    </>}
  </main></div>;
}

function CheckoutScreen({ go }: { go: (s: Screen) => void }) {
  const [saved, setSaved] = useState(true);
  const [fields, setFields] = useState(["", "", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const next = () => { if (!saved && fields.some(x => !x.trim())) setError("Please complete your delivery address."); else go("payment"); };
  return <div className="scroll-screen no-nav"><AppHeader title="Checkout" back={() => go("cart")}/><main className="page">
    <Progress current={2}/>
    <div className="section-title">Delivery Address</div>
    <button className={saved ? "address-card selected" : "address-card"} onClick={() => { setSaved(true); setError(""); }}><span className="radio-dot"/><div><b>Arjun Sharma <i>HOME</i></b><p>42, Lake View Apartments, Indiranagar<br/>Bengaluru, Karnataka 560038</p><small>+91 98765 43210</small></div><span className="edit">Edit</span></button>
    <div className="or-line"><span>or add a new address</span></div>
    <button className={!saved ? "new-address-toggle active" : "new-address-toggle"} onClick={() => setSaved(false)}><Icon name="plus"/>Use a new address</button>
    {!saved && <div className="address-form">{["Full Name", "Mobile Number", "House / Building", "Street", "City", "State", "PIN Code"].map((x, i) => <Field key={x} label={x} placeholder={x} value={fields[i]} onChange={v => { const n = [...fields]; n[i] = v; setFields(n); setError(""); }}/>)}</div>}
    {error && <div className="error"><Icon name="help" size={16}/>{error}</div>}
    <PrimaryButton onClick={next}>Save & Continue</PrimaryButton>
  </main></div>;
}

function Progress({ current }: { current: number }) {
  return <div className="progress">{["Cart", "Address", "Payment", "Done"].map((x, i) => <div className={i + 1 <= current ? "done" : ""} key={x}><span>{i + 1 < current ? <Icon name="check" size={13}/> : i + 1}</span><b>{x}</b>{i < 3 && <i/>}</div>)}</div>;
}

function PaymentScreen({ go }: { go: (s: Screen) => void }) {
  const [method, setMethod] = useState("");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const place = () => {
    const invalid = !method || (method === "UPI" && !upi) || ((method === "Credit Card" || method === "Debit Card") && card.some(x => !x));
    if (invalid) setError("Please select a payment method and enter the required details."); else go("success");
  };
  return <div className="scroll-screen no-nav"><AppHeader title="Payment" back={() => go("checkout")}/><main className="page">
    <Progress current={3}/><div className="pay-total"><span>Total amount</span><b>₹2,249</b><small>Secure checkout · 256-bit encryption</small></div>
    <div className="section-title">Choose payment method</div>
    <div className="payment-options">
      {[["UPI", "upi"], ["Credit Card", "credit"], ["Debit Card", "credit"], ["Cash on Delivery", "package"]].map(([name, icon]) => <div className={method === name ? "payment-option selected" : "payment-option"} key={name}>
        <button onClick={() => { setMethod(name); setError(""); }}><span className="pay-icon"><Icon name={icon === "upi" ? "phone" : icon}/></span><b>{name}</b><span className="radio-dot"/></button>
        {method === name && name === "UPI" && <div className="pay-form"><Field label="UPI ID" placeholder="name@bank" value={upi} onChange={setUpi}/><small>Open your UPI app to authorize payment.</small></div>}
        {method === name && (name === "Credit Card" || name === "Debit Card") && <div className="pay-form"><Field label="Card Number" placeholder="1234 5678 9012 3456" value={card[0]} onChange={v => setCard([v, card[1], card[2], card[3]])}/><Field label="Card Holder" placeholder="ARJUN SHARMA" value={card[1]} onChange={v => setCard([card[0], v, card[2], card[3]])}/><div className="field-pair"><Field label="Expiry" placeholder="MM/YY" value={card[2]} onChange={v => setCard([card[0], card[1], v, card[3]])}/><Field label="CVV" placeholder="•••" value={card[3]} onChange={v => setCard([card[0], card[1], card[2], v])}/></div></div>}
        {method === name && name === "Cash on Delivery" && <div className="cod-note">Pay in cash when your order arrives. A ₹20 handling fee applies.</div>}
      </div>)}
    </div>
    {error && <div className="error"><Icon name="help" size={16}/>{error}</div>}
    <PrimaryButton onClick={place} icon="lock">Place Order · ₹2,249</PrimaryButton>
    <div className="secure-note"><Icon name="shield" size={16}/>Your payment information is safe with us.</div>
  </main></div>;
}

function SuccessScreen({ go }: { go: (s: Screen) => void }) {
  return <div className="scroll-screen no-nav success-screen"><main className="page">
    <div className="confetti"><i/><i/><i/><i/><i/><i/></div>
    <div className="success-check"><Icon name="check" size={44}/><span/></div>
    <div className="title">Order Placed<br/>Successfully!</div><p>Thank you for shopping with ShopEase.<br/>Your order is on its way.</p>
    <div className="order-ticket"><div className="ticket-head"><span>ORDER ID</span><b>SE458921</b></div><div className="ticket-product"><img src={photos.headphones}/><div><b>Wireless Bluetooth Headphones</b><span>Qty: 1 · Black</span></div><strong>₹1,999</strong></div><div className="ticket-info"><span><small>Expected Delivery</small><b>15 October 2026</b></span><span><small>Total Paid</small><b>₹2,249</b></span></div></div>
    <PrimaryButton onClick={() => go("tracking")} icon="truck">Track Order</PrimaryButton><PrimaryButton variant="secondary" onClick={() => go("orders")}>View Order</PrimaryButton><button className="guest" onClick={() => go("home")}>Continue Shopping</button>
    <div className="success-message"><Icon name="check" size={14}/>Your order has been placed successfully.</div>
  </main></div>;
}

function OrdersScreen({ go }: { go: (s: Screen) => void }) {
  const [tab, setTab] = useState("All");
  const orderData = [
    ["SE458921", "Wireless Bluetooth Headphones", "₹2,249", "12 Oct 2026", "Shipped", photos.headphones],
    ["SE447182", "Active Smart Watch", "₹3,199", "02 Sep 2026", "Delivered", photos.watch],
    ["SE432901", "Cloud Wireless Headset", "₹1,899", "14 Aug 2026", "Cancelled", photos.pinkHeadphones],
  ];
  const visible = orderData.filter(x => tab === "All" || (tab === "Active" ? x[4] === "Shipped" : x[4] === tab));
  return <div className="scroll-screen"><AppHeader title="My Orders" back={() => go("profile")} right={<button className="icon-button"><Icon name="search"/></button>}/>
    <div className="order-tabs">{["All", "Active", "Delivered", "Cancelled"].map(x => <button key={x} className={tab === x ? "active" : ""} onClick={() => setTab(x)}>{x}</button>)}</div>
    <main className="page order-list">{visible.map((o, i) => <div className="order-card" key={o[0]}><div className="order-card-head"><span><small>Order ID</small><b>#{o[0]}</b></span><i className={o[4].toLowerCase()}>{o[4]}</i></div><div className="order-product"><img src={o[5]}/><div><b>{o[1]}</b><span>Qty: 1 · {o[3]}</span><strong>{o[2]}</strong></div></div><div className="order-actions"><button onClick={() => go("product")}>{o[4] === "Delivered" ? "Buy Again" : "View Details"}</button>{o[4] === "Shipped" && <button className="accent" onClick={() => go("tracking")}>Track Order</button>}{o[4] === "Shipped" && <button>Cancel</button>}</div></div>)}</main>
  </div>;
}

function TrackingScreen({ go }: { go: (s: Screen) => void }) {
  const steps = [["Order Placed", "12 Oct · 10:32 AM"], ["Order Confirmed", "12 Oct · 10:34 AM"], ["Packed", "13 Oct · 08:10 AM"], ["Shipped", "13 Oct · 05:42 PM"], ["Out for Delivery", "Expected 15 Oct"], ["Delivered", "Expected 15 Oct"]];
  return <div className="scroll-screen no-nav"><AppHeader title="Track Order" back={() => go("orders")} right={<button className="icon-button"><Icon name="help"/></button>}/><main className="page">
    <div className="track-summary"><div><span>ORDER #SE458921</span><b>Arriving by 15 October</b><small>Your package is moving toward you</small></div><span className="status-pill">Shipped</span></div>
    <div className="map-card"><div className="map-lines"/><span className="map-pin warehouse"><Icon name="package" size={16}/></span><span className="map-pin customer"><Icon name="home" size={16}/></span><span className="truck-pin"><Icon name="truck" size={18}/></span><div><b>In transit</b><small>Bengaluru Distribution Hub</small></div></div>
    <div className="section-title">Delivery progress</div>
    <div className="timeline">{steps.map((s, i) => <div className={i < 3 ? "complete" : i === 3 ? "current" : ""} key={s[0]}><span>{i < 3 ? <Icon name="check" size={14}/> : i === 3 ? <i/> : ""}</span><div><b>{s[0]}</b><small>{s[1]}</small>{i === 3 && <em>Your package left the Bengaluru hub.</em>}</div></div>)}</div>
    <div className="support-strip"><Icon name="help"/><span><b>Need help with this order?</b><small>Our support team is here for you.</small></span><button onClick={() => go("help")}>Get help</button></div>
  </main></div>;
}

function WishlistScreen({ go, wishlist, toggleWish, add }: { go: (s: Screen) => void; wishlist: number[]; toggleWish: (p: Product) => void; add: (p: Product) => void }) {
  const list = products.filter(p => wishlist.includes(p.id));
  return <div className="scroll-screen"><AppHeader title={`My Wishlist (${list.length})`}/><main className="page">
    {!list.length ? <div className="empty-state"><div className="empty-art heart"><Icon name="heart" size={52}/></div><div className="title">Your wishlist is waiting</div><p>Save products you love and find them here.</p><PrimaryButton onClick={() => go("home")}>Discover Products</PrimaryButton></div> :
    <div className="wishlist-list">{list.map(p => <div className="wishlist-card" key={p.id}><img src={p.image}/><div><b onClick={() => go("product")}>{p.name}</b><span className="rating"><Icon name="star" size={12} filled/>{p.rating} (238)</span><strong>{money(p.price)} <del>{money(p.original)}</del></strong><div><button onClick={() => add(p)}><Icon name="bag" size={15}/>Add to Cart</button><button onClick={() => toggleWish(p)}>Remove</button></div></div></div>)}</div>}
  </main></div>;
}

function DealsScreen({ go, add, wishlist, toggleWish }: { go: (s: Screen) => void; add: (p: Product) => void; wishlist: number[]; toggleWish: (p: Product) => void }) {
  return <div className="scroll-screen"><AppHeader title="Today's Deals" back={() => go("home")}/><main className="page">
    <div className="deals-hero"><span>LIMITED TIME</span><b>Up to 60% OFF</b><p>Fresh deals. Better prices.<br/>Only for today.</p><div><i>08<small>HR</small></i>:<i>42<small>MIN</small></i>:<i>18<small>SEC</small></i></div><button onClick={() => document.getElementById("deals-grid")?.scrollIntoView({ behavior: "smooth" })}>Shop Now</button></div>
    <div className="section-head"><div><b>Flash deals</b><span>Prices drop. You win.</span></div></div>
    <div className="product-grid" id="deals-grid">{products.map(p => <ProductCard key={p.id} product={{...p, price: Math.round(p.price * .8)}} onOpen={() => go("product")} onAdd={() => add(p)} wished={wishlist.includes(p.id)} onWish={() => toggleWish(p)}/>)}</div>
  </main></div>;
}

function ProfileScreen({ go }: { go: (s: Screen) => void }) {
  const menu: [string, string, Screen][] = [["package", "My Orders", "orders"], ["heart", "My Wishlist", "wishlist"], ["location", "Saved Addresses", "addresses"], ["credit", "Payment Methods", "methods"], ["bell", "Notifications", "notifications"], ["help", "Help & Support", "help"], ["settings", "Settings", "settings"]];
  return <div className="scroll-screen profile-screen"><AppHeader title="My Profile" right={<button className="icon-button"><Icon name="settings"/></button>}/><main className="page">
    <div className="profile-card"><div className="profile-avatar">AS<button><Icon name="camera" size={13}/></button></div><div><b>Arjun Sharma</b><span>arjun.sharma@example.com</span><small>+91 98765 43210</small></div><button>Edit</button></div>
    <div className="member-card"><span><Icon name="star" filled/></span><div><b>ShopEase Plus</b><small>1,240 reward points</small></div><button>View</button></div>
    <div className="profile-menu">{menu.map(([icon, label, target]) => <button key={label} onClick={() => go(target)}><span><Icon name={icon}/></span><b>{label}</b>{label === "Notifications" && <i>3</i>}<Icon name="arrowRight" size={17}/></button>)}</div>
    <button className="logout-button" onClick={() => go("login")}><Icon name="logout"/>Logout</button><div className="app-version">ShopEase v1.0 · Made for better shopping</div>
  </main></div>;
}

function HelpScreen({ go }: { go: (s: Screen) => void }) {
  const [open, setOpen] = useState(0);
  const faqs = [["How can I track my order?", "Open My Orders, select an active order and tap Track Order to see live updates."], ["How can I cancel an order?", "You can cancel before dispatch from the order details screen."], ["How can I request a replacement?", "Eligible products can be replaced within 7 days of delivery."], ["What payment methods are available?", "We accept UPI, credit cards, debit cards and cash on delivery."], ["How long does delivery take?", "Most orders arrive within 2–5 business days."]];
  return <div className="scroll-screen no-nav"><AppHeader title="Help & Support" back={() => go("profile")}/><main className="page">
    <div className="support-hero"><span><Icon name="help" size={32}/></span><div><b>How can we help?</b><p>Find quick answers or talk to our team.</p></div></div>
    <div className="section-title">Frequently asked questions</div><div className="faq-list">{faqs.map((x, i) => <button className={open === i ? "open" : ""} key={x[0]} onClick={() => setOpen(open === i ? -1 : i)}><span><b>{x[0]}</b><Icon name={open === i ? "minus" : "plus"} size={17}/></span>{open === i && <p>{x[1]}</p>}</button>)}</div>
    <div className="section-title">Still need help?</div><div className="support-buttons"><PrimaryButton onClick={() => alert("Support chat opened")} icon="help">Contact Support</PrimaryButton><PrimaryButton variant="secondary" onClick={() => window.location.href = "tel:+911800123456"} icon="phone">Call Support</PrimaryButton><PrimaryButton variant="secondary" onClick={() => window.location.href = "mailto:support@shopease.com"} icon="mail">Email Support</PrimaryButton></div>
  </main></div>;
}

function ConceptsScreen({ go }: { go: (s: Screen) => void }) {
  const [concept, setConcept] = useState<"A" | "B">("A");
  return <div className="scroll-screen no-nav"><AppHeader title="Compare Concepts" back={() => go("home")} right={<button className="review-link" onClick={() => go("feedback")}>Review</button>}/><main className="page concepts-page">
    <div className="concept-intro"><span>STAKEHOLDER PREVIEW</span><b>Two ways to shop.<br/>One ShopEase.</b><p>Compare the concepts and choose the experience that feels right.</p></div>
    <div className="concept-toggle"><button className={concept === "A" ? "active" : ""} onClick={() => setConcept("A")}><b>Concept A</b><span>Image-Focused</span></button><button className={concept === "B" ? "active" : ""} onClick={() => setConcept("B")}><b>Concept B</b><span>Information-Focused</span></button></div>
    {concept === "A" ? <div className="concept-preview image-first"><div className="concept-label">Concept A – Image-Focused</div><div className="mini-header"><Logo/><Icon name="bag"/></div><div className="visual-hero"><img src={photos.pinkHeadphones}/><div><small>FEEL THE SOUND</small><b>Color your<br/>everyday.</b><button>Shop now</button></div></div><div className="visual-grid">{products.slice(0, 2).map(p => <div key={p.id}><img src={p.image}/><b>{p.name.split(" ").slice(-2).join(" ")}</b><span>{money(p.price)}</span></div>)}</div><div className="concept-note"><b>What’s different?</b><span>Large imagery · Immersive discovery · Minimal copy</span></div></div> :
    <div className="concept-preview info-first"><div className="concept-label">Concept B – Information-Focused</div><div className="mini-header"><Logo/><Icon name="filter"/></div><div className="info-banner"><b>Compare smarter.</b><span>Specs, ratings and savings at a glance.</span></div>{products.slice(0, 2).map(p => <div className="info-product" key={p.id}><img src={p.image}/><div><small>AUDIOCORE</small><b>{p.name}</b><span className="rating"><Icon name="star" size={11} filled/>{p.rating} · 238 reviews</span><p>40h battery · ANC · Bluetooth 5.3</p><strong>{money(p.price)} <del>{money(p.original)}</del> <i>37% off</i></strong></div></div>)}<div className="concept-note"><b>What’s different?</b><span>Rich details · Easy comparison · Confident choices</span></div></div>}
    <PrimaryButton onClick={() => go("feedback")}>Review this Concept</PrimaryButton>
  </main></div>;
}

function FeedbackScreen({ go }: { go: (s: Screen) => void }) {
  const [selected, setSelected] = useState<"A" | "B">("A");
  const [feedback, setFeedback] = useState("");
  const [approved, setApproved] = useState(false);
  if (approved) return <div className="scroll-screen no-nav"><main className="page approval"><div className="success-check"><Icon name="check" size={44}/></div><span>STAKEHOLDER REVIEW COMPLETE</span><div className="title">Design Approved</div><p>Thank you for your feedback. <b>Concept {selected}</b> has been approved for the ShopEase experience.</p><div className="approved-card"><small>APPROVED CONCEPT</small><b>Concept {selected} – {selected === "A" ? "Image-Focused" : "Information-Focused"}</b><span>Decision recorded today</span></div><PrimaryButton onClick={() => go("home")}>Return to Home</PrimaryButton><PrimaryButton variant="secondary" onClick={() => setApproved(false)}>Edit Response</PrimaryButton></main></div>;
  return <div className="scroll-screen no-nav"><AppHeader title="Stakeholder UI Review" back={() => go("concepts")}/><main className="page feedback-page">
    <div className="review-heading"><span>YOUR FEEDBACK MATTERS</span><b>Which interface design do you prefer?</b><p>Your input will help shape the final ShopEase experience.</p></div>
    <div className="choice-cards"><button className={selected === "A" ? "selected" : ""} onClick={() => setSelected("A")}><span className="choice-thumb image"><img src={photos.pinkHeadphones}/></span><div><b>Concept A</b><strong>Image-Focused</strong><small>Visual, immersive browsing</small></div><i className="radio-dot"/></button><button className={selected === "B" ? "selected" : ""} onClick={() => setSelected("B")}><span className="choice-thumb info"><Icon name="menu" size={28}/></span><div><b>Concept B</b><strong>Information-Focused</strong><small>Details at a glance</small></div><i className="radio-dot"/></button></div>
    <label className="feedback-field"><span>Share your thoughts <small>(optional)</small></span><textarea value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Enter your feedback..."/><i>{feedback.length}/300</i></label>
    <PrimaryButton onClick={() => setApproved(true)}>Approve Concept {selected}</PrimaryButton><PrimaryButton variant="secondary" onClick={() => setApproved(true)}>Submit Feedback</PrimaryButton><div className="review-note"><Icon name="lock" size={14}/>Your response is private and securely recorded.</div>
  </main></div>;
}

function SimpleScreen({ title, go, children }: { title: string; go: (s: Screen) => void; children?: React.ReactNode }) {
  return <div className="scroll-screen no-nav"><AppHeader title={title} back={() => go("profile")}/><main className="page"><div className="simple-card">{children || <><span><Icon name="settings" size={34}/></span><div className="title">{title}</div><p>This area is ready for your ShopEase preferences.</p></>}</div></main></div>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [history, setHistory] = useState<Screen[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([1, 2]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (screen !== "splash") return;
    const timer = window.setTimeout(() => setScreen("login"), 1800);
    return () => window.clearTimeout(timer);
  }, [screen]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const go = (next: Screen) => {
    if (next !== screen) setHistory(h => [...h.slice(-8), screen]);
    setScreen(next);
    document.querySelector(".phone-content")?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const add = (p: Product) => {
    setCart(c => ({ ...c, [p.id]: (c[p.id] || 0) + 1 }));
    setToast("Product added to cart successfully.");
  };
  const toggleWish = (p: Product) => {
    setWishlist(w => w.includes(p.id) ? w.filter(id => id !== p.id) : [...w, p.id]);
    setToast(wishlist.includes(p.id) ? "Removed from wishlist." : "Saved to your wishlist.");
  };
  const count = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const mainScreens: Screen[] = ["home", "categories", "wishlist", "cart", "profile", "deals", "listing", "search"];

  let content: React.ReactNode;
  if (screen === "splash") content = <div className="splash" onClick={() => setScreen("login")}><div className="splash-glow"/><Logo/><div className="tagline">Shop Smart. Live Better.</div><div className="loader"><i/><i/><i/></div><small>EVERYTHING YOU LOVE, ONE TAP AWAY</small></div>;
  else if (screen === "login") content = <LoginScreen go={go}/>;
  else if (screen === "register") content = <RegisterScreen go={go}/>;
  else if (screen === "reset") content = <SimpleScreen title="Reset Password" go={() => go("login")}><span><Icon name="lock" size={34}/></span><div className="title">Forgot your password?</div><p>Enter your email and we’ll send you a secure reset link.</p><Field placeholder="hello@example.com" label="Email address" icon="mail"/><PrimaryButton onClick={() => { setToast("Reset link sent successfully."); go("login"); }}>Send Reset Link</PrimaryButton></SimpleScreen>;
  else if (screen === "home") content = <HomeScreen go={go} add={add} toggleWish={toggleWish} wishlist={wishlist}/>;
  else if (screen === "search") content = <SearchScreen go={go} add={add} toggleWish={toggleWish} wishlist={wishlist}/>;
  else if (screen === "categories") content = <CategoriesScreen go={go}/>;
  else if (screen === "listing") content = <ListingScreen go={go} add={add} toggleWish={toggleWish} wishlist={wishlist}/>;
  else if (screen === "product") content = <ProductScreen go={go} add={add} wished={wishlist.includes(1)} toggleWish={() => toggleWish(products[0])}/>;
  else if (screen === "cart") content = <CartScreen go={go} cart={cart} setCart={setCart}/>;
  else if (screen === "checkout") content = <CheckoutScreen go={go}/>;
  else if (screen === "payment") content = <PaymentScreen go={go}/>;
  else if (screen === "success") content = <SuccessScreen go={go}/>;
  else if (screen === "orders") content = <OrdersScreen go={go}/>;
  else if (screen === "tracking") content = <TrackingScreen go={go}/>;
  else if (screen === "wishlist") content = <WishlistScreen go={go} wishlist={wishlist} toggleWish={toggleWish} add={add}/>;
  else if (screen === "deals") content = <DealsScreen go={go} add={add} wishlist={wishlist} toggleWish={toggleWish}/>;
  else if (screen === "profile") content = <ProfileScreen go={go}/>;
  else if (screen === "help") content = <HelpScreen go={go}/>;
  else if (screen === "concepts") content = <ConceptsScreen go={go}/>;
  else if (screen === "feedback") content = <FeedbackScreen go={go}/>;
  else if (screen === "addresses") content = <SimpleScreen title="Saved Addresses" go={go}><div className="address-card selected"><span className="radio-dot"/><div><b>Home</b><p>42, Lake View Apartments, Indiranagar<br/>Bengaluru 560038</p></div></div><PrimaryButton icon="plus">Add New Address</PrimaryButton></SimpleScreen>;
  else if (screen === "methods") content = <SimpleScreen title="Payment Methods" go={go}><div className="saved-card"><Icon name="credit"/><span><b>Visa ending 4242</b><small>Expires 08/29</small></span></div><PrimaryButton icon="plus">Add Payment Method</PrimaryButton></SimpleScreen>;
  else if (screen === "notifications") content = <SimpleScreen title="Notifications" go={go}><div className="notification-list">{["Your order #SE458921 has shipped.", "Mega Sale: Up to 60% off today.", "Smart Watch is back in stock."].map((x, i) => <div key={x}><span><Icon name={i === 0 ? "truck" : i === 1 ? "tag" : "bell"}/></span><div><b>{x}</b><small>{i + 1} hour ago</small></div></div>)}</div></SimpleScreen>;
  else content = <SimpleScreen title="Settings" go={go}/>;

  return <div className="stage">
    <div className="phone">
      <div className="status-bar"><span>9:41</span><div><i className="signal"/><i className="wifi"/><i className="battery"/></div></div>
      <div className="phone-content">{content}</div>
      {mainScreens.includes(screen) && <BottomNav screen={screen} go={go} count={count}/>}
      {toast && <Toast text={toast}/>}
      <div className="home-indicator"/>
    </div>
    <div className="desktop-caption"><Logo/><b>Mobile commerce prototype</b><span>390 × 844 · Interactive stakeholder demo</span></div>
  </div>;
}
