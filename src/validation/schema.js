import * as Yup from 'yup';

//contains schema for validation of user entries
const schema = Yup.object().shape({
    mainGroup: Yup.object().shape({
      mainGroupName: Yup.string()
      .required("Group name is required")
      .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
      .min(3,"Group name atleast required 3 characters")
      .max(32, "Group name can not exceeded  32 characters"),
      
      mainGroupDescription: Yup.string()
      .required(" Description is required")
      .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
      .min(30, "Description atleast required 30 characters")
      .max(300, "Description can not exceeded 300 characters"),
      
      mainGroupImage: Yup.mixed()
      .required(" Image is required ")
    }),

    termGroup: Yup.array().of(
      Yup.object().shape({
        termGroupName: Yup.string()
        .required("Term name is required")
        .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
        .min(3, "Term name atleast required 3 characters")
        .max(32, "Term name can not exceeded 32 characters"),

        termGroupDescription: Yup.string()
        .required("Term description is required")
        .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
        .min(50,"Term description atleast required 50 characters")
        .max(600, "Term description can not exceeded 600 characters"),

        termGroupImage: Yup.mixed()
        .required(" Image is required")
      })
    ),
  });

  export default schema;