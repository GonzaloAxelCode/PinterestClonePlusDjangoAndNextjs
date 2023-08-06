import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadBoardsByUser from "apps/Board/redux/useCases/loadBoards";
import { CreateBoardType } from "apps/Board/models/board.model";
import createBoard from "apps/Board/redux/useCases/createBoard";
import retrieveBoard from "apps/Board/redux/useCases/retrieveBoard";
import loadAllBoards from "apps/Board/redux/useCases/loadAllBoards";
import { RootState } from "redux/store";
const useBoards = () => {
  const dispatch = useDispatch();
  const [changeBoards, setChangeBoards] = useState(false);
  useEffect(() => {
    loadBoardsByUser(dispatch);
    getBoard();
    getAllBoards();
  }, []);

  const boardCreate = async (newBoard: CreateBoardType) => {
    await createBoard(newBoard, dispatch);
    await loadBoardsByUser(dispatch, { showLoading: false });
    //setChangeBoards(!changeBoards);
  };

  const getBoard = async () => {
    await retrieveBoard(
      {
        username: "gonzaloaxelh",
        name: "MY board",
      },
      dispatch
    );
  };

  const getAllBoards = async () => {
    await loadAllBoards(dispatch);
  };

  const state = useSelector((state: RootState) => state.Board);

  return {
    boardCreate,
    board: state.board,
    isLoadingBoars: state.isLoadingBoards,
    boardsOfUser: state.boardsOfuser,
    isLoadingCreate: state.isLoadingCreated,
  };
};

export default useBoards;
