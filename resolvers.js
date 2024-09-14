import { Users,Quotes } from "./db.js";
import { randomBytes } from "crypto";
const resolvers ={
    Query:{
        greet:()=>"Hello World",
        users:()=>Users,
        user:(_,args)=>Users.filter(usr=>usr.id==args.id),
        quotes:()=>Quotes,
        iquote:(_,args)=>Quotes.filter(qu=>qu.by==args.by)
        
    },
    User:{
        quotes:(usr)=>Quotes.filter(qu=>qu.by==usr.id)
    },
    Mutation:{
        SignUpUser:(_,{newuser})=>{
            let id = randomBytes(5).toString('hex');
            Users.push({id,...newuser});

            return Users.find(usr=>usr.id == id);
        }
    }
}

export default resolvers;