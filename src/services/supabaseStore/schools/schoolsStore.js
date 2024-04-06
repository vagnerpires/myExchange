import { supabase } from "../../../models/supabase/client"

const useSchoolsClient = () => {

    // find all schools
    const findSchools = async () => {
        const { data, error } = await supabase
            .from('schools')
            .select('*')
        if (error) throw error
        return data
    }

    // find one school
    const findOneSchool = async (value) => {
        const { data, error } = await supabase
            .from('schools')
            .select('*')
            .eq('name', value)
        if (error) throw error
        return data[0]
    }

    return {
        findSchools,
        findOneSchool
    }
}

export default useSchoolsClient