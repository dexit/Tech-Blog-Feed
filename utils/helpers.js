module.exports = {
    format_date: (date) => {
      return date.toLocaleDateString();
    },
    excerpt: (text) => {
        if (text.length > 20) {
            text = text.substring(0,20) + "...";
        }
       return text;
    }
}