import userData from '../../../mongodb/models/userModels/userModels.js'
const userRepositoryImp = () =>{

    const userExist = (email) => userData.findOne({email:email})
    const createUser = async (user) =>{
        const users =  await new userData({
            name: user?.getname(),
            email: user?.getemail(),
            password: user?.getpassword()
        })
        return users.save()
    }
    return{

        userExist,
        createUser
    }
}

export default userRepositoryImp