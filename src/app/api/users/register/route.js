import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import axios from "axios";
import signToken from "@/utilis/auth";
import { authToken, projectId, dataset } from "../../../../../sanity/env";

export async function POST(req) {
  const mutations = [
    {
      createIfNotExists: {
        _type: "user",
        name: req.body.name,
        email: req.body.email,
        // password: bcrypt.hashSync(req.body.password,10),
        isAdmin: false,
      },
    },
  ];

  const url = `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}?returnIds=true`;

  try {
    const { data } = await axios.post(
      url,
      { mutations },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const userId = data.results[0];
    const user = {
      _id: userId,
      name: req.body.name,
      email: req.body.email,
      // password: bcrypt.hashSync(req.body.password, 10),
      isAdmin: false,
    };
    const token = signToken(user);
    return NextResponse.json({ ...user, token });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.error(new Error("Error creating user"));
  }
}

