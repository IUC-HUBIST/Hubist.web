<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HUBİST - Üniversite Takımı</title>
    <link rel="stylesheet" href="styles.css">
    <script defer src="script.js"></script>
</head>
<body>
    <header>
        <div class="logo">
            <img src="images/logo.png" alt="HUBİST Logosu">
        </div>
        <nav>
            <ul>
                <li><a href="#anasayfa">Anasayfa</a></li>
                <li><a href="#biz-kimiz">Biz Kimiz</a></li>
                <li><a href="#yarisma">Yarışmalar</a></li>
                <li><a href="#iletisim">İletişim</a></li>
                <li><a href="blog.html">Blog</a></li>
            </ul>
        </nav>
    </header>
    
    <section id="anasayfa" class="hero">
        <h1>HUBİST</h1>
        <p>Zirveye Doğru!</p>
    </section>
    
    <section id="biz-kimiz" class="content">
        <h2>Biz Kimiz?</h2>
        <p>HUBİST, teknoloji ve inovasyon alanında çalışmalar yapan bir üniversite takımıdır.</p>
    </section>
    
    <section id="yarisma" class="content">
        <h2>Yarışmalar</h2>
        <p>Katıldığımız yarışmalar hakkında bilgiler burada olacak.</p>
    </section>
    
    <section id="iletisim" class="content">
        <h2>İletişim</h2>
        <p>Bize ulaşmak için aşağıdaki bilgileri kullanabilirsiniz.</p>
    </section>

    <script>
        document.querySelectorAll('nav ul li a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });
    </script>
</body>
</html>
