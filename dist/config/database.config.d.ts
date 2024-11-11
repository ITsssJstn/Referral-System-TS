export declare const databaseConfig: {
    url: string;
    options: {
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    };
};
export declare const connectDatabase: () => Promise<void>;
