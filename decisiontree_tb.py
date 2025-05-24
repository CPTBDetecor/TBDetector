import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import confusion_matrix
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder

# Load dataset
file_path = 'tuberculosis_labeled.xlsx'
df = pd.read_excel(file_path)

# Menyiapkan fitur (X) dan target (y)
X = df.drop(columns=['Prediksi'])  # Menghapus kolom Prediksi dari fitur
y = df['Prediksi']  # Menggunakan kolom Prediksi sebagai target

# Menggunakan LabelEncoder untuk mengonversi label target ke numerik
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Menampilkan distribusi data target
print("Distribusi data target sebelum split:\n", pd.Series(y_encoded).value_counts())

# Membagi data menjadi training dan testing (70% training, 30% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Membuat dan melatih model Decision Tree dengan pembatasan kedalaman
model = DecisionTreeClassifier(random_state=42, max_depth=20, min_samples_split=10)
model.fit(X_train, y_train)

# Prediksi pada data uji
y_pred = model.predict(X_test)

# Menghitung confusion matrix secara manual
cm = confusion_matrix(y_test, y_pred)

# Menghitung precision dan accuracy secara manual
TP = cm[1, 1]  # True Positives
TN = cm[0, 0]  # True Negatives
FP = cm[0, 1]  # False Positives
FN = cm[1, 0]  # False Negatives

# Precision = TP / (TP + FP)
precision = TP / (TP + FP) if (TP + FP) > 0 else 0

# Accuracy = (TP + TN) / (TP + TN + FP + FN)
accuracy = (TP + TN) / np.sum(cm)

# Menampilkan hasil evaluasi
print("Confusion Matrix:")
print(cm)
print("\nPrecision:", precision)
print("Accuracy:", accuracy)

# Validasi fitur sebelum menyimpan model
print("Fitur yang digunakan untuk pelatihan:", X.columns.tolist())

# Menyimpan model, fitur, dan LabelEncoder ke file
model_file_path = 'tuberculosis model baru.pkl'
encoder_file_path = 'label_encoder.pkl'

try:
    joblib.dump((model, X.columns.tolist()), model_file_path)  # Simpan model dan fitur
    print(f"Model disimpan dengan sukses di {model_file_path}")
except Exception as e:
    print(f"Error saat menyimpan model: {e}")

try:
    joblib.dump(label_encoder, encoder_file_path)  # Simpan encoder
    print(f"Encoder disimpan dengan sukses di {encoder_file_path}")
except Exception as e:
    print(f"Error saat menyimpan encoder: {e}")
