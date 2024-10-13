import bcrypt from 'bcrypt';
const saltRound = 10;
const hashpassword = async(password)=>{
    const salt = await bcrypt.genSalt(saltRound)
    return bcrypt.hash(password,salt);
}
export default hashpassword;
