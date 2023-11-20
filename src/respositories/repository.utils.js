const SQL_CODES = {
    NO_ERROR: 0
};

const checkValidInsert = () => {
    // Validate insert query parameters
    if (!params || params.length < 1) {
        throw new Error('Params are required for insert query');
    }

    // Check if all params are defined
    const undefinedParams = params.filter(param => param === undefined);
    if (undefinedParams.length > 0) {
        throw new Error(`Following params are undefined: ${undefinedParams.join(',')}`);
    }

    return true;
};

const checkInsertOutput = (results) => {
    return results.warningStatus === SQL_CODES.NO_ERROR && results.affectedRows > 0;
};

module.exports = { checkInsertOutput };