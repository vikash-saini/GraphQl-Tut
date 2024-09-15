import { Users, Quotes } from "./db.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JSON_SECRET } from "./config.js";

const UserModel = mongoose.model("User");
const QuoteModel = mongoose.model("Quote");

const resolvers = {
  Query: {
    greet: () => "Hello World",
    users: async() => await UserModel.find({}),
    user: async (_, args) => await UserModel.findOne({_id:args._id}),
    quotes: async() => await QuoteModel.find({}).populate("by","_id firstName"),
    iquote: async(_, args) => await QuoteModel.find({by:args.by}),
    myProfile: (_,args,context)=> context
  },
  User: {
    quotes: async (usr) => await QuoteModel.find({by:usr._id}),
  },
  Mutation: {
    SignUpUser: async (_, { newuser }) => {
      // let id = randomBytes(5).toString('hex');
      // Users.push({id,...newuser});
      // return Users.find(usr=>usr._id == id);
      const existingUser = await UserModel.findOne({ email: newuser.email });
      if (existingUser) {
        throw new Error("User already exists");
      }
      const hashedPassword = await bcrypt.hash(newuser.password, 12);
      const createUser = new UserModel({
        ...newuser,
        password: hashedPassword,
      });
      return createUser.save();
    },
    loginInUser: async (_, { loginUser }) => {
      const hashedPassword = await bcrypt.hash(loginUser.password, 12);
      // check if user exits
      const user = await UserModel.findOne({ email: loginUser.email });
      if (!user) {
        throw new Error("User not found");
      }
      const doPassMatch = await bcrypt.compare(
        loginUser.password,
        user.password
      );
      if (!doPassMatch) {
        throw new Error("email or password is invalid");
      }
      const token = jwt.sign({ user }, JSON_SECRET);
      return { token };
    },
    createQuote: (_, { quote }, context) => {
    //   console.log("context",context);
      if (!context?._id) {
        throw new Error("You must login first");
      }
      const addQuote = new QuoteModel({
        quote,
        by: context._id,
      });
      addQuote.save();
      return "Quote added Successfully";
    },
  },
};

export default resolvers;
