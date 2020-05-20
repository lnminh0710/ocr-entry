import * as Yup from "yup";

const RoleSchema = Yup.object().shape({
  name: Yup.string().required("this_field_is_required"),
  url: Yup.string().required("this_field_is_required")
});

export default RoleSchema;
