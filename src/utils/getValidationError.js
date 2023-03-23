export const getValidationError = errorCode => {
  const codeMatcher = {
    ERR_NETWORK: 'Se rompió la red',
    ERR_INTERNET_DISCONNECTED: 'Sin internet',
    ERR_TIMEOUT: 'Se acabó el tiempo',
    ERR_CANCEL: 'Se canceló la petición',
    ERR_UNKNOWN: 'Error desconocido',
    ERR_400: 'Error 400',
    ERR_401: 'Error 401',
    ERR_403: 'Error 403',
    'auth/user-not-found': 'Usuario no registrado',
    'auth/internal-error': 'error interno',
    'auth/wrong-password': 'Contraseña Incorrecta',
    'auth/too-many-requests': 'Demasiados intentos fallidos para esta cuenta, intentelo mas tarde',
    'auth/network-request-failed': 'No nos pudimos conectar al servidor, revisa tu conexion a internet por favor',
  };

  return codeMatcher[errorCode];
};
