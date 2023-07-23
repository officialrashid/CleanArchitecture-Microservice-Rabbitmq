
import registerUser from '../../../application/usecase/user/register.js'

const authController = (userRepositoryInt,userRepositoryImp,userServiceInt,userServiceImp)=>{

    const dbRepository = userRepositoryInt(userRepositoryImp())
    const authService = userServiceInt(userServiceImp())

    const createUser = async (req, res) => {
      console.log(req.body, "::::::::::::::::::::::");
      const { name, email, password } = req.body; //getting data from router
      try {
          await registerUser(name, email, password, dbRepository, authService).then((response)=>{
            res.status(200).json(response);
          })
         
      } catch (error) {
          res.status(500).json({ error: "Something went wrong" });
      }
  };
  
   return {
    createUser
   }
}

export default authController