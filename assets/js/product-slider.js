const container = document.getElementById('product-list');

// tampilkan spinner
container.innerHTML = `
  <div class="loading-wrapper">
    <div class="spinner"></div>
  </div>
`;

fetch('/assets/data/new-products.json')
  .then(res => res.json())
  .then(products => {
    // isi produk
    container.innerHTML = products.map(product => {
      const hasDiscount = product.finalPrice < product.price;
      const discountPercent = hasDiscount
        ? Math.round(((product.price - product.finalPrice) / product.price) * 100)
        : 0;

      return `
        <div class="product-card ${hasDiscount ? 'discount' : ''}" data-id="${product.id}">
          <div class="product-image">
            ${hasDiscount ? `<span class="discount-badge">-${discountPercent}%</span>` : ''}
            <img src="${product.images[0]}" alt="${product.name}">
          </div>
          <p class="product-name">${product.name}</p>
          <p class="product-price">
            IDR ${product.finalPrice.toLocaleString()}
            ${hasDiscount ? `<span class="normal-price">Rp${product.price.toLocaleString()}</span>` : ''}
          </p>
        </div>
      `;
    }).join('');

    // event klik
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        window.location.href = `./product/?id=${id}`;
      });
    });
  })
  .catch(err => {
    container.innerHTML = '<p>Gagal memuat produk.</p>';
    console.error(err);
  });