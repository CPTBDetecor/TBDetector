import pandas as pd
import random

# Mengatur jumlah data sampel yang akan digenerate
num_samples = 1000

# Fungsi untuk mengenerate data kategori dan range untuk tiap variabel
def generate_data():
    data = {
        "Kepadatan Hunian": [random.choice(["Tinggi", "Sedang", "Rendah"]) for _ in range(num_samples)],
        "Kebiasaan Merokok": [random.choice(["Ya", "Tidak"]) for _ in range(num_samples)],
        "Kelembapan Suhu": [random.choice(["Tinggi", "Sedang", "Rendah"]) for _ in range(num_samples)],
        "Ventilasi": [random.choice(["Baik", "Buruk"]) for _ in range(num_samples)],
        "Nyeri Dada": [random.choice(["Ya", "Tidak"]) for _ in range(num_samples)],
        "Sesak Napas": [random.choice(["Ya", "Tidak"]) for _ in range(num_samples)],
        "Batuk Parah": [random.choice(["Ya", "Tidak"]) for _ in range(num_samples)],
        "Nafsu Makan Menurun": [random.choice(["Ya", "Tidak"]) for _ in range(num_samples)],
        "Demam": [random.choice(["Ya", "Tidak"]) for _ in range(num_samples)],
    }
    return pd.DataFrame(data)

# Sistem skor untuk menentukan apakah "terjangkit TB paru" atau "tidak terjangkit"
def determine_tb_status(row):
    score = 0
    
    # Penentuan skor berdasarkan faktor risiko
    if row["Kepadatan Hunian"] == "Tinggi":
        score += 2
    elif row["Kepadatan Hunian"] == "Sedang":
        score += 1
    else:
        score += 0

    if row["Kebiasaan Merokok"] == "Ya":
        score += 2
    else:
        score += 0

    if row["Kelembapan Suhu"] == "Tinggi":
        score += 1
    elif row["Kelembapan Suhu"] == "Sedang":
        score += 0.5
    else:
        score += 0

    if row["Ventilasi"] == "Buruk":
        score += 2
    else:
        score += 0

    # Penentuan skor berdasarkan gejala
    if row["Nyeri Dada"] == "Ya":
        score += 1.5
    else:
        score += 0

    if row["Sesak Napas"] == "Ya":
        score += 1.5
    else:
        score += 0

    if row["Batuk Parah"] == "Ya":
        score += 3
    else:
        score += 0

    if row["Nafsu Makan Menurun"] == "Ya":
        score += 1
    else:
        score += 0

    if row["Demam"] == "Ya":
        score += 1
    else:
        score += 0

    # Menentukan label berdasarkan skor
    if score >= 8:
        return "Terjangkit TB Paru"
    else:
        return "Tidak Terjangkit"

# Mengenerate data dan menambahkan kolom label
df = generate_data()
df["Status TB Paru"] = df.apply(determine_tb_status, axis=1)

# Menyimpan data ke file Excel
output_file = r"C:\Users\alifn\Documents\buat data\tb_paru_data_1000.xlsx"  # Ganti dengan jalur yang valid
df.to_excel(output_file, index=False)

print(f"Data berhasil disimpan ke {output_file}")
