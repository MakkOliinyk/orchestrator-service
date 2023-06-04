const axios = require("axios");
const createPath = require("../paths");

const getFullPath = createPath('IDENTITY');

module.exports = async (req, res, next) => {
    const { headers } = req;

    try {
        const response = await makeRequest(
            getFullPath('/me'),
            {
                method: 'get',
                headers: {
                    Authorization: headers.authorization,
                }
            });
        const data = await response.json();

        req.user = data.user;
        next();
    } catch (error) {
        res.send(error);
    }
};
