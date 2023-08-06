import axios from "axios";

import { CreatePinType } from "apps/Pin/models/pin.model";
import { getTokensFromLocalStorage } from "apps/UserAccount/services/localstorage.service";

const BASE = "http://localhost:8000";
export const fetchCreatePin = async (newPin: CreatePinType) => {
  const source = axios.CancelToken.source();
  const { success, message, tokens } = getTokensFromLocalStorage();

  if (success) {
    try {
      const response = await axios.post(
        `${BASE}/api/pins/create/`,
        {
          ...newPin,
        },
        {
          headers: {
            Authorization: `JWT ${tokens?.accessToken}`,
          },
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
        errors: [],
      };
    } finally {
      source.cancel();
    }
  } else {
    return {
      isCreated: false,
      errors: [
        {
          noAuthJwt: "Usuario no autenticado",
        },
      ],
    };
  }
};

export const fetchAllPins = async () => {
  const source = axios.CancelToken.source();

  try {
    const response = await axios.get(`${BASE}/api/pins/all/`, {
      cancelToken: source.token,
    });
    if (response.status == 200) {
      return {
        isSuccess: true,
        pins: response.data.results,
        errors: [],
      };
    } else {
      return {
        isSuccess: false,
        pins: [],
        errors: response.data,
      };
    }
  } catch (error: any) {
    return {
      isSuccess: false,
      pins: [],
      errors: [],
    };
  } finally {
    source.cancel();
  }
};

export const fetchPinsByBoard = async (boardId: number) => {
  const source = axios.CancelToken.source();
  try {
    const response = await axios.get(`${BASE}/api/pins/board/${boardId}/`, {
      cancelToken: source.token,
    });
    if (response.status === 200) {
      return {
        pins: response.data,
        isSuccess: true,
        isEmpty: false,
        errors: [],
      };
    } else if (response.status == 204) {
      return {
        pins: [],
        isSuccess: true,
        isEmpty: true,
        errors: [],
      };
    } else {
      return {
        pins: [],
        isSuccess: false,
        isEmpty: false,
        errors: response.data,
      };
    }
  } catch (error: any) {
    return {
      pins: [],
      isSuccess: false,
      isEmpty: false,
      errors: [],
    };
  } finally {
    source.cancel();
  }
};

export const fetchPinByTitle = async (title: string) => {
  const source = axios.CancelToken.source();
  try {
    const response = await axios.get(`${BASE}/api/pin/${title}/`, {
      cancelToken: source.token,
    });
    if (response.status === 200) {
      return {
        pin: response.data,
        isSuccess: true,
        errors: [],
      };
    } else {
      return {
        pin: {},
        isSuccess: false,
        errors: response.data,
      };
    }
  } catch (error: any) {
    return {
      pin: {},
      isSuccess: false,
      errors: [],
    };
  } finally {
    source.cancel();
  }
};

export const fetchPinOfUser = async () => {
  const source = axios.CancelToken.source();
  const { success, message, tokens } = getTokensFromLocalStorage();
  if (success) {
    try {
      const response = await axios.get(`${BASE}/api/pins/me/`, {
        headers: {
          Authorization: `JWT ${tokens?.accessToken}`,
        },
        cancelToken: source.token,
      });
      if (response.status === 200) {
        return {
          pins: response.data,
          isSuccess: true,
          errors: [],
        };
      } else {
        return {
          pins: {},
          isSuccess: false,
          errors: response.data,
        };
      }
    } catch (error: any) {
      return {
        pins: {},
        isSuccess: false,
        errors: [],
      };
    } finally {
      source.cancel();
    }
  } else {
      return {
        pins: {},
        isSuccess: false,
          errors: [
            {jwt:"user no authenticado"}
        ],
      };
  }
};
