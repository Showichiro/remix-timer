import { Form } from "@remix-run/react";
import type { FC } from "react";
import { Button } from "react-daisyui";

const AddButton: FC = () => (
  <Form method="post">
    <Button
      shape="circle"
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="timer-add bottom-5 right-5 inline-block p-3 font-medium leading-tight"
      style={{ position: "fixed" }}
      aria-label="add timer"
      type="submit"
      name="action"
      value="add"
    >
      +
    </Button>
  </Form>
);
export default AddButton;
