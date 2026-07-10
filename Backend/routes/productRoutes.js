const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getTestimonials } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { addReview } = require("../controllers/productController");
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);
router.get("/testimonials", getTestimonials);
router.post("/:id/review", protect,addReview);
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;