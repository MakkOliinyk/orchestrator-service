const IDENTITY_SERVICE_PATH = 'identity-service.herokuapp.com';
const FILE_SERVICE_PATH = 'file-service.herokuapp.com';
const FILE_LINK_SERVICE_PATH = 'file-link-service.herokuapp.com';
const ARCHIVE_SERVICE_PATH = 'archive-service.herokuapp.com';

const PATHS_BY_SERVICE = {
    'IDENTITY': IDENTITY_SERVICE_PATH,
    'FILE': FILE_SERVICE_PATH,
    'FILE_LINK': FILE_LINK_SERVICE_PATH,
    'PACKAGING': ARCHIVE_SERVICE_PATH
};

export const createPath = (serviceType) => (endRoute) => {
    if (!serviceType) throw new Error('Service type is required');
    if (!endRoute) throw new Error('End route is required');
    if (!PATHS_BY_SERVICE[serviceType]) throw new Error('Invalid service type');

    return PATHS_BY_SERVICE[serviceType] ? `https://${PATHS_BY_SERVICE[serviceType]}/${endRoute}` : '';
};
