import { UserSubscriptionTable } from "@/src/db/product";
import db from "..";

export function createUserSubscriptionsfuction(
data:typeof UserSubscriptionTable.$inferInsert
){
    return db.insert(UserSubscriptionTable).values(data)
}