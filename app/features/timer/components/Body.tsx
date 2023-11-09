import { useState, type ComponentProps, type FC } from "react";
import { Wrapper } from "./body/Wrapper";
import { Count } from "./body/Count";
import { CountdownActions } from "./body/CountdownActions";
import { Edit } from "./body/Edit";

export const Body: FC<
  Pick<ComponentProps<typeof Edit>, "id"> & {
    "defaultValues:form": ComponentProps<typeof Edit>["defaultValues"];
  } & Omit<ComponentProps<typeof Count>, "onClick"> &
    ComponentProps<typeof CountdownActions>
> = ({
  id,
  "defaultValues:form": defaultValues,
  hours,
  minutes,
  seconds,
  isTextColorRed,
  ...countdownActionsProps
}) => {
  const countProps = { hours, minutes, seconds, isTextColorRed };
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Wrapper>
      {isEditing && (
        <Edit
          id={id}
          defaultValues={defaultValues}
          onClick:cancel={() => setIsEditing(false)}
          onSubmit={() => setIsEditing(false)}
        />
      )}
      {!isEditing && (
        <>
          <Count {...countProps} onClick={() => setIsEditing(true)} />
          <CountdownActions {...countdownActionsProps} />
        </>
      )}
    </Wrapper>
  );
};
