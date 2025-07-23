'use server'

import { Polar } from "@polar-sh/sdk";

export async function polar(){
    const env = process.env.POLAR_ACCESS_TOKEN
  if(!env){
    throw new Error(' polar access token imvalid')
  }
  

    return new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN!,
    server: "production", 
  })}