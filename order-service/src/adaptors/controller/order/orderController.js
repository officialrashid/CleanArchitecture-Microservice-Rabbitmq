
const orderController = (orderRepositoryInf,orderServiceInt,orderRepositoryImpl,orderServiceImp)=>{

    const orderDbRepository = orderRepositoryInf(orderRepositoryImpl())
    const orderService = orderServiceInt(orderServiceImp())

}
export default orderController;