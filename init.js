const app = document.querySelector('#app');
const bitmap = document.querySelector('#bitmap');
const bitmapBtn = document.querySelector('#bitmap-submit');

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
    // const formattedColorData = formatColorData(colorData);
    generateBitMap(+n, +m, colorData);
  })
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