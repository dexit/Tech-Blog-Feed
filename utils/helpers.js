module.exports = {
    format_date: (date) => {
      return date.toLocaleDateString();
    },
    excerpt: (text) => {
        if (text.length > 100) {
            text = text.substring(0,100) + "...";
        }
       return text;
    }
}