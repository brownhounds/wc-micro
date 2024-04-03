type AppConfig = {
    shadowDOM?: boolean;
    entryPoint?: () => Promise<any>;
};

export class App {
    static config: AppConfig = {
        shadowDOM: false,
    };

    public static mergeConfigs(config: AppConfig): void {
        App.config = {
            ...App.config,
            ...config,
        };
    }
}

export const initApp = (config: AppConfig): void => {
    App.mergeConfigs(config);
    void App.config.entryPoint?.();
};
