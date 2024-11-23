import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie';

export const useGetIsAdmin = () => {
    try{
        const [cookie, _ ] = useCookies("access_token")
        const token = cookie.access_token
        if (token) {
            const decodedToken = jwtDecode(token)
            return decodedToken.isAdmin        
        }
    } catch(err) {
        alert(err)
    }
};