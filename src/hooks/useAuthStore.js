import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { ClearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ ...data }));
        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(ClearErrorMessage());
            }, 10);
        }
    }

    // TODO: Comienzo de registro.
    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ ...data }));
        } catch (error) {
            console.log(error);
            const { errors, msg } = error.response.data;
            if (msg !== undefined) {
                dispatch(onLogout(msg));
                setTimeout(() => {
                    dispatch(ClearErrorMessage());
                }, 10);
            } else {
                const { errors } = error.response.data;
                let errorMsg = '';
                Object.keys(errors).forEach(element => {
                    errorMsg += errorMsg === '' ? errors[element].msg : '<br>' + errors[element].msg;
                });
                dispatch(onLogout(errorMsg));
                setTimeout(() => {
                    dispatch(ClearErrorMessage());
                }, 10);
            }
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch( onLogout() );
        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ ...data }));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCalendar() );
        dispatch( onLogout() );
    }

    return {
        // * Propiedades
        status, user, errorMessage,

        // * Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }


}