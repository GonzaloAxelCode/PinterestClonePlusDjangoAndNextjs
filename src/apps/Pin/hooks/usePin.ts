import { useDispatch, useSelector } from "react-redux";
import createPin from "apps/Pin/redux/useCases/createPin";
import { RootState } from "redux/store";
import { useEffect } from "react";
import loadAllPins from "apps/Pin/redux/useCases/loadAllPins";
import loadPinsByBoard from "apps/Pin/redux/useCases/loadPinsByBoard";
import loadPinByTitle from "apps/Pin/redux/useCases/loadPinByTitle";
import loadPins from "apps/Pin/redux/useCases/loadPins";

const usePin = () => {
  const dispatch = useDispatch();

  const pinCreate = async () => {
    await createPin(
      {
        title: "este pin lo hizo un colaborador",
        pin_about: "bnnnnnnnnnnnnnnnn ",
        description: "descripcion",
        destination_link: "link",
        board_id: 14,
      },
      dispatch
    );
  };

  useEffect(() => {
    const f = async () => {
      await loadAllPins(dispatch);
      await loadPinsByBoard(1, dispatch);
      await loadPinByTitle("new title cccxdd", dispatch);
      await loadPins(dispatch);
    };
    f();
  }, []);

  const state = useSelector((state: RootState) => state.Pin);
  return {
    pinCreate,
    pinsOfUser: state.pinsOfUser,
    allPins: state.pins
  };
};

export default usePin;
