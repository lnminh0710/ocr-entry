import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("this_field_is_required"),
  password: Yup.string().required("this_field_is_required")
});

export default LoginSchema;
