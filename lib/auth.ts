import db from '@/db';
import { user ,account,session,verification} from '@/src/db/schema';
import {
    betterAuth,
    
} from 'better-auth';
import {
    drizzleAdapter
} from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { UserSubscriptionTable } from '@/src/db/product';



export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite",
        schema: {
            user,
            account,
            session,
            verification,
            UserSubscriptionTable
        }
        
    }),
   

    emailAndPassword: {
        enabled: true,

    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }
    },
    
       
            

   
        
    
    plugins: [nextCookies()], // make sure this is the last plugin in the array

   
    
     
    /** if no database is provided, the user data will be stored in memory.
     * Make sure to provide a database to persist user data **/
});

