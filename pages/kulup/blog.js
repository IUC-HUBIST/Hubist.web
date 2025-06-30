export default function Blog() {
  const blogYazilari = [
    { id: 1, baslik: "İlk Roket Denememiz", yazar: "Ayşe" },
    { id: 2, baslik: "Drone ile Havadan Çekim", yazar: "Mehmet" }
  ];

  return (
    <div>
      <h1>Blog</h1>
      {blogYazilari.map((yazi) => (
        <div key={yazi.id} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ddd' }}>
          <h3>{yazi.baslik}</h3>
          <p>Yazar: {yazi.yazar}</p>
        </div>
      ))}
    </div>
  );
}
