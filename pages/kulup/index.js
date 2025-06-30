import Link from 'next/link';

export default function KulupAnasayfa() {
  return (
    <div>
      <h1>Kulüp Sayfasına Hoşgeldiniz!</h1>
      <nav>
        <Link href="/kulup/faaliyetler">Faaliyetler</Link> | 
        <Link href="/kulup/blog">Blog</Link> | 
        <Link href="/kulup/takvim">Takvim</Link>
      </nav>
      
      {/* Örnek içerik */}
      <p>Bu haftaki drone atölyemize katılın!</p>
    </div>
  );
}
