import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formValues, setFormValues] = useState(initialForm);

  const reset = (newFormState = initialForm) => setFormValues(newFormState);

  const setField = (field, value) =>
    setFormValues({ ...formValues, [field]: value });

  return [formValues, setField, reset];
};
