import { Text, View } from "react-native";
import { useState } from "react";
import SelectInput from "@/src/components/molecules/selectInput";

const sixthStep = () => {
  const [value, setValue] = useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  console.log(value);

  return (
    <View>
      <Text>sixthStep</Text>
      <SelectInput
        label="teste"
        placeholder="queijo"
        options={["SP", "GO", "MG", "RJ", "RS", "SC", "PR", "BA", "CE"]}
        value={value}
        handleChange={onChangeText}
      />
    </View>
  );
};

export default sixthStep;
