const express = require("express");
const app = express();
const path = require('path');
const router = express.Router();
const handlebars = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "public"));
app.use('/api/producto', router);

// Config handlebars
app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + '/views/partials/'
}));

// Motor de plantilla
app.set("view engine", "hbs");
// Directorio archivos plantilla
app.set("views", "./views");


// Lista de productos

let productos = []; 


// Rutas

app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname + '/views/index.hbs'));
    res.render("main", { products: productos });
    //res.json(productos); 
})

router.get('/addproduct', (req, res)=>{
    res.sendFile(__dirname+'/public/addproduct.html');
    //res.redirect(__dirname+'/public/addproduct.html');
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

app.get('/:id', (req, res)=>{ //get info by id
    const { id } = req.params;

    const producto = productos.find(producto => producto.id == id);

    if(!producto){ 
        res.json({error: 'producto no encontrado'});
    }

    res.json(producto);
})

app.patch('/:id', (req, res) => {

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


app.delete('/:id', (req, res) => {
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

