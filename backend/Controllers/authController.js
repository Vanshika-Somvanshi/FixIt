// import User from '../models/UserSchema.js'
// import Service from '../models/ServiceSchema.js'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'

// //handle registration and login

// const generateToken = user=>{
//     return jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET_KEY,{
//         expiresIn:"15d",
//     })
// }
// // const crypto = require('crypto');
// export const register = async (req, res) => {

//     const {email, password, name, role, photo, gender} = req.body

//     try { 

//         let user = null

//         if(role==='customer'){
//             user= await User.findOne({email})
//         }
//         else if (role==='service'){
//             user = await Service.findOne({email})
//         }

//         // check if user exist
//         if(user){
//             return res.status(400).json({message: 'User already exist'})
//         }

//         // hash password
//         const salt = await bcrypt.genSalt(10)
//         const hashPassword = await bcrypt.hash(password, salt)

//         if(role==='customer'){
//             user = new User({
//                 name,
//                 email,
//                 password:hashPassword,
//                 photo,
//                 gender,
//                 role
//             })
//         }

//         if(role==='service'){
//             user = new Service({
//                 name,
//                 email,
//                 password:hashPassword,
//                 photo,
//                 gender,
//                 role
//             })
//         }
// // save user in service or user model
//         await user.save()

//         res
//         .status(200)
//         .json({success:true, message:'User successfully created'})


//     } catch (err) {
//         res
//         .status(500)
//         .json({success:false, message:'Internal server error, Try again'})
        
//     }
// };

// export const login = async (req, res) => {

//     const {email} = req.body

//     try {

//         let user = null

//         const customer = await User.findOne({email})
//         const service = await Service.findOne({email})

//         if(customer){
//             user = customer
//         }
//         if(service){
//             user = service
//         }

//         // check if user exist or not
//         if(!user){
//             return res.status(404).json({ message: "User not found"});
//         }

//         // compare password
//         const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

//         if(!isPasswordMatch){
//             return res.status(400).json({status:false, message: 'Invalid credentials'})
//         }

//          // if password matches then we generate authentication token
//          const token = generateToken(user)

//          const{password, role, appointments, ...rest}=user._doc

//          res.status(200).json({status:true, message: 'Sucessfully login', token, data:{...rest}, role});
    

//     } catch (err) {
//         res.status(500).json({status:false, message: 'Failed to login'});
//     }
// };


import User from '../models/UserSchema.js';
import Service from '../models/ServiceSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Handle registration and login

const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15d",
    });
};

// Registration handler
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;
        // console.log(user.role)
        if (role === 'customer') {
            user = await User.findOne({ email });
        } else if (role === 'service') {
            user = await Service.findOne({ email });
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // console.log(user.role);
        if (role === 'customer') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        if (role === 'service') {
            user = new Service({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }

        // Save user in service or user model
        await user.save();

        res
            .status(200)
            .json({ success: true, message: 'User successfully created' });

    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: 'Internal server error, try again' });
    }
};

// Login handler
export const login = async (req, res) => {
    const { email } = req.body;

    try {
        let user = null;

        const customer = await User.findOne({ email });
        const service = await Service.findOne({ email });

        if (customer) {
            user = customer;
        }
        if (service) {
            user = service;
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: false, message: 'Invalid credentials' });
        }

        // If password matches, generate authentication token
        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;
        console.log(user.role)
        res.status(200).json({ status: true, message: 'Successfully logged in', token, data: { ...rest }, role });

    } catch (err) {
        res.status(500).json({ status: false, message: 'Failed to login' });
    }
};



