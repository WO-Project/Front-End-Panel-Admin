import React from 'react';
import { Input } from 'antd';

const NumericInput = (props) => {
  const { onChange } = props;

  const handleChange = (e) => {
    const inputValue = e.target.value

    if (isNaN(inputValue) == false && inputValue != "") {
      onChange(inputValue);
    }
    else {
      onChange(inputValue.slice(0, inputValue.length - 1));
    }

  }

  return (
    <Input
      {...props}
      onChange={handleChange}
      maxLength={16}
    />
  );
};

export default NumericInput