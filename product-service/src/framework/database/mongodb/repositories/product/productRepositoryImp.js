import productData from "../../models/productModels/productModels.js";
const productRepositoryImp = () =>{
    
    const addedProduct = (productDatas)=>{
        
        const products = new productData({
            productName:productDatas?.getProductName(),
            category:productDatas?.getCategory(),
            price:productDatas?.getPrice(),
            discription:productDatas?.getDiscription()
        })
        return products.save()
    }
    return{
        addedProduct,
    }
}
export default productRepositoryImp;