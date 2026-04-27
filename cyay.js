const products = [
    { id: 1, name: "My little Pony Pop Mart Skull Panda ", price: 1100, cat: "cat1", img: "https://m.media-amazon.com/images/I/71E91KOGwpL._AC_UF894,1000_QL80_.jpg" },
    { id: 2, name: "My Little Pony Trading Card", price: 110, cat: "cat1", img: "https://ocare.co.nz/cdn/shop/files/My-Little-Pony-Friendship-Eternal-Card-Moon-Edition-SEA-Single_284c49df-a15a-4738-b40d-3c08f4606b58.jpg?v=1747188346" },
    { id: 3, name: "My Little Pony Funism", price: 3500, cat: "cat1", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQKOBgtyXsnGm-AFFLSZpu9PSO_Mvcmr9NsiBaybHakYbIll95VyjpP6CDqEciFyCbWu_LzeJqXDtxHNgYOjSXrwJrvWD3rXUfng4iIzpiW-KOHYcAnZZesKA" },
    { id: 4, name: "My Little Pony Bitty Pop! 4-Pack", price: 1500, cat: "cat1", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTPSRHQliaMvWCnx77pgXdIPuAvp7IxFdiFQAM1B1GfW5YAMLCdMjEpuvjvzfCxFpGEaiF6gmrECZ164t7RkvvFxEsduW-nRg" },
    { id: 5, name: "My Little Pony Twilight Sparkle Bishoujo Statue", price: 20000, cat: "cat1", img: "https://image-cdn.ubuy.com/kotobukiya-my-little-pony-twilight/400_400_100/69b89a80100fa903be054011.jpg" },

    { id: 6, name: "Muji Pens (6-pack)", price: 300, cat: "cat2", img: "https://down-ph.img.susercontent.com/file/cn-11134207-7r98o-lxjra84kw4df6a.webp" },
    { id: 7, name: "Mildliners (25-pack)", price: 3000, cat: "cat2", img: "https://m.media-amazon.com/images/I/81iTcSf7RgL._AC_SX679_.jpg" },
    { id: 8, name: "Miffy Pens (5-pack)", price: 450, cat: "cat2", img: "https://m.media-amazon.com/images/I/61Y+qXMXF8L.jpg" },
    { id: 9, name: "Kokuyo Campus Notebook", price: 400, cat: "cat2", img: "https://i.etsystatic.com/11920103/r/il/417f0f/3179945355/il_fullxfull.3179945355_9q89.jpg" },
    { id: 10, name: "Dong-a Refillable Correction Tape (w/ refill)", price: 80, cat: "cat2", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpZpBRUKpgwycVmgGV7XhaQGPMNB8o0H7QQ&s" },

    { id: 11, name: "Camp Half Blood Shirt", price: 280, cat: "cat3", img: "https://iili.io/BPoiFNS.jpg" },
    { id: 12, name: "Trident (Cabin 3 Edition)", price: 5500, cat: "cat3", img: "https://iili.io/BPoPmVn.jpg" },
    { id: 13, name: "Navy Blue Hat", price: 170, cat: "cat3", img: "https://iili.io/BPoPUoF.jpg" },
    { id: 14, name: "Red Converse (Secondhand)", price: 750, cat: "cat3", img: "https://iili.io/BPo6g24.jpg" },
    { id: 15, name: "Bead Necklace", price: 100, cat: "cat3", img: "https://iili.io/BPoioKb.jpg" },
    
    { id: 16, name: "Cookies Cake", price: 550, cat: "cat4", img: "https://iili.io/BPoU6WG.jpg" },
    { id: 17, name: "Penguin Cake", price: 600, cat: "cat4", img: "https://iili.io/BPoUaix.jpg" },
    { id: 18, name: "Ginger Bread House", price: 1000, cat: "cat4", img: "https://iili.io/BPog20Q.jpg" },
    { id: 19, name: "Cinnamon Rolls (12-pack)", price: 500, cat: "cat4", img: "https://iili.io/BPoUoKl.jpg" },
    { id: 20, name: "Sugar Cookies (3-pack)", price: 250, cat: "cat4", img: "https://iili.io/BPoglXs.jpg" }
];


let cart = [];
let currentProductId = null;

function showView(viewId) {
    document.getElementById('shop-view').classList.add('hidden');
    document.getElementById('about-view').classList.add('hidden');
    document.getElementById(viewId).classList.remove('hidden');
}

function openModal(productId) {
    currentProductId = productId;
    document.getElementById('qty-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('qty-modal').classList.add('hidden');
    document.getElementById('qty-input').value = 1;
}

function confirmAddToCart() {
    const qtyInput = document.getElementById('qty-input');
    const qty = parseInt(qtyInput.value);
    const product = products.find(p => p.id === currentProductId);
    
    if (product && qty > 0) {
        cart.push({ 
            prod_id: product.id,
            prod_name: product.name, 
            prod_price: product.price, 
            prod_qty: qty 
        });
        updateCartUI();
        closeModal();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    list.innerHTML = "";
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.prod_price * item.prod_qty;
        const li = document.createElement('li');
        li.innerHTML = `${item.prod_name} (x${item.prod_qty}) - P${itemTotal} <button type="button" onclick="removeFromCart(${index})">Remove</button>`;
        list.appendChild(li);
        total += itemTotal;
    });
    
    totalEl.innerText = total;
}

function prepareOrder() {
    const orderData = cart.map(item => ({
        prod_name: item.prod_name,
        prod_price: item.prod_price * item.prod_qty
    }));
    
    document.getElementById('cust_order_input').value = JSON.stringify(orderData);
}

function displayProducts() {
    products.forEach(p => {
        const container = document.getElementById(p.cat);
        if (container) {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.img}" alt="${p.name}" style="width:100%; height:150px; object-fit:cover; border-radius:10px;">
                <h4>${p.name}</h4>
                <p>P${p.price}</p>
                <button type="button" onclick="openModal(${p.id})">Add to Cart</button>
            `;
            container.appendChild(card);
        }
    });
   }   ;

displayProducts();