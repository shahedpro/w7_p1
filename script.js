document.addEventListener('DOMContentLoaded', () => {
    const apiBase = 'https://fakestoreapi.com';
    const categorySelect = document.getElementById('categorySelect');
    const productList = document.getElementById('productList');
    const productDetails = document.getElementById('productDetails');

   
    fetch(`${apiBase}/products/categories`)
        .then(res => res.json())
        .then(categories => {
            console.log(categories); 
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        });


    const fetchProducts = (category = 'all') => {
        let url = `${apiBase}/products`;
        if (category !== 'all') {
            url += `/category/${category}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(products => {
                console.log(products);
                productList.innerHTML = '';
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';
                    productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.price} USD</p>
                    `;
                    productDiv.addEventListener('click', () => showProductDetails(product.id));
                    productList.appendChild(productDiv);
                });
            });
    };

    // Show product details
    const showProductDetails = (productId) => {
        fetch(`${apiBase}/products/${productId}`)
            .then(res => res.json())
            .then(product => {
                console.log(product);
                productDetails.innerHTML = `
                    <h2>${product.title}</h2>
                    <img src="${product.image}" alt="${product.title}" width="200">
                    <p>${product.description}</p>
                    <p>Category: ${product.category}</p>
                    <p>Price: ${product.price} USD</p>
                `;
            });
    };

    categorySelect.addEventListener('change', (event) => {
        fetchProducts(event.target.value);
    });

    fetchProducts();
});
