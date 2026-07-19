const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`URL: ${url}`);
      console.log(`Status: ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', (err) => {
      console.log(`URL: ${url} - Error: ${err.message}`);
      resolve(false);
    });
  });
}

async function main() {
  await checkUrl('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.4/camera_utils.js');
  await checkUrl('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh.js');
  await checkUrl('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/face_mesh_solution_simd_wasm_bin.js');
}

main();
