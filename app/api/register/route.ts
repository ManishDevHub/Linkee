import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/app/models/user";
import connectToDatabase from "@/lib/mongodb";
import { requestToBodyStream } from "next/dist/server/body-streams";

export async function POST(request:Request) {
    const {name, email, password, confirmPassword}  = await request.json();
const isValidEmail = (email: string) => {


    const emailReges = /^[^\s@]+@[^\@]+\.[^\s@]+$/;
    return emailReges.test(email);
    
}
if( !name || !email || !password || !confirmPassword) {
    return NextResponse.json({message: "All fields are required"}, {status: 400})
}

if(!isValidEmail(email)){
    return NextResponse.json({message: "Invalid email"}, {status: 400})
}
if( confirmPassword !== password){
    return NextResponse.json({message: " Password do not match "}, {status: 400})
}
if( password.length <6){
    return NextResponse.json({message: " Password must be ar least 6 cherecter"}, { status: 400})
}
try{
    await connectToDatabase();
    const existingUser = await User.findOne({ email});
    if(existingUser) {
        return NextResponse.json({ message: "User already exist"}, { status : 400})
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        name,
        password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json({ message: "User created "}, { status: 201})

}catch(e){
    return NextResponse.json({message: " Something went wrong"}, {status: 500})

}

}