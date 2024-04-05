import { RenderTarget, type RenderTargetType } from '../types';

type Component = any;

export const state =
    (renderTrigger?: string) =>
    (component: Component, propertyName: string): void => {
        if (!component.stateProperties) {
            component.stateProperties = new Map<
                string,
                string | RenderTargetType
            >();
        }

        if (!component.stateProperties.has(propertyName))
            component.stateProperties.set(
                propertyName,
                renderTrigger || RenderTarget.LOCAL_STATE
            );
    };
