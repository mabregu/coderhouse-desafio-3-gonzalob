const express = require('express');
const app = express();

const PORT = 8080;
const PATH = './data/productos.txt';

const { Contenedor } = require('./models/Contenedor');
const contenedor = new Contenedor(PATH);

app.get('/healthcheck', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'healthcheck ok!'
    })
})


app.get('/productos', async (req, res) => {
    const data = await contenedor.readFileContenedor();

    if (data === undefined) {
        res.status(500).json({
            ok: false,
            msg: 'Please contacto with the Admin'
        });
    }

    res.json({
        ok: true,
        total: data.length,
        data
    })
})

app.get('/productoRandom', async (req, res) => {
    const data = await contenedor.readFileContenedor();
    const randomProduct = Math.floor(Math.random() * 3);

    if (data === undefined) {
        res.status(500).json({
            ok: false,
            msg: 'Please contacto with the Admin'
        });
    }

    res.json({
        ok: true,
        total: data.length,
        data: data[randomProduct],
    });
});
 
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = server;