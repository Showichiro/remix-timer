import type { FC } from "react";
import { Button, Card } from "react-daisyui";

export const CountdownActions: FC<{
  "isVisible:resumeButton": boolean;
  "onClick:resumeButton": () => void;
  "disabled:resumeButton": boolean;
  "isVisible:startButton": boolean;
  "onClick:startButton": () => void;
  "disabled:startButton": boolean;
  "onClick:pauseButton": () => void;
  "disabled:pauseButton": boolean;
  "onClick:resetButton": () => void;
}> = ({
  "isVisible:resumeButton": isVisible_resumeButton,
  "onClick:resumeButton": onClick_resumeButton,
  "disabled:resumeButton": disabled_resumeButton,
  "isVisible:startButton": isVisible_startButton,
  "onClick:startButton": onClick_startButton,
  "disabled:startButton": disabled_startButton,
  "onClick:pauseButton": onClick_pauseButton,
  "disabled:pauseButton": disabled_pauseButton,
  "onClick:resetButton": onClick_resetButton,
}) => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <Card.Actions className="timer-action grid grid-cols-3 gap-6 pt-0.5 xl:grid-cols-3 xl:gap-x-2">
      {isVisible_resumeButton && (
        <Button
          onClick={onClick_resumeButton}
          disabled={disabled_resumeButton}
          size="md"
          color="primary"
        >
          再開
        </Button>
      )}
      {isVisible_startButton && (
        <Button
          onClick={onClick_startButton}
          disabled={disabled_startButton}
          size="md"
          color="primary"
        >
          スタート
        </Button>
      )}
      <Button
        onClick={onClick_pauseButton}
        disabled={disabled_pauseButton}
        size="md"
        color="secondary"
      >
        停止
      </Button>
      <Button onClick={onClick_resetButton} size="md" color="accent">
        リセット
      </Button>
    </Card.Actions>
  );
};
