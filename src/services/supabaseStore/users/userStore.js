import { supabase } from "../../../models/supabase/client"

const useUsersClient = () => {

    const findAll = async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
        if (error) throw error
        return data
    }

    const findOne = async (value) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', value)
        if (error) throw error
        return data[0]
    }

    const findUserHome = async (value) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('name', value)
        if (error) throw error
        return data[0]
    }

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

    const update = async (value) => {
        const { data, error } = await supabase
            .from('users')
            .update(value)
            .eq('id', value.id)
            .select()
        if (error) throw error
    }


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