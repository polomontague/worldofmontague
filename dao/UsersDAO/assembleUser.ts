import { User } from "@/types/User"
import { UserBaseRow } from "./userBaseQuery"

export const assembleUser = (row: UserBaseRow): User => {
    return {
        id: row.id,
        name: {
            first: row.first_name,
            last: row.last_name
        }
    }
}