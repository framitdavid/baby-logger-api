interface IDateUtils {
  addMinutes: (date: Date, minutes: number) => Date;
}
export const DateUtils: IDateUtils = {
  addMinutes: (date: Date, minutes: number) => {
    const minutesToMilliseconds = minutes * 60000;
    return new Date(date.getTime() + minutesToMilliseconds);
  },
};
