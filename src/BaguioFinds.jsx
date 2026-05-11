import { useState } from "react";
import { useNavigate } from "react-router-dom";
 
const productEntries = [
  { name: "La Trinidad Strawberries", cat: "food", image: "/images/La Trinidad Strawberries.jpg", emoji: "🍓", bg: "#fbe8e8", badge: "Seasonal", price: "₱80–150/tray", desc: "Plump, sweet strawberries grown in the cool highland farms of La Trinidad, Benguet — a Baguio icon. Best enjoyed fresh, as jam, or dipped in chocolate at the farm." },
  { name: "Benguet Coffee", cat: "food", image: "/images/Benguet Coffee.jpg", emoji: "☕", bg: "#f0e8da", badge: "Artisan", price: "₱180–350/250g", desc: "Single-origin Arabica from the Cordillera mountains. Rich, earthy, and smooth with minimal bitterness. Often grown by indigenous Kankana-ey farmers in remote mountain communities." },
  { name: "Ube Jam (Good Shepherd)", cat: "sweets", image: "/images/Ube Jam.jpg", emoji: "🫚", bg: "#ede8f5", badge: "Best Seller", price: "₱120–200/jar", desc: "The legendary ube jam made by the Good Shepherd sisters since the 1960s. Creamy, sweet, and irreplaceable. Pairs perfectly with pandesal, toast, or eaten straight from the jar." },
  { name: "Peanut Brittle", cat: "sweets", image: "/images/Peanut Brittle.jpg", emoji: "🥜", bg: "#faf0da", badge: "Classic", price: "₱60–120/pack", desc: "Crunchy, golden peanut brittle made with local Benguet peanuts. A timeless pasalubong for family and friends. Also available in cashew and mixed nut varieties." },
  { name: "Igorot Woven Bags", cat: "crafts", image: "/images/Igorot Woven Bags.jpg", emoji: "🧺", bg: "#e8f0e8", badge: "Handmade", price: "₱350–1,200", desc: "Hand-woven baskets and bags using traditional Cordillera weaving techniques passed down through generations. Each piece is unique — no two are identical." },
  { name: "Baguio Cut Flowers", cat: "flowers", image: "/images/Cut Flowers.jpg", emoji: "🌷", bg: "#fce8f0", badge: "Fresh Daily", price: "₱100–500/bundle", desc: "Chrysanthemums, roses, lilies, sunflowers, and more — grown in the cool highland air for vivid color and long shelf life. Available year-round at the city market." },
  { name: "Cordillera Silver Jewelry", cat: "crafts", image: "/images/Jewelry.jpg", emoji: "💍", bg: "#e8ecf5", badge: "Heritage", price: "₱200–1,500", desc: "Sterling silver jewelry with indigenous Igorot motifs — suns, mountains, and rice terraces. Each piece tells a story of highland culture and is often stamped by the artisan who made it." },
  { name: "Sylvanas", cat: "sweets", image: "/images/Sylvanas.jpg", emoji: "🍪", bg: "#f5f0e8", badge: "Iconic", price: "₱180–280/box", desc: "Buttery meringue wafers sandwiched with French buttercream and rolled in toasted cashew bits. A Baguio dessert you simply cannot find anywhere else in the Philippines." },
  { name: "Baguio Vegetables", cat: "food", image: "/images/Baguio Vegetables.jpg", emoji: "🥦", bg: "#e8f5e8", badge: "Farm Fresh", price: "₱20–80/kilo", desc: "Broccoli, carrots, snap peas, chayote, highland lettuce, and more — grown without the scorching lowland heat. Noticeably crisper and sweeter than their lowland equivalents." },
  { name: "Ikat Woven Textiles", cat: "crafts", image: "/images/Woven Textiles.jpg", emoji: "🧶", bg: "#f0e8f5", badge: "Cultural", price: "₱500–2,500", desc: "Vibrant ikat-dyed fabrics woven by Cordillera artisans on traditional backstrap looms. Used for blankets, table runners, scarves, and traditional Igorot clothing." },
  { name: "Rose Products", cat: "flowers", image: "/images/Rose Products.jpg", emoji: "🌹", bg: "#fce8ec", badge: "Fragrant", price: "₱150–400", desc: "Rose-infused soaps, lotions, potpourri, and dried petals. Made from the highland blooms of Baguio flower farms. Popular as gifts and spa items." },
  { name: "Ukay-Ukay Finds", cat: "crafts", image: "/images/Ukay Ukay Finds.jpg", emoji: "👗", bg: "#e8ece8", badge: "Thrift", price: "₱50–500", desc: "Baguio's famous secondhand bazaars — especially around Session Road and Magsaysay Avenue — offer vintage and international clothing at remarkably low prices. A thrifter's paradise." },
];

