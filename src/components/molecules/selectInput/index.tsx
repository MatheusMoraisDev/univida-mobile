import React, { useState, useCallback } from "react";
import { Keyboard, FlatList, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import { theme } from "@/src/styles";
import CustomText from "../../atoms/text";
import ListItemContainer from "./styles";

interface ISelectInputProps {
  label: string;
  placeholder: string;
  value: string | undefined;
  handleChange: (text: string) => void;
  options: string[];
  mt?: number;
}

const SelectInput = ({
  label,
  placeholder,
  value,
  handleChange,
  options,
  mt = 20,
}: ISelectInputProps) => {
  const [show, setShow] = useState(false);

  const openPicker = useCallback(() => {
    Keyboard.dismiss();
    setShow(true);
  }, []);

  const hidePicker = useCallback(
    (item: string) => {
      setShow(false);
      handleChange(item);
    },
    [handleChange],
  );

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity onPress={openPicker} style={{ width: "100%" }}>
        <TextInput
          label={label}
          value={value}
          placeholder={placeholder}
          outlineColor={show ? theme.colors.primary : undefined}
          mode="outlined"
          outlineStyle={{
            borderWidth: show ? 2 : 1,
            borderStyle: "solid",
          }}
          style={[
            {
              marginTop: theme.metrics.px(mt),
              width: theme.metrics.px(280),
            },
          ]}
          right={<TextInput.Icon icon="chevron-down" onPress={openPicker} />}
          editable={false}
        />
      </TouchableOpacity>
      {show ? (
        <FlatList
          style={{
            backgroundColor: theme.colors.white,
            elevation: 1,
            zIndex: 22,
            width: theme.metrics.px(280),
            height: 200,
            marginTop: 60,
            position: "absolute",
            top: 20,
          }}
          data={options}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => hidePicker(item)}>
              <ListItemContainer>
                <CustomText size={15}>{item}</CustomText>
              </ListItemContainer>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      ) : null}
    </View>
  );
};

export default SelectInput;
