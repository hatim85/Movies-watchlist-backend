import User from '../models/authModel.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password,phone } = req.body;

    if (!username || !email || !password || !phone || username === '' || email === '' || password === '' || phone==='') {
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phone
    });

    try {
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Signup successful',
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                phone: newUser.phone
            }
        });
    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler('User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }   

        const token = jwt.sign(
            { id: validUser._id , userType:validUser.userType},
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        const {password:pass,...rest}=validUser._doc;

        res
            .status(200)
            .cookie('access_token', token, {
                httpOnly: true
            })
            .json(rest);
    }
    catch (error) {
        next(error);
    }
};

export const signout=(req,res,next)=>{
    try {
        res
            .clearCookie('access_token')
            .status(200)
            .json('Signout successfull');
    } catch (error) {
        next(error);
    }
}