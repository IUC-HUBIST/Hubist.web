import Link from 'next/link';

export default function KulupAnasayfa() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Havacılık ve Teknoloji Kulübü</h1>
      <nav style={{ margin: '20px 0' }}>
        <Link href="/kulup/faaliyetler" style={{ marginRight: '15px', color: 'blue' }}>
          Faaliyetler
        </Link>
        <Link href="/kulup/blog" style={{ marginRight: '15px', color: 'blue' }}>
          Blog
        </Link>
        <Link href="/kulup/takvim" style={{ color: 'blue' }}>
          Takvim
        </Link>
      </nav>
      <p>Kulübümüzün resmi sayfasına hoş geldiniz!</p>
    </div>
  );
}
