export const toDateTime = (secs: number) => {
    let time = new Date('1970-01-01T00:30:00Z');
    time.setSeconds(secs);

    return time;
};
