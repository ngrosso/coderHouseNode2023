const socket = io();

socket.emit('message', 'Hola desde el client!!');

socket.on('products', (data) => {
    console.log(data);
    const amount = document.querySelector('#amount');
    amount.innerHTML = `Amount of products showing: ${data.length}`;
    const dataTable = document.querySelector('tbody');
    dataTable.innerHTML = '';
    data.forEach((product) => {
        dataTable.innerHTML += `
        <tr>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.thumbnail}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.status}</td>
            <td>${product.category}</td>
        </tr>
        `;
    });
});

socket.on('error', (data) => {
    console.log(data);
});

const deleteProduct = () => {
    const id = document.querySelector('#productId').value;
    fetch("/api/products/" + id, {
        method: "DELETE"
    }).then((res) => {
        console.log(res);
    });
};
