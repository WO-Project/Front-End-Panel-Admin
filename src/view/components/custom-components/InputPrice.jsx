import React from 'react';
import { Input } from 'antd';

const InputPrice = (props) => {
  const { onChange } = props;

  function commify(n) {
    var parts = n.toString().split(".");
    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : "");
  }

  const handleChange = (e) => {
    const { value: input } = e.target;
    const inputValue = input.replace(/,/g, "")
    const inputArr = inputValue.split("")

    const reg = /^-?\d*(\.\d*)?$/;

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(commify(inputValue))
    }
    else {
      const outputArr = inputArr.slice(0, inputArr.length - 1)
      onChange(outputArr.join(""))
    }
  };

  return (
    <Input
      {...props}
      onChange={handleChange}
      maxLength={16}
      prefix="Rp"
    />
  );
};

export default InputPrice