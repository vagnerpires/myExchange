import { supabase } from "../../../models/supabase/client"

const useCommentsClient = () => {

    const findComments = async (type, id) => {
        if (type === "school") {
            console.log(id)
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('school_id', id)
            if (error) throw error
            return data
        }
        if (type == "airlines") {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('airline_id', id)
            if (error) throw error
            return data
        }
        if (type == "users") {
            const { data, error } = await supabase
                .from('comments')
                .select('*')
                .eq('user_target', id)
            if (error) throw error
            return data
        }
    }

    const findOneComment = async (school_id, user_id) => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('item_id', school_id)
            .eq('user_id', user_id)
        if (error) throw error
        return data[0]
    }

    const createOneComment = async (value) => {
        const { data, error } = await supabase
            .from('comments')
            .insert([value])
            .select()
        if (error) throw error
    }

    const destroyComment = async (value) => {
        const { error } = await supabase
            .from('comments')
            .delete()
            .eq('id', value)
        if (error) throw error
    }

    return {
        findComments,
        findOneComment,
        createOneComment,
        destroyComment
    }

}

export default useCommentsClient