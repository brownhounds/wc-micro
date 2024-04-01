type Component = any;

export const state = (component: Component, propertyName: string): void => {
    component.statePropertyNames = [
        ...(component.statePropertyNames || []),
        propertyName,
    ];
};
