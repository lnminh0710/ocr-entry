import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  username: Yup.string().required("this_field_is_required"),
  password: Yup.string().required("this_field_is_required"),
  email: Yup.string().email(),
  fullName: Yup.string()
});

const AdminSchema = Yup.object()
  .shape({
    secretKey: Yup.string().required("this_field_is_required")
  })
  .concat(UserSchema);

export { UserSchema, AdminSchema };
 