import { useEffect, useRef, useState } from "react";
import { FieldModel } from "../add-person-capture/add-person-capture.hook";

function useFieldHook(isSelected: boolean, field: FieldModel) {
  const ref: any = useRef(null);

  const [fieldValue, setFieldValue] = useState<string>(field.value || "");

  useEffect(() => {
    if (field.value !== fieldValue) setFieldValue(field.value || "");
    if (isSelected) ref.current.focus();
    // eslint-disable-next-line
  }, [field.value, isSelected]);

  return { ref, fieldValue, setFieldValue };
}

export default useFieldHook;
