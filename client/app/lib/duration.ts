export const getDuration = (duration: number): string => {
  return duration > 60
    ? `${duration / 60} hour${duration / 60 > 1 ? "s" : ""}, ${
        duration - (duration / 60) * 60
      } minute${duration - (duration / 60) * 60 > 1 ? "s" : ""}`
    : `${duration} minute${duration > 1 ? "s" : ""}`;
};
