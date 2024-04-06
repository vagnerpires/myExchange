import { supabase } from "../../../models/supabase/client"

const useUsersClient = () => {

    // find all users
    const findAll = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
        if (error) throw error
        return data
    }

    // find one user
    const findOne = async (value) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', value)
        if (error) throw error
        return data[0]
    }

    // find one user
    const findUserHome = async (value) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('name', value)
        if (error) throw error
        return data[0]
    }

    // create one user
    const createOne = async (value) => {
        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    name: value.name,
                    email: value.email,
                    password: value.password
                },
            ])
            .select()
        if (error) throw error
    }

    // update one user
    const update = async (value) => {
        const { data, error } = await supabase
            .from('users')
            .update(value)
            .eq('id', value.id)
            .select()
        if (error) throw error
    }

    // destroy one user
    const destroy = async (value) => {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', value)
        if (error) throw error
    }

    return {
        findAll,
        findOne,
        createOne,
        update,
        destroy,
        findUserHome
    }

}

export default useUsersClient