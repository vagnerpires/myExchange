import { useContext } from "react"
import { userContextProps } from "../../context/userContext"
import { supabase } from "../../models/supabase/client"

//hook
const useAuth = () => {

    const [userID, setUserID] = useContext(userContextProps)

    const validate = (user, email, password) => {
        if (email === user.email && password === user.password) return true
        return false

    }

    //user by email using Supabase
    const findOne = async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
        if (error) throw error
        return data[0]
    }

    //authenticates a user
    const auth = async (request) => {
        const { email, password } = request

        const user = await findOne(email)

        if (user) {
            const result = validate(user, email, password)
            if (result) {
                setUserID(user)
                return true
            }
        }
        return false
    }

    //Logs out the user
    const logout = async () => setUserID(null)

    return {
        auth,
        logout
    }

}

export default useAuth