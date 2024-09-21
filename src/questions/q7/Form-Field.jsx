import React from "react";
import { TextField, Checkbox, Radio } from "./components/form-elements";

const componentMapping = {
  TEXT_FIELD: TextField,
  CHECKBOX: Checkbox,
  RADIO_BUTTON: Radio,
};

const FormField = ({ field, onChange }) => {
  const Component = componentMapping[field.component];
  if (Component) {
    return (
      <div>
        <Component
          {...field}
          onChange={(value) => onChange(field.name, value)}
        />
        {field?.error && <span className="error">{field.error}</span>}
      </div>
    );
  }
};

export default FormField;
