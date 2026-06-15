const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("en-NP", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default formatDate;
