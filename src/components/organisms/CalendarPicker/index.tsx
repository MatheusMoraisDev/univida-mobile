import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";

import { ptBR } from "@/src/utils/localeCalendarConfig";
import { Container, CalendarContainer, DayText, DayButton } from "./styles";
import { theme } from "@/src/styles";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

export function CalendarPicker({
  day,
  setDay,
}: {
  day: DateData | null;
  setDay: (date: DateData) => void;
}) {
  const renderArrow = (direction: "right" | "left") => (
    <Feather
      size={24}
      color={theme.colors.black}
      name={`chevron-${direction}`}
    />
  );

  const dayComponent = ({
    date,
    state,
  }: {
    date: DateData;
    state: "selected" | "disabled" | "today" | "inactive";
  }) => {
    const isSelected = date.dateString === day?.dateString;
    const isDisabled = state === "disabled" || state === "inactive";
    const isToday = state === "today";

    return (
      <DayButton
        isSelected={isSelected}
        onPress={() => !isDisabled && setDay(date)}
      >
        <DayText
          isSelected={isSelected}
          isToday={isToday}
          isDisabled={isDisabled}
        >
          {date.day}
        </DayText>
      </DayButton>
    );
  };

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          renderArrow={renderArrow}
          headerStyle={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.white,
            paddingBottom: 10,
            marginBottom: 10,
          }}
          theme={{
            textMonthFontSize: 18,
            monthTextColor: theme.colors.black,
            todayTextColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.white,
            arrowColor: theme.colors.white,
            calendarBackground: "transparent",
            textDayStyle: { color: theme.colors.white },
            textDisabledColor: theme.colors.primary,
          }}
          minDate={new Date().toISOString().split("T")[0]}
          hideExtraDays
          onDayPress={setDay}
          markedDates={day && { [day.dateString]: { selected: true } }}
          dayComponent={dayComponent}
        />
      </CalendarContainer>
    </Container>
  );
}
