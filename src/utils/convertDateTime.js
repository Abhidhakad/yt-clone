function timeAgo(publishedAt) {
    const publishedDate = new Date(publishedAt);
    const now = new Date();
    const diffInSeconds = Math.floor((now - publishedDate) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const count = Math.floor(diffInSeconds / secondsInUnit);
        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
        }
    }
    return "just now";
}

export default timeAgo;
