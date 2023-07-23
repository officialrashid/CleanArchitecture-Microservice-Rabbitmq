import userdata from "../../../entities/user/userEntities.js"


const registerUser = async (name, email, password, repository, authService) => {
    console.log(password, name, "kooooiiii");
    try {
        const user = await repository.userExist(email);

        if (!user) {
            console.log("success oppppppp");
            const changePassword = await authService.bycriptPassword(password);
            const userDetails = userdata(name, email, changePassword); // Pass the hashed password instead of the original password.
            const createUser = await repository.createUser(userDetails);
            return ({status:true,createUser})
        }else{
            return {message:"email already exist in the databse"}
        }
       
    } catch (error) {
        throw new Error(error);
    }
};


 export default registerUser