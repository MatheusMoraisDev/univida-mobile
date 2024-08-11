import React, { useState } from "react";
import { Checkbox as PaperCheckbox } from "react-native-paper";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange(newValue);
  };

  return (
    <PaperCheckbox.Item
      label={label}
      status={isChecked ? "checked" : "unchecked"}
      onPress={handleToggle}
    />
  );
};

export default Checkbox;
