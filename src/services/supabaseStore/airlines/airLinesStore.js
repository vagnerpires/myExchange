import { supabase } from "../../../models/supabase/client"

const useAirlinesClient = () => {

    // find all airlines
    const findAirLines = async () => {
        const { data, error } = await supabase
            .from('airlines')
            .select('*')
        if (error) throw error
        return data
    }

    // find one airline
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