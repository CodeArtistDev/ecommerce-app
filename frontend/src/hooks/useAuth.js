import { useDispatch, useSelector } from "react-redux";
import { clearToken, setToken as saveToken} from "../store/slices/authSlice";



export const useAuth = () => {

    

    const dispatch = useDispatch();

    const setToken = (token) => {
        dispatch(saveToken(token));
    }

    const resetToken = () => {
        dispatch(clearToken());
    }

    const token = useSelector((state) => state.auth.token);

    return {
        token,
        setToken,
        resetToken
    }

}