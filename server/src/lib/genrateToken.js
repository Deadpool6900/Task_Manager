import jwt from 'jsonwebtoken';

const generateToken =(id)=>{
    return jwt.sign({ id }, process.env.JWT_SCRAET, {
			expiresIn: "30d",
		});
}
export default generateToken;