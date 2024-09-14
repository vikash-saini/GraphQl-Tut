import { Users,Quotes } from "./db.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";
import { JSON_SECRET } from "./config.js";

const UserModel = mongoose.model('User');
const resolvers ={
    Query:{
        greet:()=>"Hello World",
        users:()=>Users,
        user:(_,args)=>Users.filter(usr=>usr._id==args._id),
        quotes:()=>Quotes,
        iquote:(_,args)=>Quotes.filter(qu=>qu.by==args.by)
        
    },
    User:{
        quotes:(usr)=>Quotes.filter(qu=>qu.by==usr._id)
    },
    Mutation:{
        SignUpUser:async (_,{newuser})=>{
            // let id = randomBytes(5).toString('hex');
            // Users.push({id,...newuser});

            // return Users.find(usr=>usr._id == id);

            const existingUser = await UserModel.findOne({email:newuser.email});
            if (existingUser) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(newuser.password,12);
            const createUser = new UserModel({...newuser, password:hashedPassword})

            return createUser.save();
        },
        loginInUser:async (_,{loginUser})=>{

            const hashedPassword = await bcrypt.hash(loginUser.password,12);
            // check if user exits
            const user = await UserModel.findOne({email:loginUser.email});

            if (!user) {
                throw new Error("User not found");
            }
            const doPassMatch = await bcrypt.compare(loginUser.password,user.password)
            if (!doPassMatch) {
                throw new Error("email or password is invalid");
            }

            const token = jwt.sign({user},JSON_SECRET);
            return {token};

        }
    }
}

export default resolvers;