

const productRepositoryInf = (repository) =>{
   
    const addedProduct = (productData) => repository.addedProduct(productData)

    return{
        addedProduct,
    }
}
export default productRepositoryInf