const CONFIG = {
    NETWORK: {
        WEBSOCKET: {
            RECONNECTION_ATTEMPT_MS: 1000,
        },
    },
    VIEWS: {
        TREE: {
            ITEMS_PER_PAGE: 20,
        },
    },
} as const;

export default CONFIG;
