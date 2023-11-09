import type { TimerValue } from "~/types/timerValue";

export const convertTimeValueToDate = ({
    hour,
    minute,
    second,
}: TimerValue) => {
    const weight = 1000;
    const now = Date.now();
    return new Date(
        now + hour * 60 * 60 * weight + minute * 60 * weight + second * weight,
    );
}