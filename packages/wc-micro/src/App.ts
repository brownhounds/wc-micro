type AppConfig = {
    shadowDOM?: boolean;
};

export class App {
    static config: AppConfig = {
        shadowDOM: false,
    };

    public static async mergeConfigs(config: AppConfig): Promise<void> {
        App.config = {
            ...App.config,
            ...config,
        };
    }
}

export const initApp = async (config: AppConfig): Promise<void> => {
    return App.mergeConfigs(config);
};
