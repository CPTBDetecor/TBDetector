import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # Hilangkan warning TensorFlow

import sys
import json
import numpy as np
import tensorflow as tf

# Load model dari path file saat ini
try:
    model_path = os.path.join(os.path.dirname(__file__), 'tuberculosis_model_tf.h5')
    model = tf.keras.models.load_model(model_path)
except Exception as load_error:
    print(json.dumps({
        "error": f"Gagal memuat model: {str(load_error)}"
    }), flush=True)
    sys.exit(1)

THRESHOLD = 0.5

def predict_tb(data):
    try:
        fitur = data.get("fitur", [])
        if not isinstance(fitur, list) or len(fitur) != 16:
            return {"error": "Input harus berupa array dengan tepat 16 fitur."}

        arr = np.array([float(f) for f in fitur], dtype='float32').reshape(1, -1)
        pred = model.predict(arr)
        hasil = "Ya" if pred[0][0] >= THRESHOLD else "Tidak"

        return {
            "hasil_prediksi": hasil,
            "nilai_probabilitas": round(float(pred[0][0]), 4)
        }

    except Exception as e:
        return {"error": f"Gagal prediksi: {str(e)}"}

# Eksekusi utama saat script dipanggil dari Node.js
if __name__ == '__main__':
    try:
        input_json = sys.stdin.read()
        data = json.loads(input_json)
        result = predict_tb(data)
        print(json.dumps(result), flush=True)  # WAJIB: langsung kirim ke stdout
    except Exception as e:
        print(json.dumps({"error": f"Kesalahan parsing atau eksekusi: {str(e)}"}), flush=True)
