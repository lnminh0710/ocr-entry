import React from "react";
import { Button, FormControlLabel, Checkbox } from "components/ui-libraries";

interface IAddPersonActionProps {
    styles: any;
    openTreeView: Function;
    setIsNext: Function;
    isEmpty: boolean;
    isNext: boolean;
    isTreeView: boolean;
}

const AddPersonActionComponent: React.FC<IAddPersonActionProps> = ({
    setIsNext,
    openTreeView,
    styles,
    isEmpty,
    isNext,
    isTreeView
}) => {
    return (
        <>
            {/* <FormControlLabel
        control={
          <Checkbox
            checked={isNext}
            disabled={isEmpty}
            onChange={() => setIsNext(!isNext)}
          />
        }
        label="Get next"
      />

      <Button
        variant="contained"
        color="primary"
        disabled={isEmpty}
        className={styles["add-person-action__button-save"]}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color={isTreeView ? "default" : "secondary"}
        disabled={isEmpty}
        className={styles["add-person-action__button-tree"]}
        onClick={() => openTreeView(!isTreeView)}
      >
        Tree view
      </Button> */}
        </>
    );
};

export default AddPersonActionComponent;
