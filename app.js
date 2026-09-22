const express = require('express');
const app = express();
const port = 3000;

// 1. MIDDLEWARE (Wajib di atas agar bisa membaca data JSON dari Postman)
app.use(express.json());

// Data dummy mahasiswa disimpan di memori (array)
let mahasiswa = [
    { id: 1, nama: 'Andi', jurusan: 'Sistem Informasi' },
    { id: 2, nama: 'Budi', jurusan: 'Informatika' },
];

// 2. ROUTE GET - Halaman Utama
app.get('/', (req, res) => {
    res.send('Server Express.js berjalan!');
});

// 3. ROUTE GET - Menampilkan seluruh data / filter berdasarkan query jurusan
app.get('/mahasiswa', (req, res) => {
    const { jurusan } = req.query;
    if (jurusan) {
        const hasil = mahasiswa.filter((m) => m.jurusan === jurusan);
        return res.json(hasil);
    }
    res.json(mahasiswa);
});

// 4. ROUTE GET - Menampilkan satu data berdasarkan ID
app.get('/mahasiswa/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const data = mahasiswa.find((m) => m.id === id);
    if (!data) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(data);
});

// 5. ROUTE POST - Menambahkan data mahasiswa baru
app.post('/mahasiswa', (req, res) => {
    // Memastikan req.body tidak kosong sebelum melakukan destructuring
    if (!req.body) {
        return res.status(400).json({ message: 'Data JSON tidak boleh kosong' });
    }

    const { nama, jurusan } = req.body;

    // Validasi input data
    if (!nama || !jurusan) {
        return res.status(400).json({ message: 'Nama dan jurusan harus diisi!' });
    }

    // Membuat ID baru otomatis (ID terakhir + 1)
    const idBaru = mahasiswa.length > 0 ? mahasiswa[mahasiswa.length - 1].id + 1 : 1;

    const dataBaru = {
        id: idBaru,
        nama: nama,
        jurusan: jurusan
    };

    // Memasukkan data baru ke dalam array
    mahasiswa.push(dataBaru);

    // Mengembalikan status sukses 201 Created dan data yang dimasukkan
    res.status(201).json({
        message: 'Data mahasiswa berhasil ditambahkan!',
        data: dataBaru
    });
});

// 6. RUN SERVER
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
