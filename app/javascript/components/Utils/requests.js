export const getHeaders = function () {
  const token = document.querySelector('meta[name="csrf-token"]').content;
  return {
    "X-CSRF-Token": token,
    // Required for Devise to respond with json
    Accept: "application/json",
  };
};
