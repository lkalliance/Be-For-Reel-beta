module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }
};
