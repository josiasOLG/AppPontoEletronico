import * as SQLite from "expo-sqlite";

const databaseName = "mydb.db";
export const db = SQLite.openDatabase(databaseName);

export const initLogErrorTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS LogErrors (
          Id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          Timestamp TEXT NOT NULL,
          ErrorType TEXT NOT NULL,
          ErrorMessage TEXT NOT NULL,
          ErrorStack TEXT
        );
      `,
        [],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const insertLogError = async (data: {
  Timestamp: string;
  ErrorType: string;
  ErrorMessage: string;
  ErrorStack?: string;
}) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `
        INSERT INTO LogErrors (Timestamp, ErrorType, ErrorMessage, ErrorStack)
        VALUES (?, ?, ?, ?);
      `,
        [data.Timestamp, data.ErrorType, data.ErrorMessage, data.ErrorStack],
        (_, result) => resolve(result),
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const fetchAllErrors = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM LogErrors;`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const logError = (
  errorType: string,
  errorMessage: string,
  errorStack?: string
) => {
  const timestamp = new Date().toISOString();
  insertLogError({
    Timestamp: timestamp,
    ErrorType: errorType,
    ErrorMessage: errorMessage,
    ErrorStack: errorStack,
  });
};
