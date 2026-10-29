export const Validation = {
    email: (value: string) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regex.test(value)
    },
    password: (value: string): boolean => {
        // Check length
        if (value.length < 8) return false
        // Check for at least one capital letter
        if (!/[A-Z]/.test(value)) return false
        // Check for at least one lowercase letter
        if (!/[a-z]/.test(value)) return false
        // Check for at least one number
        if (!/[0-9]/.test(value)) return false
        // All criteria met
        return true
    }
}