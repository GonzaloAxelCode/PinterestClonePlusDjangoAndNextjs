import { fetchAllPins } from "apps/Pin/services/fetchspins.service";
import { _loadAllPins, _loadAllPinsFail } from "../pinSlice";

const loadAllPins = async (dispatch: any) => {
  const { isSuccess, pins, errors } = await fetchAllPins();

  if (isSuccess) {
    dispatch(
      //@ts-ignore
      _loadAllPins({
        pins: pins,
      })
    );
  } else {
    dispatch(
      //@ts-ignore
      _loadAllPinsFail({
        pins: [],
      })
    );
    console.log(errors);
  }
};


export default loadAllPins;