import { supabase } from "../../../models/supabase/client"

const useFavoritesClient = () => {

    // find all favorites
    const findFavorites = async () => {
        const { data, error } = await supabase
            .from('favorites')
            .select('*')
        if (error) throw error
        return data
    }

    // find favorites by user
    const findByUser = async (user_id) => {
        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', user_id)
        if (error) throw error
        return data
    }

    // find one favorite
    const findOneFavorite = async (school_id, user_id) => {
        const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('item_id', school_id)
            .eq('user_id', user_id)
        if (error) throw error
        return data[0]
    }

    // create one favorite
    const createOneFavorite = async (value) => {
        const { data, error } = await supabase
            .from('favorites')
            .insert([
                {
                    name: value.name,
                    item_id: value.item_id,
                    user_id: value.user_id
                },
            ])
            .select()
        if (error) throw error
    }

    // destroy one favorite
    const destroyFavorite = async (value) => {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('id', value)
        if (error) throw error
    }

    return {
        findFavorites,
        findOneFavorite,
        createOneFavorite,
        destroyFavorite,
        findByUser
    }

}

export default useFavoritesClient