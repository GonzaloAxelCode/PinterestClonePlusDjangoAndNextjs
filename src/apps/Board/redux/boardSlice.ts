import { createSlice } from "@reduxjs/toolkit";
import {
  Board,
  BoardCollaborator,
  BoardCollaboratorPermission,
} from "../models/board.model";

interface BoardStateType {
  board: Board;
  boards: Board[];
  boardsOfuser: Board[];
  countBoards: number;
  stateMessage: string;
  isLoadingBoards: boolean;
  isLoadingBoard: boolean;
  isLoadingCreated: boolean;
}

export const BoardEmptyState: BoardStateType = {
  board: {},
  boards: [],
  boardsOfuser: [],
  countBoards: 0,
  stateMessage: "",
  isLoadingBoards: false,
  isLoadingCreated: false,
  isLoadingBoard:false
};

const boardSlice = createSlice({
  name: "board",
  initialState: BoardEmptyState,
  reducers: {
    _loadBoardsByUser: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadBoardsByUserFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _createBoard: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _createBoardFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _retrieveBoard: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _retrieveBoardFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadAllBoards: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadAllBoardsFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  _loadBoardsByUser,
  _loadBoardsByUserFail,
  _createBoard,
  _createBoardFail,
  _retrieveBoard,
  _retrieveBoardFail,
  _loadAllBoards,
  _loadAllBoardsFail,
} = boardSlice.actions;

export default boardSlice.reducer;
