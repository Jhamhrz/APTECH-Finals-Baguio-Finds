import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { products, styles } from './BaguioFinds'

export default function ProductDetail() {
  const { productSlug } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.slug === productSlug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productSlug])

  if (!product) {
    return (
      <div style={{ padding: '4rem', fontFamily: 'DM Sans, sans-serif', textAlign: 'center' }}>
        <h1>Product not found</h1>
        <p>The product may have moved or the link is invalid.</p>
        <Link to="/" style={{ color: '#1a3a2a', textDecoration: 'none', fontWeight: 600 }}>Return to home</Link>
      </div>
    )
  }

  return (
    <div className="bf-root">
      <style>{styles}</style>

      <nav className="bf-nav">
        <div className="bf-nav-logo">Baguio <span>Finds</span></div>
        <ul className="bf-nav-links">
          <li><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
          <li><button onClick={() => navigate(-1)} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Back</button></li>
        </ul>
      </nav>

      <section className="bf-hero" style={{ minHeight: '60vh', paddingTop: '8rem', textAlign: 'left' }}>
        <div style={{ maxWidth: 960, width: '100%' }}>
          <div className="bf-hero-badge">Product Details</div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: '3.5rem', marginTop: '1rem' }}>{product.name}</h1>
          <p style={{ color: '#cdd7c8', fontSize: '1.05rem', maxWidth: 620, lineHeight: 1.8 }}>{product.desc}</p>
          <button className="bf-cta" onClick={() => navigate(-1)} style={{ marginTop: '2rem' }}>Return to products</button>
        </div>
      </section>

      <section className="bf-section bf-products" style={{ paddingTop: '4rem' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
          <div style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.12)' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#4a7c5c', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              <span>{product.emoji}</span>
              <span>{product.cat}</span>
            </div>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem', fontFamily: 'Playfair Display, serif' }}>{product.name}</h2>
            <p style={{ color: '#5a5a5a', lineHeight: 1.75, marginBottom: '1.5rem' }}>{product.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1a3a2a' }}>{product.price}</span>
              <span style={{ background: '#e8f0e8', color: '#2d5c3e', padding: '0.7rem 1rem', borderRadius: '1rem', fontSize: '0.85rem', textTransform: 'uppercase' }}>{product.badge}</span>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <p style={{ color: '#5a5a5a', lineHeight: 1.8 }}>Category: <strong>{product.cat}</strong></p>
              <p style={{ color: '#5a5a5a', lineHeight: 1.8 }}>Suggested visit: <strong>Baguio City Market & Good Shepherd</strong></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
