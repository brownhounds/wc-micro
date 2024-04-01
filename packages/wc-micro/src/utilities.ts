export const ref = <Value>(
    value: Value | undefined = undefined
): { current?: Value } => {
    return {
        current: value,
    };
};
