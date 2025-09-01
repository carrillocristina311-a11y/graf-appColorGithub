(() => {
  const r = document.getElementById('rangeR');
  const g = document.getElementById('rangeG');
  const b = document.getElementById('rangeB');

  const inputR = document.getElementById('inputR');
  const inputG = document.getElementById('inputG');
  const inputB = document.getElementById('inputB');

  const valR = document.getElementById('valR');
  const valG = document.getElementById('valG');
  const valB = document.getElementById('valB');

  const hexOut = document.getElementById('hexOut');
  const rgbOut = document.getElementById('rgbOut');
  const preview = document.getElementById('preview');
  const previewText = document.getElementById('previewText');
  const btnCopy = document.getElementById('btnCopy');
  const colorPicker = document.getElementById('colorPicker');

  const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase();

  function update(rv, gv, bv) {
    // Sincronizar sliders e inputs
    r.value = rv; inputR.value = rv;
    g.value = gv; inputG.value = gv;
    b.value = bv; inputB.value = bv;

    valR.textContent = rv;
    valG.textContent = gv;
    valB.textContent = bv;

    const hex = `${toHex(rv)}${toHex(gv)}${toHex(bv)}`;
    const rgb = `rgb(${rv}, ${gv}, ${bv})`;

    hexOut.value = hex;
    rgbOut.value = rgb;
    colorPicker.value = `#${hex}`;

    preview.style.backgroundColor = `#${hex}`;
    previewText.textContent = `#${hex}`;

    // Ajustar contraste del texto
    const luminance = (c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    const L = 0.2126 * luminance(rv) + 0.7152 * luminance(gv) + 0.0722 * luminance(bv);
    previewText.style.color = L > 0.5 ? '#000' : '#fff';
  }

  // Copiar HEX
  btnCopy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(`#${hexOut.value}`);
      btnCopy.textContent = 'Copiado';
      setTimeout(() => (btnCopy.textContent = 'Copiar'), 1200);
    } catch {
      hexOut.select();
      document.execCommand('copy');
    }
  });

  // Eventos de sliders
  [r, g, b].forEach(() => {
    [r, g, b].forEach((el) => el.addEventListener('input', () => update(+r.value, +g.value, +b.value)));
  });

  // Eventos de inputs numéricos
  [inputR, inputG, inputB].forEach((el) => {
    el.addEventListener('input', () => {
      let rv = Math.min(255, Math.max(0, +inputR.value || 0));
      let gv = Math.min(255, Math.max(0, +inputG.value || 0));
      let bv = Math.min(255, Math.max(0, +inputB.value || 0));
      update(rv, gv, bv);
    });
  });

  // Evento del color picker
  colorPicker.addEventListener('input', () => {
    const hex = colorPicker.value.replace('#', '');
    const rv = parseInt(hex.substring(0, 2), 16);
    const gv = parseInt(hex.substring(2, 4), 16);
    const bv = parseInt(hex.substring(4, 6), 16);
    update(rv, gv, bv);
  });

  // Inicializar
  update(128, 128, 128);
})();

