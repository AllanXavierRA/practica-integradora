import { Router } from 'express';
const router = Router();
import { productDelete, productGet, productPost } from '../controller/productManagerDB.js';
import ProductManager from '../controller/productManager.js'
import { socketServer } from '../app.js';
const productManager = new ProductManager('product.json');


router.get('/', productGet);

router.get('/:pid', async(req, res) => {
    const {pid} = req.params
    const product = await productManager.getProductById(Number(pid))
    res.send(product)
})

router.post('/', productPost)

router.delete('/:pid', productDelete)

router.put('/:pid', async(req, res) => {
    const {pid} = req.params;
    const {title, description, price, code, stock} = req.body
    await productManager.updateProduct(Number(pid), title, description, price, code, stock);
    const product = await productManager.getProducts();
    res.send(product)
})




export default router;