export const dateFormat = (timestamp: Date): string => {
    return timestamp.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
};
