import Link from 'next/link';

export default function Kulup() {
  return (
    <div>
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

      <div>
        <p>Kulübümüzün resmi web sayfasına hoşgeldiniz!</p>
      </div>
    </div>
  );
}
