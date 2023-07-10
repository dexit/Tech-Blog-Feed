module.exports = {
    format_date: (date) => {
      return date.toLocaleDateString();
    },
    excerpt: (text, blodid) => {
        if (text.length > 100) {
            text = text.substring(0,100) + `... <a class="text-body-tertiary nav-item" href="/homepage/${blodid}">read more</a>`;
        }
       return text;
    }
}