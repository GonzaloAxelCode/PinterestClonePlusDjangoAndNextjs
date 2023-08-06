import { createSlice } from "@reduxjs/toolkit";
import { UserAccount, UserAuth } from "apps/UserAccount/models/user.model";

export const UserAuthEmptyState: UserAuth = {
  isLoadingCreate:false,
  accessToken: "",
  refreshToken: "",
  userAccount: null,
  isLoadingUser: false,
  isLoadingActivate: false,
  isVerify: false,
  isAuthenticated: false,
  stateMessage: "",
};

export const userAuthSlice = createSlice({
  name: "user",
  initialState: UserAuthEmptyState,
  reducers: {
    _loadUser: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loadUserFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),

    _loginWithGoogleUser: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _loginWithGoogleUserFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),

    _verifyTokenUser: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _verifyTokenUserFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),

    _createUser: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _createuserfail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _activateUser: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
    _activateUserFail: (state: any, action: any) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  _verifyTokenUser,
  _verifyTokenUserFail,
  _loginWithGoogleUser,
  _loadUser,
  _loadUserFail,
  _loginWithGoogleUserFail,
  _createuserfail,
  _createUser,
  _activateUser,
  _activateUserFail,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
