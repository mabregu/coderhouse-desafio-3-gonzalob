const fs = require('fs');

class Contenedor {

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    setProducts = (products) => {
        this.products = products;
    }

    countProducts = () => this.products.length;

    save = async (product) => {
        
        try {
            const id = this.products.length + 1;
            this.products.push({...product, id});
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));  
            return id;
        } catch (err) {
            console.log('[error save method]', err);
        }
        
    }

    readFileContenedor = async () => {
        
        try {
            const file = await fs.promises.readFile(this.path, 'utf-8');
            if (file != "")
                return JSON.parse(file);
            else
                return [];
            
        } catch (err) {
            console.log('[error readFileContenedor method]', err);
        }
    }

    getById = (id) => {
        const product = this.products.filter(  prd => prd.id === id ? prd: null);
        return product.length !== 0 ? product[0] : null;
    }

    getAll = () => this.products;
    

    deleteById = async (id) => {

        try {
            const tempProducts = this.products.filter( prd => prd.id !== id);
            this.products = tempProducts;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));  
        } catch(err) {
            console.log('[error deleteById(:id) method]', err);
        }
        
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.path, '');  
            this.products = [];
        } catch(err) {
            console.log('[error deleteAll method]', err);
        }
        
    }
}

module.exports = {
    Contenedor
}