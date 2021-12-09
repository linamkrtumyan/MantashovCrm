export const scrollToView = (e) => {
  if (e.target.type !== "button") {
    e.target.scrollIntoView({ block: "center", behavior: "smooth" });
  }
};
