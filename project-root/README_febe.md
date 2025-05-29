# 🧠 TBDetector - Sistem Deteksi Risiko TB Paru Berbasis Web

Aplikasi ini memprediksi risiko Tuberkulosis (TB) menggunakan model machine learning TensorFlow (.h5) yang diakses melalui backend Node.js (Hapi.js) dan frontend React. Semua prediksi dilakukan secara real-time dengan integrasi Python dan Node.js.

---

## 📁 Struktur Proyek

```
project-root/
│
├── backend/
│   ├── server.js                # Backend API Hapi.js (Node.js)
│   ├── predict_tf.py            # Script prediksi TensorFlow (Python)
│   └── tuberculosis_model_tf.h5 # Model TensorFlow (.h5)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── QuestionnaireForm.tsx   # Form kuisioner TB
│   │   └── context/
│   │       └── TBDetectionContext.tsx  # Context untuk riwayat deteksi
│   └── ...
│
└── tuberculosis_labeled.csv     # Dataset acuan fitur
```

---

## 🚀 Cara Menjalankan

### 1. **Jalankan Backend**

**a. Siapkan Python environment**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install tensorflow numpy
```
Pastikan file `tuberculosis_model_tf.h5` ada di folder backend.

**b. Install dependensi Node.js**
```bash
npm install
```

**c. Jalankan server**
```bash
node server.js
```
Server berjalan di `http://localhost:3000`

---

### 2. **Jalankan Frontend**

```bash
cd frontend
npm install
npm run dev
```
Frontend berjalan di `http://localhost:5173`

---

### 3. **Akses Aplikasi**

- Buka browser ke `http://localhost:5173`
- Isi form kuisioner TB, submit, dan lihat hasil prediksi.

---

## 📄 Penjelasan File

### 1. `backend/server.js`
- Server Node.js (Hapi.js) yang menerima request dari frontend.
- Endpoint utama: `POST /predict`
- Saat menerima data, server menjalankan `predict_tf.py` sebagai child process, mengirim data fitur, dan mengembalikan hasil prediksi ke frontend.
- Sudah support CORS agar frontend bisa mengakses API.

### 2. `backend/predict_tf.py`
- Script Python yang memuat model TensorFlow (`tuberculosis_model_tf.h5`).
- Menerima input JSON `{ "fitur": [angka, ...] }` dari stdin.
- Melakukan prediksi dan mengembalikan hasil (`Ya`/`Tidak`) serta probabilitas.
- Hanya berjalan jika dipanggil oleh server.js.

**Tes manual:**
```bash
echo '{"fitur":[0,1,2,1,0,2,1,0,1,2,0,1,2,1,0,1]}' | python3 predict_tf.py
```

### 3. `frontend/src/context/TBDetectionContext.tsx`
- Context React untuk menyimpan riwayat deteksi TB.
- Fungsi `addDetectionResult` hanya menyimpan 1 hasil deteksi terakhir (tidak menumpuk).
- Riwayat disimpan di localStorage dan bisa dihapus dengan `clearHistory`.
- Digunakan oleh komponen lain untuk akses dan update riwayat deteksi.

### 4. `frontend/src/components/QuestionnaireForm.tsx`
- Komponen utama form kuisioner TB.
- Menampilkan 16 pertanyaan sesuai urutan fitur dataset.
- Mapping jawaban ke angka sesuai dataset dan model.
- Setelah submit, mengirim data ke backend `/predict`.
- Menampilkan hasil deteksi dan rekomendasi berdasarkan hasil dari backend.
- Menyimpan hasil ke context (riwayat).

---

## 🛠 Troubleshooting

- **Model tidak ditemukan:** Pastikan `tuberculosis_model_tf.h5` ada di folder backend.
- **Python error:** Pastikan TensorFlow dan numpy sudah terinstall di environment Python.
- **Frontend tidak bisa connect ke backend:** Pastikan backend berjalan di port 3000 dan CORS sudah diaktifkan.
- **Riwayat deteksi dobel:** Context sudah diatur hanya menyimpan 1 hasil terakhir.

---

## 📌 Catatan Penting

- Urutan dan mapping fitur di frontend **harus sama persis** dengan dataset dan model ML.
- Untuk debugging, cek terminal backend dan browser console jika ada error.
- Untuk pengembangan, gunakan Postman/cURL untuk tes endpoint `/predict` secara manual.

---

**Selamat menggunakan TBDetector!**
