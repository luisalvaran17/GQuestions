import { BASE_DIR } from '../BaseDirURl';

export const LogoutAPI = async () => {
    const response = await fetch(
        BASE_DIR + "api/logout",
        {
          method: "POST",
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
            "Content-Type": "application/json"
          },
        }
      ).then((data => {
        if (data.ok) {
          localStorage.removeItem('email');
          localStorage.removeItem('token');
          localStorage.removeItem('uuid_generacion');
          localStorage.removeItem('id_user');
          localStorage.removeItem('name');
          localStorage.removeItem('rol');
          return true;
        }else{
            return false;
        }
      })).catch(err => {
          console.error(err);
          return false;
      })
      return response;
}
