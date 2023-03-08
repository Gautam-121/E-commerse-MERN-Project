const express =  require("express")
const { getAllProduct , createProduct , updateProduct ,productDelete , getProductDetail } = require("../controllers/productController")

const router = express.Router()

router.route("/products").get(getAllProduct)

router.route('/product/new').post(createProduct)

router.route('/product/:id').put(updateProduct)

router.route('/product/:id').delete(productDelete)

router.route('/product/:id').get(getProductDetail)





module.exports =  router