import * as SQLite from "expo-sqlite";

const databaseName = "mydb.db";
export const db = SQLite.openDatabase(databaseName);

export const initDatabase = async () => {
  // Inicialize as tabelas do banco de dados, se necessário
  await initEscalasMotoristasTable();
};

export const initEscalasMotoristasTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
        CREATE TABLE IF NOT EXISTS EscalasMotoristas (
          Id TEXT PRIMARY KEY NOT NULL,
          Data TEXT NOT NULL,
          HoraInicio TEXT NOT NULL,
          HoraFim TEXT NOT NULL,
          EhFolga INTEGER NOT NULL,
          DiaFinalizado INTEGER NOT NULL,
          MotoristaId TEXT NOT NULL,
          EmployeePerimetroId TEXT NOT NULL,
          Descricao TEXT,
          DateCreated TEXT NOT NULL,
          DateUpdated TEXT,
          DateDeleted TEXT
        );
      `,
        [],
        (_, result: any) => resolve(result),
        (_, error: any) => reject(error)
      );
    });
  });
};

export const insertIntoEscalasMotoristas = async (data: {
  Id: string;
  Data: string;
  HoraInicio: string;
  HoraFim: string;
  EhFolga: number;
  DiaFinalizado: number;
  MotoristaId: string;
  EmployeePerimetroId: string;
  Descricao?: string;
  DateCreated: string;
  DateUpdated?: string;
  DateDeleted?: string;
}) => {
  // Verifique se o valor de 'Id' é válido
  if (!data.Id || typeof data.Id !== "string") {
    // Se não for válido, você pode lidar com o erro ou registrar uma mensagem de erro aqui
    console.error("Erro: Valor inválido para 'Id'");
    return;
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
              INSERT INTO EscalasMotoristas (Id, Data, HoraInicio, HoraFim, EhFolga, DiaFinalizado, MotoristaId, EmployeePerimetroId, Descricao, DateCreated, DateUpdated, DateDeleted)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `,
        [
          data.Id,
          data.Data,
          data.HoraInicio,
          data.HoraFim,
          data.EhFolga,
          data.DiaFinalizado,
          data.MotoristaId,
          data.EmployeePerimetroId,
          data.Descricao,
          data.DateCreated,
          data.DateUpdated,
          data.DateDeleted,
        ],
        (_, result: any) => resolve(result),
        (_, error: any) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const fetchAllEscalasMotoristas = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM EscalasMotoristas;`,
        [],
        (_, result: any) => resolve(result.rows._array),
        (_, error: any) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const fetchEscalasMotoristasById = async (id: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM EscalasMotoristas WHERE Id = ?;`,
        [id],
        (_, result: any) => resolve(result.rows._array[0] || null),
        (_, error: any) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

export const updateEscalasMotoristas = async (data: {
  Id: string;
  Data: string;
  HoraInicio: string;
  HoraFim: string;
  EhFolga: number;
  DiaFinalizado: number;
  MotoristaId: string;
  EmployeePerimetroId: string;
  Descricao?: string;
  DateCreated: string;
  DateUpdated?: string;
  DateDeleted?: string;
}) => {
  // Verifique se o valor de 'Id' é válido
  if (!data.Id || typeof data.Id !== "string") {
    console.error("Erro: Valor inválido para 'Id'");
    return;
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
          UPDATE EscalasMotoristas 
          SET Data = ?, HoraInicio = ?, HoraFim = ?, EhFolga = ?, DiaFinalizado = ?, MotoristaId = ?, EmployeePerimetroId = ?, Descricao = ?, DateCreated = ?, DateUpdated = ?, DateDeleted = ?
          WHERE Id = ?;
        `,
        [
          data.Data,
          data.HoraInicio,
          data.HoraFim,
          data.EhFolga,
          data.DiaFinalizado,
          data.MotoristaId,
          data.EmployeePerimetroId,
          data.Descricao,
          data.DateCreated,
          data.DateUpdated,
          data.DateDeleted,
          data.Id,
        ],
        (_, result: any) => resolve(result),
        (_, error: any) => {
          reject(error);
          return true;
        }
      );
    });
  });
};


export const existsInEscalasMotoristas = async (id: string): Promise<boolean> => {
  // Verifique se o valor de 'id' é válido
  if (!id || typeof id !== "string") {
    console.error("Erro: Valor inválido para 'Id'");
    return false;
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
          SELECT Id FROM EscalasMotoristas WHERE Id = ? LIMIT 1;
        `,
        [id],
        (_, result: any) => {
          if (result.rows.length > 0) {
            resolve(true);  // Retorna 'true' se o registro com o 'Id' fornecido existir
          } else {
            resolve(false); // Retorna 'false' caso contrário
          }
        },
        (_, error: any) => {
          reject(error);
          return true;
        }
      );
    });
  });
};

