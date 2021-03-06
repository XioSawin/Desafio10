const express = require("express");
const path = require('path');
const router = express.Router();

const app = express();

// Config 
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname + "public")));
app.use('/api/producto', router);

// Lista de productos

const productos = []; 


// Rutas

router.get("/", (req, res) => {
    res.render("pages/index", { productos: productos });
})

router.get('/addproduct', (req, res)=>{
    res.sendFile(__dirname+'/public/addproduct.html');
})

router.post('/', (req, res) => {

    const {title, price, thumbnail} = req.body;

    let id = (productos.length)+1;

    const producto = {
        id, 
        title, 
        price, 
        thumbnail
    }
    productos.push(producto);
    res.sendStatus(201);
})

router.get('/:id', (req, res)=>{ //get info by id
    const { id } = req.params;

    const producto = productos.find(producto => producto.id == id);

    if(!producto){ 
        res.json({error: 'producto no encontrado'});
    }

    res.json(producto);
})

router.patch('/:id', (req, res) => {

    const { id } = req.params;

    const producto = productos.find(producto => producto.id == id);

    if(!productos){ 
        res.sendStatus(404);
    }

    const {title, price, thumbnail} = req.body;

    producto.title = title;
    producto.price = price;
    producto.thumbnail = thumbnail;
    
    res.sendStatus(204);
})


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const producto = productos.find(producto => producto.id == id);

    if(!producto){ 
        res.sendStatus(404);
    }

    productos = productos.filter((producto) => producto.id != id)
})


// Server listening
app.listen(3535, () => {
    console.log("I´m driving driving on port 3535");
})

