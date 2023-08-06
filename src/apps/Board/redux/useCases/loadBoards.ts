

import { fetchBoardByUser } from "apps/Board/services/boardfetchs.service";
import { _loadBoardsByUser, _loadBoardsByUserFail } from "../boardSlice";

type options = {
  showLoading: boolean;
};

const loadBoardsByUser = async (
  dispatch: any,
  { showLoading }: options = { showLoading: true }
) => {
  dispatch(
    //@ts-ignore
    _loadBoardsByUser({
      stateMessage: "Cargando boards",
      isLoadingBoards: showLoading,
    })
  );
  const { isSuccess, boards, isEmpty, errors } = await fetchBoardByUser();

  if (isSuccess) {
    dispatch(
      //@ts-ignore
      _loadBoardsByUser({
        boardsOfuser: boards,
        countBoards: boards.length,
        stateMessage: "Boards del usuario Cargado correctamente",
        isLoadingBoards: false,
      })
    );
  } else {
    dispatch(
      //@ts-ignore
      _loadBoardsByUserFail({
        boardsOfuser: [],
        countBoards: 0,
        stateMessage: "Error.Mira la consola",
        isLoadingBoards: false,
      })
    );
  }
};

export default loadBoardsByUser;
