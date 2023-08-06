import { fetchPinsByBoard } from "apps/Pin/services/fetchspins.service";
import { _loadPinsByBoard, _loadPinsByBoardFail } from "../pinSlice";

const loadPinsByBoard = async (boardId: number, dispatch: any) => {
  const { pins, isSuccess, errors } = await fetchPinsByBoard(boardId);

  if (isSuccess) {
    dispatch(
      //@ts-ignore
      _loadPinsByBoard({
        pinsByBoard: pins,
      })
    );
  } else {
    dispatch(
      //@ts-ignore
      _loadPinsByBoardFail({
        pinsByBoard: [],
      })
    );
    console.log(errors);
  }
};

export default loadPinsByBoard;
