import type { FC } from "react";
import { Wrapper } from "./components/Wrapper";
import { Title } from "./components/Title";
import { Body } from "./components/Body";
import { useTimer } from "react-timer-hook";
import { convertTimeValueToDate } from "~/utils/convertTimeValueToDate";
import type { TimerValue } from "~/types/timerValue";
// @ts-ignore
import useSound from "use-sound";
import timeUpSound from "../../assets/timeUpSound.mp3";
import clickSound from "../../assets/clickSound.mp3";

export const CountdownTimer: FC<{
  timerValue: TimerValue;
}> = ({ timerValue }) => {
  const [playTimeUpSound] = useSound(timeUpSound);
  const [playClickSound] = useSound(clickSound);
  const { hours, minutes, seconds, isRunning, pause, start, restart, resume } =
    useTimer({
      expiryTimestamp: convertTimeValueToDate(timerValue),
      autoStart: false,
      onExpire: () => {
        playTimeUpSound();
      },
    });

  const isExpired = !(hours > 0 || minutes > 0 || seconds > 0);
  return (
    <Wrapper isBorderRed={isExpired}>
      <Title id={timerValue.id} title:value={timerValue.name} />
      <Body
        id={timerValue.id}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
        isTextColorRed={isExpired}
        defaultValues:form={timerValue}
        disabled:pauseButton={!isRunning}
        disabled:resumeButton={isRunning}
        disabled:startButton={isRunning}
        isVisible:resumeButton={isRunning}
        isVisible:startButton={!isRunning}
        onClick:pauseButton={() => {
          playClickSound();
          pause();
        }}
        onClick:resetButton={() => {
          playClickSound();
          restart(convertTimeValueToDate(timerValue), false);
        }}
        onClick:resumeButton={() => {
          playClickSound();
          resume();
        }}
        onClick:startButton={() => {
          playClickSound();
          start();
        }}
      />
    </Wrapper>
  );
};
