import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function useBrands() {
    function getAllBrands(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    }
    const result = useQuery({
        queryKey: ['allBrands'],
        queryFn: getAllBrands
    })
  return result
}
