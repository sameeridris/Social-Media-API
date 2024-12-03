export const dateFormat = (timestamp) => {
    return timestamp.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
};
