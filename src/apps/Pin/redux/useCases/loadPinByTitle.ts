import { fetchPinByTitle } from "apps/Pin/services/fetchspins.service";
import { _loadPinByTitle, _loadPinByTitleFail } from "../pinSlice";

const loadPinByTitle = async (title: string, dispatch: any) => {
  const { pin, errors, isSuccess } = await fetchPinByTitle(title);
  if (isSuccess) {
    dispatch(
      //@ts-ignore
      _loadPinByTitle({
        pin: pin,
      })
    );
  } else {
    dispatch(
      //@ts-ignore
      _loadPinByTitleFail({
        pin: {},
      })
    );
    console.log(errors);
  }
};

export default loadPinByTitle;
