export default function Takvim() {
  const etkinlikler = [
    { tarih: "10 Ekim 2023", etkinlik: "Açılış Toplantısı" },
    { tarih: "25 Aralık 2023", etkinlik: "Yılbaşı Workshop" }
  ];

  return (
    <div>
      <h1>Etkinlik Takvimi</h1>
      <ul>
        {etkinlikler.map((item, index) => (
          <li key={index}>
            <strong>{item.tarih}:</strong> {item.etkinlik}
          </li>
        ))}
      </ul>
    </div>
  );
}
