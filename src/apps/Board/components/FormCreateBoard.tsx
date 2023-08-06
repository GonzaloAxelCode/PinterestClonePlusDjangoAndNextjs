import React from "react";
import useBoards from "apps/Board/hooks/useBoards";

const FormCreateBoard = () => {
  const { boardCreate, isLoadingCreate, boardsOfUser } = useBoards();

  return (
    <div>
      FormCreateBoard
      <button
        onClick={() =>
          boardCreate({
            name: "nnnnnnn",
            description: "nnnnnnnnnnnnnnnn",
            category: "jnnnnnnnnnnnnnnnn#",
          })
        }
      >
        Create Board
      </button>
    </div>
  );
};

export default FormCreateBoard;
