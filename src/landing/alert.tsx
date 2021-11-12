import Swal, { SweetAlertIcon } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);
function fire(title: string, msg: string, icon: SweetAlertIcon) {
    return MySwal.fire({
        title: title,
        text: msg,
        icon: icon,
        confirmButtonColor: '#38B2AC',
    });
}
export function fireError(title: string, msg: string) {
    return fire(title, msg, 'error');
}
export function fireSuccess(title: string, msg: string) {
    return fire(title, msg, 'success');
}
