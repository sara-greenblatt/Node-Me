const mysql2 = require('mysql2');
const { promisify } = require('util');
require('dotenv').config();
const sqlUtils = require('./repository.utils');

const validateQueryList = (queriesList) => {
    const { MAX_PARALLEL_SQL_QUERIES } = process.env;
    const isValidQuery = queriesList?.length > 0 && queriesList.length <= MAX_PARALLEL_SQL_QUERIES;
    if (!isValidQuery) {
        console.error('invalid query list');
        throw new Error('Internal Server Error');
    }
    return true;
};

const commitSqlQuery = async (queriesList, dbConnection) => {
    // Promisify the relevant functions
    const queriesResults = [];
    const beginTransactionAsync = promisify(dbConnection.beginTransaction).bind(dbConnection);
    const queryAsync = promisify(dbConnection.query).bind(dbConnection);
    const commitAsync = promisify(dbConnection.commit).bind(dbConnection);
    const rollbackAsync = promisify(dbConnection.rollback).bind(dbConnection);
    const endAsync = promisify(dbConnection.end).bind(dbConnection);
    try {
        // Start a transaction
        await beginTransactionAsync();

        // Execute each query
        for (let i = 0; i < queriesList.length; i++) {
            const queryDetails = queriesList[i];
            if (!queryDetails?.query) {
                queriesResults.push({ error: new Error('Invalid query details provided') });
                console.error('Invalid query details provided');
                break;
            }

            try {
                const results = await queryAsync(queryDetails.query, queryDetails.params || []);
                queriesResults.push({ results });
            } catch (err) {
                queriesResults.push({ error: err });
            }
        }

        // Commit the transaction
        await commitAsync();
        return queriesResults;
    } catch (error) {
        // Rollback the transaction if an error occurs
        await rollbackAsync();
        console.error('Sql runner failed with error:', error.code, 'executing queries:', error.message);
        queriesResults[0] = { error };
        return queriesResults;
    } finally {
        // Close the dbConnection when done
        await endAsync();
    }
}

const getConnection = () => {
    const {
        HOST, DB_USER, DB_PASSWORD, DB_NAME, CONNECTION_TIMEOUT
    } = process.env;
    return new Promise((resolve, reject) => {
        const dbConnection = mysql2.createConnection({
            host: HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            connectTimeout: CONNECTION_TIMEOUT || 5000
        });
        dbConnection.on('error', (err) => {
            console.error('Database connection error', err.message);
            reject(err);
        });
        dbConnection.connect((err) => {
            if (err) {
                console.error('Database connection failed:', err.message);
                reject(err);
            } else {
                console.error('Database connected successfully');
                resolve(dbConnection);
            }
        });
    });

}

const run = async (queriesList) => {
    try {
        validateQueryList(queriesList);
        const connection = await getConnection();
        if (!connection) {
            throw new Error('Failed to connect to DB');
        }
        return commitSqlQuery(queriesList, connection);
    } catch (err) {
        console.error('Sql runner failed with error:', err);
        return [{ error: err }];
    }
}

module.exports = { run, utils: sqlUtils };
