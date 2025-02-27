document.addEventListener('DOMContentLoaded', function() {
    fetch('https://dummyjson.com/products')
        .then(response => response.json())
        .then(data => {
            const daftarProduk = data.products.slice(0, 10); // Ambil 10 produk pertama
            const daftarProdukElement = document.getElementById('product-list');

            daftarProduk.forEach(produk => {
                const kartuProduk = document.createElement('div');
                kartuProduk.className = 'kartu-produk';

                //Note: Ketika ada diskon, tampilkan label diskon, kalo ga ada ya tetep mada cuma angkanya 0
                if (produk.discountPercentage) {
                    const labelDiskon = document.createElement('div');
                    labelDiskon.className = 'label-diskon';
                    labelDiskon.textContent = `-${Math.round(produk.discountPercentage)}% OFF`;
                    kartuProduk.appendChild(labelDiskon);
                }

                const gambarProduk = document.createElement('img');
                gambarProduk.src = produk.thumbnail;
                gambarProduk.alt = produk.title;

                const namaProduk = document.createElement('h2');
                namaProduk.textContent = produk.title;

                const deskripsiProduk = document.createElement('p');
                deskripsiProduk.textContent = produk.description;

                // Tampilin harganya
                const containerHarga = document.createElement('div');
                containerHarga.className = 'container-harga';

                if (produk.discountPercentage) {
                    // Jika ada diskon, tampilin harga asli dan harga setelah diskon
                    const hargaSetelahDiskon = (produk.price * (1 - produk.discountPercentage / 100)).toFixed(2);
                    const hargaAsli = document.createElement('p');
                    hargaAsli.className = 'harga-asli';
                    hargaAsli.textContent = `$${produk.price}`;

                    const hargaDiskon = document.createElement('p');
                    hargaDiskon.className = 'harga-diskon';
                    hargaDiskon.textContent = `$${hargaSetelahDiskon}`;

                    containerHarga.appendChild(hargaAsli);
                    containerHarga.appendChild(hargaDiskon);
                } else {
                    // Jika tidak ada diskon, tampilkin harga asli saja
                    const hargaNormal = document.createElement('p');
                    hargaNormal.className = 'harga-normal';
                    hargaNormal.textContent = `$${produk.price}`;
                    containerHarga.appendChild(hargaNormal);
                }

                const ratingProduk = document.createElement('p');
                ratingProduk.className = 'rating';
                ratingProduk.innerHTML = `⭐ ${produk.rating}`; // Tambahin simbol bintang
                // Tinggal tambahin-tambahin semua element ke kartu produk
                kartuProduk.appendChild(gambarProduk);
                kartuProduk.appendChild(namaProduk);
                kartuProduk.appendChild(deskripsiProduk);
                kartuProduk.appendChild(containerHarga);
                kartuProduk.appendChild(ratingProduk);
                //Kartu produk masukin ke daftar produk
                daftarProdukElement.appendChild(kartuProduk);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});