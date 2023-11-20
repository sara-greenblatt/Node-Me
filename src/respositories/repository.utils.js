const SQL_CODES = {
    NO_ERROR: 0
};

const checkInsertOutput = (results) => {
    return results.warningStatus === SQL_CODES.NO_ERROR && results.affectedRows > 0;
};

module.exports = { checkInsertOutput };
