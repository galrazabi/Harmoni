import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie';

export const useGetUserId = () => {

    try{
        const [cookie, _ ] = useCookies("access_token")
        const token = cookie.access_token
        if (token) {
            const decodedToken = jwtDecode(token)
            return decodedToken.id
        }
    } catch(err) {
        alert(err)
    }
}