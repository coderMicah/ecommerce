import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import signToken from "@/utilis/auth";
import { client } from "../../../../../sanity/lib/client";

export async function POST(request) {
  const res = await request.json();

  // const existUser = await client.fetch(`*[_type == "user" && email == $email]`, {
  //   email: res.email,
  // });

  // if (existUser) {
  //   return NextResponse.error(existUser);
  // }

  try {
    const data = await client.create({
      _type: "user",
      name: res.name,
      email: res.email,
      password: bcrypt.hashSync(res.password, 10),
      isAdmin: false,
    });

    const user = {
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
    };
    const token = signToken(user);
    return NextResponse.json({ ...user, token });
  } catch (error) {
    return NextResponse.error(error);
  }
}
