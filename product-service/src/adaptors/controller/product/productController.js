
import addedProduct from "../../..//application/usecase/product/addProduct.js"
const productController = (productRepositoryInf,productServiceInf,productRepositoryImp,productServiceImp) =>{
  
const productDbRepository = productRepositoryInf(productRepositoryImp())
const productService =  productServiceInf(productServiceImp())

const addProduct = async (req,res) =>{
    const {productName,category,price,discription} = req.body
   try {

      await addedProduct(productName,category,price,discription,productDbRepository,productService).then((response)=>{

        res.status(200).json(response)
      })
   } catch (error) {
      res.status(500).json({error:"something went to wrong"})
   }

   

}
return {
    addProduct
}

}
export default productController