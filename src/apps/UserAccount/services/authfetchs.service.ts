import axios, { AxiosError, CancelToken, CancelTokenSource } from "axios";

import { CreateUser } from "apps/UserAccount/models/user.model";
import { getTokensFromLocalStorage } from "./localstorage.service";

export const BASE = "http://localhost:8000";

export async function fetchGoogleLogin(
  id_token: string,
  cancelToken: CancelToken
) {
  try {
    const response = await axios.post(
      `${BASE}/auth/google/logincreate/`,
      {
        id_token: id_token,
      },
      {
        cancelToken,
      }
    );
    return response;
  } catch (error: any) {
    const errorObject = error.response?.data || error;
    throw new Error(`Error fetching Google login: ${errorObject}`);
  }
}

export const fetchAccessToken = async (accessToken: string) => {
  const source: CancelTokenSource = axios.CancelToken.source();
  console.log({ accessToken });

  const body = JSON.stringify({
    token: accessToken,
  });

  try {
    const response = await axios.post(
      `${BASE}/auth/jwt/verify/`,
      {
        token: accessToken,
      },
      {
        cancelToken: source.token,
      }
    );

    return response.status === 200;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 400) {
      return false;
    } else {
      return false;
    }
  } finally {
    source.cancel();
  }
};

export const fetchUser = async () => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const { success, message, tokens } = getTokensFromLocalStorage();
  if (success) {
    try {
      const response = await axios.get(`${BASE}/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${tokens?.accessToken}`,
        },
        cancelToken: source.token,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return false;
      } else {
        throw error;
      }
    } finally {
      source.cancel();
    }
  } else {
    console.log(message);
    return false;
  }
};

export const fetchUserLogout = async () => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const { success, message, tokens } = getTokensFromLocalStorage();
  if (success) {
    try {
      const response = await axios.post(`${BASE}/auth/token/logout/`, {
        headers: {
          Authorization: `JWT ${tokens?.accessToken}`,
        },
        cancelToken: source.token,
      });
      return response.status;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return false;
      } else {
        throw error;
      }
    } finally {
      source.cancel();
    }
  } else {
    console.log(message);
    return false;
  }
};

export const fetchCreateUser = async (user: CreateUser) => {
  const source: CancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${BASE}/auth/users/`,
      {
        ...user,
      },
      {
        cancelToken: source.token,
      }
    );
    if (response.status == 201) {
      return {
        isCreated: true,
        errors: [],
      };
    } else {
      return {
        isCreated: false,
        errors: response.data,
      };
    }
  } catch (error: any) {
    return {
      isCreated: false,
      errors: error.response.data,
    };
  } finally {
    source.cancel();
  }
};

export const fetchActivateUser = async (uid: string, token: string) => {
  const source: CancelTokenSource = axios.CancelToken.source();
  try {
    const response = await axios.post(
      `${BASE}/auth/users/activation/`,
      {
        uid,
        token,
      },
      {
        cancelToken: source.token,
      }
    );
    if (response.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    const axiosError: any = error as AxiosError;
    if (axiosError.response?.status === 400) {
      console.log(error.response.data);
      //throw new Error(axiosError.response.data);
      return false;
    } else if (axiosError.response?.status === 403) {
      console.log(error.response.data);
      //throw new Error(axiosError.response.data.detail);
      return false;
    } else {
      return false;
      //throw error;
    }
  } finally {
    source.cancel();
  }
};
