import { supabase } from "../../../models/supabase/client"

const useAirlinesClient = () => {

    const findAirLines = async () => {
        const { data, error } = await supabase
            .from('airlines')
            .select('*')
        if (error) throw error
        return data
    }

    const findOneAirline = async (value) => {
        const { data, error } = await supabase
            .from('airlines')
            .select('*')
            .eq('name', value)
        if (error) throw error
        return data[0]
    }


    return {
        findAirLines,
        findOneAirline
    }

}

export default useAirlinesClient