export const products = productEntries.map((product) => ({
  ...product,
  slug: product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
}));
 
const markets = [
  { icon: "🏪", name: "Baguio City Market", info: "The main public market. Best for vegetables, fruits, and fresh produce. Open daily." },
  { icon: "🌿", name: "Burnham Park Area", info: "Lakeside stalls offering strawberry jams, crafts, and woven items." },
  { icon: "🎨", name: "Good Shepherd Convent", info: "Famous for ube jam, peanut brittle, and the iconic sylvanas. A must-visit." },
  { icon: "🧺", name: "Maharlika Livelihood Center", info: "Handwoven products, silver crafts, and indigenous textiles from Cordillera artisans." },
  { icon: "🍓", name: "La Trinidad Strawberry Farm", info: "Pick-your-own strawberries in neighboring Benguet, just a short trip from the city." },
];
 
const tips = [
  { num: "01", text: "Visit the public market early morning for the freshest produce and lower prices before the midday crowd arrives." },
  { num: "02", text: "Always buy ube jam and peanut brittle directly from Good Shepherd Convent — avoid overpriced resellers in souvenir shops." },
  { num: "03", text: "Bring a cooler if taking fresh strawberries home. They travel best chilled and will last much longer." },
  { num: "04", text: "When buying Igorot woven goods, look for natural dyes and hand-stitched patterns — these are signs of authentic artisan work." },
  { num: "05", text: "Benguet coffee is best bought as whole beans. Ask sellers which barangay the beans are from — single-origin is a real thing here." },
  { num: "06", text: "Haggling is normal at souvenir stalls but not at Good Shepherd or fixed-price stores. Read the room before negotiating." },
];
 
const filterOptions = [
  { label: "All Products", value: "all" },
  { label: "Food & Produce", value: "food" },
  { label: "Crafts & Weaves", value: "crafts" },
  { label: "Flowers", value: "flowers" },
  { label: "Sweets", value: "sweets" },
];
 
