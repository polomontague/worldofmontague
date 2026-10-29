import { User } from "@/types/User"
import { UserResult } from "./userBaseQuery"

export const assembleUser = (result: UserResult): User => {
    return {
        id: result.id,
        name: {
            first: result.first_name,
            last: result.last_name
        }
    }
}