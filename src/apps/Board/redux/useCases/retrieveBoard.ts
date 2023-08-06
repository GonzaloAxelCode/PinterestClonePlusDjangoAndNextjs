
import { fetchRetrieveBoard } from "apps/Board/services/boardfetchs.service";
import { _retrieveBoard, _retrieveBoardFail } from "../boardSlice";

const retrieveBoard = async (
  { name, username }: { name: string; username: string },
  dispatch: any
) => {
  dispatch(
    //@ts-ignore
    _retrieveBoard({
      isLoadingBoard: true,
    })
  );
  const { board, isSuccess, errors } = await fetchRetrieveBoard(name, username);
  if (isSuccess) {
    dispatch(
      //@ts-ignore
      _retrieveBoard({
        board,
        isLoadingBoard: false,
      })
    );
  } else {
    console.log(errors);
    dispatch(
      //@ts-ignore
      _retrieveBoardFail({
        isLoadingBoard: false,
      })
    );
  }
};

export default retrieveBoard;
