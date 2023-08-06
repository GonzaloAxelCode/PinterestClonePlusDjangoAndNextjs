
import { fetchAllBoards } from "apps/Board/services/boardfetchs.service";
import { _loadAllBoards, _loadAllBoardsFail } from "apps/Board/redux/boardSlice";

const loadAllBoards = async (dispatch: any, numberResults: number = 0) => {
  dispatch(
    //@ts-ignore
    _loadAllBoards({
      isLoadingBoards: true,
    })
  );
  const { isSuccess, boards, errors } = await fetchAllBoards();

  if (isSuccess) {
    dispatch(
      //@ts-ignore
      _loadAllBoards({
        isLoadingBoards: false,
        boards,
      })
    );
  } else {
    dispatch(
      //@ts-ignore
      _loadAllBoardsFail({
        isLoadingBoards: false,
      })
    );
    console.log(errors);
  }
};

export default loadAllBoards;
