import { getTokensFromLocalStorage } from "apps/UserAccount/services/localstorage.service";
import { CreateBoardType } from "apps/Board/models/board.model";
import axios, { CancelToken, CancelTokenSource } from "axios";



const BASE = "http://localhost:8000";

interface BoardByUserResponse {
  isSuccess: boolean;
  boards: any[];
  isEmpty: boolean;
  errors: any[];
}
export const fetchBoardByUser = async (): Promise<BoardByUserResponse> => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const { success, message, tokens } = getTokensFromLocalStorage();

  if (success) {
    try {
      const response = await axios.get(
        `${BASE}/api/boards/me/`,

        {
          headers: {
            Authorization: `JWT ${tokens?.accessToken}`,
          },
          cancelToken: source.token,
        }
      );
      if (response.status === 200) {
        return {
          isSuccess: true,
          boards: response.data.boards,
          isEmpty: false,
          errors: [],
        };
      } else if (response.status == 404) {
        return {
          isSuccess: false,
          boards: [],
          isEmpty: true,
          errors: [],
        };
      } 
    } catch (error: any) {
      const errorObject = error.response?.data || error;
      return {
        isSuccess: false,
        boards: [],
        isEmpty: false,
        errors: errorObject,
      };
    }
  } else {
    console.log(message);
    return {
      isSuccess: false,
      boards: [],
      isEmpty: false,
      errors: [],
    };
  }
  return {
    isSuccess: false,
    boards: [],
    isEmpty: false,
    errors: [],
  };
};

export const fetchCreateBoard = async (newBoard: CreateBoardType) => {
  const source: CancelTokenSource = axios.CancelToken.source();
  const { success, message, tokens } = getTokensFromLocalStorage();

  if (success) {
    try {
      const response = await axios.post(
        `${BASE}/api/boards/create/`,
        {
          ...newBoard,
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
        errors: error.response.data,
      };
    } finally {
      source.cancel();
    }
  } else {
    return {
      isCreated: false,
      errors: [
        {
          noAuthJwt: "Usuario no athenticado",
        },
      ],
    };
  }
};

export const fetchRetrieveBoard = async (name: string, username: string) => {
  const source: CancelTokenSource = axios.CancelToken.source();
  try {
    const response = await axios.get(
      `${BASE}/api/boards/${username}/retrieve/${name.trim()}/`,
      {
        cancelToken: source.token,
      }
    );
    if (response.status == 200) {
      return {
        board: response.data,
        isSuccess: true,
        isEmpty: false,
        errors: [],
      };
    } else {
      return {
        board: {},
        isSuccess: false,
        isEmpty: true,
        errors: response.data,
      };
    }
  } catch (error: any) {
    return {
      board: {},
      isSuccess: false,
      isEmpty: false,
      errors: [],
    };
  } finally {
    source.cancel();
  }
};


export const fetchAllBoards = async () => {
  const source: CancelTokenSource = axios.CancelToken.source();
  try {
    const response = await axios.get(`${BASE}/api/boards/`, {
      cancelToken: source.token,
    });
    if (response.status == 200) {
      return {
        boards: response.data, 
        isSuccess: true,
        isEmpty: false,
        errors: [],
      };
    } else {
      return {
        boards: [],
        isSuccess: false,
        isEmpty: true,
        errors: response.data,
      };
    }
  } catch (error: any) {
    return {
      boards: [],
      isSuccess: false,
      isEmpty: false,
      errors: [],
    };
  } finally {
    source.cancel();
  }
};