export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
 
  .bf-root *, .bf-root *::before, .bf-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .bf-root {
    --pine: #1a3a2a; --pine-mid: #2d5c3e; --moss: #4a7c5c; --sage: #8ab89a;
    --mist: #d4e8d8; --cream: #f7f3ec; --gold: #d4a017;
    --text: #1c1c1c; --text-soft: #5a5a5a; --white: #ffffff;
    font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text); overflow-x: hidden;
  }
  .bf-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1rem 2.5rem;
    background: rgba(26,58,42,0.96); backdrop-filter: blur(8px);
  }
  .bf-nav-logo { font-family: 'Playfair Display', serif; color: var(--cream); font-size: 1.3rem; }
  .bf-nav-logo span { color: var(--gold); font-style: italic; }
  .bf-nav-links { display: flex; gap: 2rem; list-style: none; }
  .bf-nav-links a { color: var(--sage); font-size: 0.85rem; text-decoration: none; letter-spacing: 0.05em; text-transform: uppercase; transition: color 0.2s; }
  .bf-nav-links a:hover { color: var(--cream); }
 
  .bf-hero {
    min-height: 100vh;
    background: linear-gradient(160deg, var(--pine) 0%, var(--pine-mid) 50%, #1e4a30 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 6rem 2rem 4rem; position: relative; overflow: hidden;
  }
  .bf-hero::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 70% 30%, rgba(138,184,154,0.12) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 80%, rgba(212,160,23,0.07) 0%, transparent 50%);
  }
  .bf-hero-badge {
    display: inline-block; background: rgba(138,184,154,0.15);
    border: 1px solid rgba(138,184,154,0.4); color: var(--sage);
    font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.4rem 1.2rem; border-radius: 2rem; margin-bottom: 1.5rem; position: relative;
  }
  .bf-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 7vw, 5.5rem);
    color: var(--cream); line-height: 1.1; margin-bottom: 1rem; position: relative;
  }
  .bf-hero h1 em { color: var(--gold); font-style: italic; }
  .bf-hero p { font-size: 1.1rem; color: var(--sage); max-width: 540px; line-height: 1.7; margin-bottom: 2.5rem; font-weight: 300; position: relative; }
  .bf-float-tags { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; margin-bottom: 3rem; position: relative; }
  .bf-tag { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: var(--sage); font-size: 0.78rem; padding: 0.35rem 1rem; border-radius: 2rem; }
  .bf-cta {
    display: inline-block; background: var(--gold); color: var(--pine);
    font-size: 0.9rem; font-weight: 500; letter-spacing: 0.05em;
    padding: 0.9rem 2.5rem; border-radius: 2rem; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s; position: relative; cursor: pointer; border: none;
  }
  .bf-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212,160,23,0.3); }
 
  .bf-section { padding: 5rem 2rem; }
  .bf-section-label { font-size: 0.72rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--moss); margin-bottom: 0.5rem; }
  .bf-section-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 4vw, 2.8rem); line-height: 1.2; margin-bottom: 1rem; }
  .bf-section-sub { color: var(--text-soft); font-size: 1rem; line-height: 1.7; max-width: 560px; font-weight: 300; }
 
  .bf-products { background: var(--white); }
  .bf-products-header { text-align: center; margin-bottom: 3.5rem; }
  .bf-filter-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-top: 1.5rem; }
  .bf-filter-btn {
    padding: 0.5rem 1.25rem; border-radius: 2rem;
    border: 1.5px solid var(--mist); background: transparent;
    font-size: 0.82rem; cursor: pointer; transition: all 0.2s;
    color: var(--text-soft); font-family: 'DM Sans', sans-serif;
  }
  .bf-filter-btn.active { background: var(--pine); color: var(--cream); border-color: var(--pine); }
  .bf-filter-btn:hover { background: var(--pine); color: var(--cream); border-color: var(--pine); }
 
  .bf-products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; max-width: 1100px; margin: 0 auto; }
  .bf-card { border-radius: 1rem; overflow: hidden; border: 1px solid #ece8e0; background: var(--cream); transition: transform 0.25s, box-shadow 0.25s; cursor: pointer; }
  .bf-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
  .bf-card-img { height: 200px; display: flex; align-items: center; justify-content: center; font-size: 4rem; position: relative; overflow: hidden; }
  .bf-card-img img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
  .bf-card-badge { position: absolute; top: 1rem; right: 1rem; z-index: 1; background: var(--pine); color: var(--cream); font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.25rem 0.65rem; border-radius: 1rem; }
  .bf-card-body { padding: 1.25rem 1.5rem 1.5rem; }
  .bf-card-cat { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--moss); margin-bottom: 0.4rem; }
  .bf-card-name { font-family: 'Playfair Display', serif; font-size: 1.25rem; margin-bottom: 0.5rem; }
  .bf-card-desc { font-size: 0.85rem; color: var(--text-soft); line-height: 1.6; margin-bottom: 1rem; }
  .bf-card-footer { display: flex; align-items: center; justify-content: space-between; }
  .bf-card-price { font-size: 1.1rem; font-weight: 500; color: var(--pine); }
  .bf-card-btn { background: var(--pine); color: var(--cream); border: none; padding: 0.45rem 1.1rem; border-radius: 2rem; font-size: 0.78rem; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
  .bf-card-btn:hover { background: var(--moss); }
 
  .bf-about { background: var(--pine); color: var(--cream); }
  .bf-about-inner { max-width: 1000px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  .bf-about .bf-section-label { color: var(--sage); }
  .bf-about .bf-section-title { color: var(--cream); }
  .bf-about .bf-section-sub { color: var(--sage); }
  .bf-about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 2rem; }
  .bf-stat-box { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 0.75rem; padding: 1.25rem; }
  .bf-stat-num { font-family: 'Playfair Display', serif; font-size: 2rem; color: var(--gold); }
  .bf-stat-label { font-size: 0.78rem; color: var(--sage); margin-top: 0.25rem; }
  .bf-quote { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-style: italic; line-height: 1.5; color: var(--mist); padding-left: 1.5rem; border-left: 3px solid var(--gold); }
  .bf-about-sub { font-size: 0.9rem; color: var(--sage); margin-top: 1rem; line-height: 1.7; font-weight: 300; }
 
  .bf-markets { background: var(--cream); }
  .bf-markets-inner { max-width: 1000px; margin: 0 auto; }
  .bf-markets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  .bf-market-card { background: var(--white); border: 1px solid #ece8e0; border-radius: 0.875rem; padding: 1.5rem 1.25rem; text-align: center; transition: border-color 0.2s, transform 0.2s; }
  .bf-market-card:hover { border-color: var(--moss); transform: translateY(-3px); }
  .bf-market-icon { font-size: 2.2rem; margin-bottom: 0.75rem; }
  .bf-market-name { font-weight: 500; font-size: 0.95rem; margin-bottom: 0.3rem; }
  .bf-market-info { font-size: 0.78rem; color: var(--text-soft); line-height: 1.5; }
 
  .bf-tips { background: var(--mist); }
  .bf-tips-inner { max-width: 900px; margin: 0 auto; }
  .bf-tips-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 1.25rem; margin-top: 2.5rem; }
  .bf-tip-card { background: var(--white); border-radius: 0.875rem; padding: 1.5rem; border-left: 3px solid var(--moss); }
  .bf-tip-num { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--moss); margin-bottom: 0.5rem; }
  .bf-tip-text { font-size: 0.88rem; color: var(--text-soft); line-height: 1.6; }
 
  .bf-footer { background: #0e2518; color: var(--sage); text-align: center; padding: 2.5rem; font-size: 0.82rem; }
  .bf-footer strong { color: var(--cream); font-family: 'Playfair Display', serif; }
  .bf-footer p { margin-top: 0.4rem; opacity: 0.7; }
 
  .bf-modal-overlay {
    display: none; position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,0.55); align-items: center; justify-content: center; padding: 1.5rem;
  }
  .bf-modal-overlay.open { display: flex; }
  .bf-modal { background: var(--white); border-radius: 1.25rem; padding: 2rem; max-width: 460px; width: 100%; position: relative; box-shadow: 0 30px 80px rgba(0,0,0,0.2); }
  .bf-modal-close { position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.4rem; cursor: pointer; color: var(--text-soft); }
  .bf-modal-img { width: 100%; height: 200px; object-fit: cover; border-radius: 0.75rem; margin-bottom: 1rem; }
  .bf-modal-emoji { font-size: 3.5rem; margin-bottom: 1rem; }
  .bf-modal-cat { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--moss); margin-bottom: 0.4rem; }
  .bf-modal-name { font-family: 'Playfair Display', serif; font-size: 1.6rem; margin-bottom: 0.75rem; }
  .bf-modal-desc { font-size: 0.92rem; color: var(--text-soft); line-height: 1.7; margin-bottom: 1.25rem; }
  .bf-modal-price { font-size: 1.3rem; font-weight: 500; color: var(--pine); }
 
  @media (max-width: 700px) {
    .bf-about-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .bf-nav { padding: 1rem 1.25rem; }
    .bf-nav-links { gap: 1rem; }
    .bf-hero { padding: 5rem 1.25rem 3rem; }
  }
