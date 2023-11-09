import { Form } from "@remix-run/react";
import type { FC } from "react";
import { Button, Card, Select } from "react-daisyui";

type Props = {
  id: number;
  defaultValues: { hour: number; minute: number; second: number };
  "onClick:cancel": () => void;
  onSubmit: () => void;
};

export const Edit: FC<Props> = ({
  id,
  defaultValues,
  "onClick:cancel": onClick_cancel,
  onSubmit,
}) => {
  return (
    <Form method="post" onSubmit={onSubmit}>
      <div className="my-12 grid grid-cols-3 gap-2">
        <input type="hidden" name="id" value={id} />
        <label htmlFor={`${id}-hours`}>
          <Select
            size="lg"
            id={`${id}-hours`}
            name="hour"
            defaultValue={defaultValues.hour}
          >
            {[...Array(100)].map((_, i) => (
              <option key={`hours-${i}`} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <span className="ml-2">h</span>
        </label>
        <label htmlFor={`${id}-minutes`}>
          <Select
            size="lg"
            id={`${id}-minutes`}
            name="minute"
            defaultValue={defaultValues.minute}
          >
            {[...Array(60)].map((_, i) => (
              <option key={`minutes-${i}`} value={i}>
                {i}
              </option>
            ))}
          </Select>

          <span className="ml-2">m</span>
        </label>
        <label htmlFor={`${id}-seconds`}>
          <Select
            size="lg"
            id={`${id}-seconds`}
            name="second"
            defaultValue={defaultValues.second}
          >
            {[...Array(60)].map((_, i) => (
              <option key={`minutes-${i}`} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <span className="ml-2">s</span>
        </label>
      </div>
      <Card.Actions className="grid grid-cols-2 gap-6 pt-0.5 xl:gap-x-2">
        <Button size="lg" color="warning" onClick={onClick_cancel}>
          キャンセル
        </Button>
        <Button
          type="submit"
          size="lg"
          color="primary"
          name="action"
          value="edit-time"
        >
          確定
        </Button>
      </Card.Actions>
    </Form>
  );
};
