import { createSlice } from "@reduxjs/toolkit";
import { Pin } from "../models/pin.model";
interface PinStateType {
  pin: Pin;
  pins: Pin[];
  pinsOfUser: Pin[];
  pinsByBoard: Pin[];
  stateMessage: string;
  isLoadingPins: boolean;
  isLoadingPin: boolean;
  isLoadingCreated: boolean;
}

export const PinEmptyState: PinStateType = {
  pin: {},
  pins: [],
  pinsByBoard: [],
  pinsOfUser: [],
  stateMessage: "",
  isLoadingPins: false,
  isLoadingCreated: false,
  isLoadingPin: false,
};

const pinSlice = createSlice({
  name: "pin",
  initialState: PinEmptyState,
  reducers: {
    _createPin: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),

    _createPinFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadPins: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadPinsFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadAllPins: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadAllPinsFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadPinsByBoard: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadPinsByBoardFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadPinByTitle: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadPinByTitleFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  _loadAllPinsFail,
  _loadAllPins,
  _loadPins,
  _loadPinsFail,
  _loadPinsByBoard,
  _loadPinsByBoardFail,
  _createPin,
  _createPinFail,
  _loadPinByTitle,
  _loadPinByTitleFail,
} = pinSlice.actions;

export default pinSlice.reducer;
