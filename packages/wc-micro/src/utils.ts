export const useRef = <RefValue>(
    value: RefValue | undefined = undefined
): { current?: RefValue } => {
    return {
        current: value,
    };
};
