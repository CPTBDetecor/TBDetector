const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const { spawn } = require('child_process');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'] // Izinkan semua origin, atau ganti dengan ['http://localhost:5173']
      },
      files: {
        relativeTo: Path.join(__dirname, '../frontend')
      }
    }
  });

  await server.register(Inert);

  // Serve static HTML
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => h.file('index.html')
  });

  // API prediksi
  server.route({
    method: 'POST',
    path: '/predict',
    handler: async (request, h) => {
      const input = JSON.stringify(request.payload);

      return new Promise((resolve) => {
        // Ganti 'python3' menjadi 'python' agar sesuai dengan Windows
        const py = spawn('python', ['predict_tf.py'], { cwd: __dirname });

        let stdoutData = '';
        let stderrData = '';

        py.stdout.on('data', (chunk) => {
          stdoutData += chunk.toString();
        });

        py.stderr.on('data', (err) => {
          stderrData += err.toString();
          console.warn('[PY WARNING]', err.toString());
        });

        py.on('close', () => {
          const lines = stdoutData.trim().split('\n');
          const lastLine = lines[lines.length - 1]; // Ambil hanya baris terakhir

          try {
            const parsed = JSON.parse(lastLine);
            resolve(parsed);
          } catch (e) {
            console.error('[PY RAW STDOUT]', stdoutData); // untuk debug
            resolve({
              error: 'Gagal parsing hasil prediksi dari model.',
              log: stderrData || stdoutData
            });
          }
        });

        console.log('[PYTHON RAW STDOUT]', stdoutData);

        py.stdin.write(input);
        py.stdin.end();
      });
    }
  });

  await server.start();
  console.log('✅ Server running at:', server.info.uri);
};

init();
