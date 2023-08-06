import useBoards from "apps/Board/hooks/useBoards";
import { Board } from "apps/Board/models/board.model";


const BoardByUserComponent = () => {
  const { boardsOfUser, isLoadingCreate, isLoadingBoars } = useBoards();

  return (
    <div>
      {!isLoadingBoars ? (
        <div>
          {boardsOfUser.map((el: Board) => {
            return (
              <div>
                <li> {el.name}</li>
              </div>
            );
          })}
          {isLoadingCreate && (
            <div>
              {" "}
              <li>Cargando ....</li>
            </div>
          )}
        </div>
      ) : (
        <div>Cargando boards ...</div>
      )}
    </div>
  );
};

export default BoardByUserComponent;
