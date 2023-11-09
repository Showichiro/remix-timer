import { Form, useSubmit } from "@remix-run/react";
import clsx from "clsx";
import type { ComponentProps, FC } from "react";
import { Button, Card } from "react-daisyui";

export const Title: FC<{
  id: number;
  "title:value": ComponentProps<"input">["value"];
}> = ({ id, "title:value": title_value }) => {
  const submit = useSubmit();
  return (
    <Card.Title className="flex pl-2 pt-2">
      <Form
        method="post"
        className="h-14 basis-full text-2xl dark:bg-gray-700 dark:text-gray-200 md:text-3xl lg:text-4xl"
      >
        <input type="hidden" name="action" value="edit-title" />
        <input type="hidden" name="id" value={id} />
        <input
          // eslint-disable-next-line tailwindcss/no-custom-classname, tailwindcss/classnames-order
          className={clsx(
            "timer-title",
            "truncate ...",
            "h-14 basis-full w-full"
          )}
          type="text"
          name="name"
          onBlur={(e) => {
            if (e.currentTarget.value !== title_value) {
              submit(e.currentTarget.form);
            }
          }}
          defaultValue={title_value}
          onFocus={(e) => e.target.select()}
          aria-label="timer name"
        />
      </Form>
      <Card.Actions className="flex-none pr-2">
        <Form method="post">
          <input type="hidden" name="id" value={id} />
          <Button
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="timer-delete"
            aria-label="delete timer"
            shape="circle"
            size="sm"
            type="submit"
            name="action"
            value="delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </Form>
      </Card.Actions>
    </Card.Title>
  );
};
