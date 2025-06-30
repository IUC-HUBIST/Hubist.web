export default function Blog() {
  const yazilar = [
    { id: 1, baslik: "Roket Yapımı 101", yazar: "Ahmet" },
    { id: 2, baslik: "Drone Yarışları", yazar: "Mehmet" }
  ];

  return (
    <div>
      <h1>Blog Yazıları</h1>
      <ul>
        {yazilar.map((yazi) => (
          <li key={yazi.id}>
            <h3>{yazi.baslik}</h3>
            <p>Yazar: {yazi.yazar}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
