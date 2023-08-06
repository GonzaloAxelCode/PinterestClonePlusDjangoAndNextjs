import { showNoti } from "redux/notificationSlice";
import { CreateBoardType } from "apps/Board/models/board.model";
import { fetchCreateBoard } from "apps/Board/services/boardfetchs.service";

import { _createBoardFail, _createBoard } from "apps/Board/redux/boardSlice";

const createBoard = async (newBoard: CreateBoardType, dispatch: any) => {
  dispatch(
    //@ts-ignore
    _createBoard({
      isLoadingCreated: true,
    })
  );
  const { isCreated, errors } = await fetchCreateBoard(newBoard);

  if (isCreated) {
    dispatch(
      _createBoard(
        //@ts-ignore
        {
          isLoadingCreated: false,
        }
      )
    );
    dispatch(
      showNoti({ type: "Success", message: "Board creado satisfactoriamente" })
    );
  } else {
    dispatch(
      //@ts-ignore
      _createBoardFail({
        isLoadingCreated: false,
      })
    );
    dispatch(showNoti({ type: "Fail", message: "Error al crear el usuario" }));
    console.log(errors);
  }
};
export default createBoard;
