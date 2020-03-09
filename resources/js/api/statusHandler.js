export const LOGIN_ERROR = 'LOGIN_ERROR';
export const TO_MANY_REQUESTS = 'TO_MANY_REQUESTS';
export const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
export const LOGIN_UNIQUE_ERROR = 'LOGIN_UNIQUE_ERROR';

export const STATUS_ERROR = 'STATUS_ERROR';
export const STATUS_SUCCESS = 'STATUS_SUCCESS';


export const errorResponse = (error) => ({
    status: STATUS_ERROR,
    error
});

export const successResponse = (data) => ({
    status: STATUS_SUCCESS,
    data
});

export const handle = (response, successCallback, errorCallback) => {
    if (response.status === STATUS_SUCCESS){
        successCallback(response.data);
    } else {
        switch (response.error) {
            case LOGIN_ERROR: errorCallback('Incorrect login or password'); break;
            case TO_MANY_REQUESTS: errorCallback('To many request, please try later'); break;
            case LOGIN_UNIQUE_ERROR: errorCallback('This login is already in use'); break;
            default: errorCallback('Internal server error'); break;
        }
    }
};
