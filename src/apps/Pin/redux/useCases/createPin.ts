import { CreatePinType } from "apps/Pin/models/pin.model";
import { fetchCreatePin } from "apps/Pin/services/fetchspins.service";
import { _createPin, _createPinFail } from "../pinSlice";

const createPin = async (newPin: CreatePinType, dispatch: any) => {
  dispatch(
    //@ts-ignore
    _createPin({
      isLoadingCreated: true,
    })
  );
  const { isCreated, errors } = await fetchCreatePin(newPin);
  if (isCreated) {
    dispatch(
      //@ts-ignore
      _createPin({
        isLoadingCreated: false,
      })
    );
  } else {
    console.log(errors);
    dispatch(
      //@ts-ignore
      _createPinFail({
        isLoadingCreated: false,
      })
    );
  }
};

export default createPin;
