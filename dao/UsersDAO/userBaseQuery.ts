import { db } from "@/prisma/db"
import type { ResultType } from "@prisma/orm-postgres/components/runtime"

export const userBaseQuery = () => {
    return db.orm.public.User.select("id", "first_name", "last_name")
}

export type UserResult = ResultType<ReturnType<typeof userBaseQuery>>