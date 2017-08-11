const app = document.querySelector('#app');
const bitmap = document.querySelector('#bitmap');
const bitmapBtn = document.querySelector('#bitmap-submit');
const whiteNoiseBtn = document.querySelector('#white-noise-submit');

bitmapBtn.onclick = evt => {
  evt.preventDefault();
  clearBitMap();

  const inputs = document.querySelectorAll('#user-input > input');
  let n = 128, m = 128;
  inputs.forEach(i => {
    if (i.id === 'row') n = i.value || i.placeholder || 128;
    else if (i.id === 'col') m = i.value || i.placeholder || 128;
  });

  fetch(`/rgb`, {
    method : 'post',
    body : JSON.stringify({ n, m }),
    headers: {
      'Content-Type' : 'application/json'
    }
  }).then(r => r.json())
  .then(colorData => {
    generateBitMap(+n, +m, colorData);
  })
}

whiteNoiseBtn.onclick = evt => {
  evt.preventDefault();
  const size = document.querySelector('#white-noise input').value || 3;
  whiteNoise(+size);
}

function generateBitMap(n, m, colorData) {
  let newDiv, newRow, curr = 0;
  for (let i = 0; i < n; i++) {
    newRow = document.createElement('div');
    newRow.classList.add('row');
    for (let j = 0; j < m; j++) {
      newDiv = document.createElement('div');
      newDiv.classList.add('cell');
      newDiv.style.backgroundColor = `rgba(${colorData[curr].join(',')}, 1)`;
      curr++;
      newRow.appendChild(newDiv);
    }
    bitmap.appendChild(newRow);
  }
}

function clearBitMap() {
  while (bitmap.hasChildNodes()) {
    bitmap.removeChild(bitmap.lastChild);
  }
}



function whiteNoise(size) {
  const audioContext = new (window.webkitAudioContext || window.AudioContext)();
  const audioSize = 2 * audioContext.sampleRate;
  const noiseBuffer = audioContext.createBuffer(1, audioSize, audioContext.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  const max = size;

  fetch('/whiteNoise', {
      method : 'post',
      body : JSON.stringify({ audioSize, max }),
      headers: {
        'Content-Type' : 'application/json'
    }
  }).then(r => r.json())
    .then(data => {
      console.log('data : ', data);
      for (let i = 0; i < audioSize; i++) {
          output[i] = data[i];
      }

      let whiteNoise = audioContext.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = false;
      whiteNoise.start(0);

      whiteNoise.connect(audioContext.destination);
    });
}