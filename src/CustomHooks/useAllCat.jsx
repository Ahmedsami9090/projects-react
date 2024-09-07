import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useAllCat() {
    function getAllCat() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const result = useQuery({
        queryKey: ['allCategories'],
        queryFn: getAllCat
    })
    return result
}
