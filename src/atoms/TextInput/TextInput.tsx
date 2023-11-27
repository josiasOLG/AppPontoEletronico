import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface FormikTextInputProps extends TextInputProps {
  field: any;
  form: any;
}

export const FormikTextInput: React.FC<FormikTextInputProps> = ({
  field,
  form,
  ...props
}) => {
  const { name } = field;
  const { touched, errors, setFieldTouched, handleChange } = form;
  
  const handleNumericChange = (text: string) => {
    const numericText = text.toUpperCase(); // Remove caracteres não numéricos
    handleChange(name)(numericText);
  };

  return (
    <TextInput
      {...props}
      value={field.value}
      onChangeText={handleNumericChange}
      onBlur={() => setFieldTouched(name)}
      placeholderTextColor="#FFF" 
      style={[
        props.style,
        touched[name] && errors[name] ? { borderColor: 'red', borderWidth: 1 } : null
      ]}
    />
  );
};