`;
 
export default function BaguioFinds() {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
 
  const filtered = filter === "all" ? products : products.filter((p) => p.cat === filter);
 
  return (
    <div className="bf-root">
      <style>{styles}</style>
 
      {/* NAV */}
      <nav className="bf-nav">
        <div className="bf-nav-logo">Baguio <span>Finds</span></div>
        <ul className="bf-nav-links">
          <li><a href="#products">Products</a></li>
          <li><a href="#markets">Markets</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#tips">Tips</a></li>
        </ul>
      </nav>
 
      {/* HERO */}
      <section className="bf-hero">
        <div className="bf-hero-badge">✦ Summer Capital of the Philippines</div>
        <h1>The <em>Fresh</em> Heart<br />of Baguio City</h1>
        <p>Discover the finest local products from the cool highlands — from highland strawberries to hand-woven crafts and aromatic Benguet coffee.</p>
        <div className="bf-float-tags">
          {["🍓 Strawberries","☕ Benguet Coffee","🌸 Cut Flowers","🧶 Woven Crafts","🥜 Peanut Brittle","🫚 Ube Jam"].map((t) => (
            <span key={t} className="bf-tag">{t}</span>
          ))}
        </div>
        <a href="#products" className="bf-cta">Explore Products →</a>
      </section>
 
      {/* PRODUCTS */}
      <section id="products" className="bf-section bf-products">
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="bf-products-header">
            <div className="bf-section-label">What we offer</div>
            <h2 className="bf-section-title">Baguio's Finest Local Products</h2>
            <p className="bf-section-sub" style={{ margin: "0 auto" }}>Sourced directly from local farmers, artisans, and producers in the Cordillera highlands.</p>
            <div className="bf-filter-tabs">
              {filterOptions.map((f) => (
                <button key={f.value} className={`bf-filter-btn${filter === f.value ? " active" : ""}`} onClick={() => setFilter(f.value)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="bf-products-grid">
            {filtered.map((p, i) => (
              <div key={i} className="bf-card" onClick={() => navigate(`/product/${p.slug}`)}>
                <div className="bf-card-img" style={{ background: p.bg }}>
                  {p.image
                    ? <img src={p.image} alt={p.name} />
                    : <span>{p.emoji}</span>
                  }
                  <span className="bf-card-badge">{p.badge}</span>
                </div>
                <div className="bf-card-body">
                  <div className="bf-card-cat">{p.cat}</div>
                  <div className="bf-card-name">{p.name}</div>
                  <div className="bf-card-desc">{p.desc.substring(0, 100)}...</div>
                  <div className="bf-card-footer">
                    <span className="bf-card-price">{p.price}</span>
                    <button className="bf-card-btn">Learn More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ABOUT */}
      <section id="about" className="bf-section bf-about">
        <div className="bf-about-inner">
          <div>
            <div className="bf-section-label">Our story</div>
            <h2 className="bf-section-title">From the Highlands to Your Hands</h2>
            <p className="bf-section-sub">Baguio City sits 1,540 meters above sea level, giving it a cool climate unlike any city in the Philippines — perfect for cultivating strawberries, vegetables, flowers, and rich highland coffee.</p>
            <div className="bf-about-stats">
              {[["1,540m","Elevation above sea level"],["16°C","Average highland temperature"],["50+","Local artisan vendors"],["1900","Year Baguio was founded"]].map(([num, label]) => (
                <div key={label} className="bf-stat-box">
                  <div className="bf-stat-num">{num}</div>
                  <div className="bf-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <blockquote className="bf-quote">"In Baguio, the soil itself is the artisan."</blockquote>
            <p className="bf-about-sub">The indigenous Igorot people have cultivated the Cordillera highlands for centuries, passing down farming and weaving traditions that produce goods of unmatched quality and cultural depth. When you buy a Baguio product, you support living heritage.</p>
          </div>
        </div>
      </section>
 
      {/* MARKETS */}
      <section id="markets" className="bf-section bf-markets">
        <div className="bf-markets-inner">
          <div style={{ marginBottom: "3rem" }}>
            <div className="bf-section-label">Where to buy</div>
            <h2 className="bf-section-title">Best Markets in Baguio</h2>
            <p className="bf-section-sub">The city's most beloved spots to find authentic local goods.</p>
          </div>
          <div className="bf-markets-grid">
            {markets.map((m) => (
              <div key={m.name} className="bf-market-card">
                <div className="bf-market-icon">{m.icon}</div>
                <div className="bf-market-name">{m.name}</div>
                <div className="bf-market-info">{m.info}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* TIPS */}
      <section id="tips" className="bf-section bf-tips">
        <div className="bf-tips-inner">
          <div className="bf-section-label">Insider guide</div>
          <h2 className="bf-section-title">Buying Tips for Visitors</h2>
          <p className="bf-section-sub">Make the most of your Baguio shopping experience with these local insights.</p>
          <div className="bf-tips-grid">
            {tips.map((t) => (
              <div key={t.num} className="bf-tip-card">
                <div className="bf-tip-num">{t.num}</div>
                <div className="bf-tip-text">{t.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      <footer className="bf-footer">
        <strong>Baguio Finds</strong>
        <p>A celebration of the Summer Capital's finest local products · Made with highland pride 🌿</p>
      </footer>
 
    </div>
  );
}
 