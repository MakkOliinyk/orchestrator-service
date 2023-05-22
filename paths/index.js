const IDENTITY_SERVICE_PATH = 'identity-service.herokuapp.com';
const FILE_SERVICE_PATH = 'file-service.herokuapp.com';
const FILE_LINK_SERVICE_PATH = 'us-central1-file-links.cloudfunctions.net/app';
const PACKAGING_SERVICE_PATH = 'us-central1-packaging-service.cloudfunctions.net/app';

const PATHS_BY_SERVICE = {
    'IDENTITY': IDENTITY_SERVICE_PATH,
    'FILE': FILE_SERVICE_PATH,
    'FILE_LINK': FILE_LINK_SERVICE_PATH,
    'PACKAGING': PACKAGING_SERVICE_PATH
};

export const createPath = (serviceType) => (endRoute) => {
    if (!serviceType) throw new Error('Service type is required');
    if (!endRoute) throw new Error('End route is required');
    if (!PATHS_BY_SERVICE[serviceType]) throw new Error('Invalid service type');

    return PATHS_BY_SERVICE[serviceType] ? `http://${PATHS_BY_SERVICE[serviceType]}/${endRoute}` : '';
};
