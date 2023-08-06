import { fetchPinOfUser } from "apps/Pin/services/fetchspins.service";
import { _loadPins, _loadPinsFail } from "../pinSlice";

const loadPins = async (dispatch: any) => {
  const { isSuccess, pins, errors } = await fetchPinOfUser();

  if (isSuccess) {
    dispatch(
      //@ts-ignore
      _loadPins({
        pinsOfUser: pins,
      })
    );
  } else {
    dispatch(
      //@ts-ignore
      _loadPinsFail({
        pinsOfUser: [],
      })
    );
    console.log(errors);
  }
};

export default loadPins;
