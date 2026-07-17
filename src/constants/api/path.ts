const PATH = {
    TOKEN: '/token',
    ACCOUNT: {
        ME: '/account/me',
    },
    CRUD: {
        CREATE: '/crud/create',
        READ: '/crud/read',
        SEARCH_READ: '/crud/search_read',
        UPDATE: '/crud/update',
        DELETE: '/crud/delete',
    },
    METADATA: {
        FIELDS: '/metadata/fields',
    },
    FRONTEND: {
        TREE: '/frontend/tree',
        FORM: '/frontend/form',
    },
    SERVER: {
        ACTION: '/server/action',
    },
} as const;

export default PATH;
