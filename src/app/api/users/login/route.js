import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import signToken from "@/utilis/auth";
import { client } from "../../../../../sanity/lib/client";

export async function POST(request) {
  const res = await request.json();

  const user = await client.fetch(`*[_type == "user" && email == $email][0]`, {
    email: res.email,
  });
  if (user && bcrypt.compare(res.password, user.password)) {
    const token = signToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    return NextResponse.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    return NextResponse.error(error);
  }
}
