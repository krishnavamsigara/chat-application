import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"


//signup new user
export const signup = async (req,res) =>{
    const {fullName,email,password,bio} = req.body
    try {
        if(!fullName || !email || !password || !bio){
            return res.json({success:false,message:"Missing Details"})
        }
        const user = await User.findOne({email})
        if (user) {
            return res.json({success:false,message:"Account already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await User.create({
            fullName,email,password:hashedPassword,bio
        })

        const token = generateToken(newUser._id)

        res.json({success:true,userData:newUser,token,message:"Account created successfully"})
    } catch (error) {
         return res.json({success:false,message:error.message})
         console.log(error.message)
        
    }
}
//controller to login
export const login = async (req,res) =>{
    try {
        const {email,password} = req.body
        const userData = await User.findOne({email})

        const isPasswordCorrect = await bcrypt.compare(password,userData.password)

        if(!isPasswordCorrect){
            return res.json({success:false,message:"Invalid credtials"})
        }

        const token = generateToken(userData._id)
        return res.json({success:true,userData,token,message:"Login successful"})
    } catch (error) {
        
    }
}

//controller to if user authenticated
export const checkAuth = (req,res) =>{
    res.json({success:true,user:req.user})
}

//controller to update user profile details
export const updateProfile = async (req, res) => {
    try {
        const { profilePic, bio, fullName } = req.body;
        const userId = req.user._id;

        let updateData = { bio, fullName };

        // If profilePic is provided, upload it
        if (profilePic) {
            const upload = await cloudinary.uploader.upload(profilePic);
            updateData.profilePic = upload.secure_url;
        }

        // Update user and return the updated document
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            select: "-password", // exclude password from response
        });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Update profile error:", error.message);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
};
