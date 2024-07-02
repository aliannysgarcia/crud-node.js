import express from 'express';
import controller from '../controllers/products.js';

const router = express.Router();

// ---------- RUTA GET ----------

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);


// ---------- RUTA POST ----------
router.post('/', controller.postProduct);

// ---------- RUTA PUT ----------
router.put('/:id', controller.putProduct);

// ---------- RUTA DELETE ----------
router.delete('/:id', controller.deleteProduct);


export default router;