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
          Id TEXT PRIMARY KEY,
          Descricao TEXT,
          BateuPonto INTEGER,
          DataEntradaProgramada TEXT,
          HoraInicioProgramada TEXT,
          DataSaidaProgramada TEXT,
          HoraFimProgramada TEXT,
          EmployeeId TEXT,
          LocalEntradaProgramadoId TEXT,
          LocalEntradaProgramado TEXT
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
  Descricao: string;
  BateuPonto: boolean;
  DataEntradaProgramada: string;
  HoraInicioProgramada: string;
  DataSaidaProgramada: string;
  HoraFimProgramada: string;
  EmployeeId: string;
  LocalEntradaProgramadoId: string;
  LocalEntradaProgramado: string;
}) => {
  if (!data.Id || typeof data.Id !== "string") {
    console.error("Erro: Valor inválido para 'Id'");
    return;
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
        INSERT INTO EscalasMotoristas (Id, Descricao, BateuPonto, DataEntradaProgramada, HoraInicioProgramada,DataSaidaProgramada,HoraFimProgramada, EmployeeId, LocalEntradaProgramadoId, LocalEntradaProgramado)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `,
        [
          data.Id,
          data.Descricao,
          data.BateuPonto ? 1 : 0,
          data.DataEntradaProgramada,
          data.HoraInicioProgramada,
          data.DataSaidaProgramada,
          data.HoraFimProgramada,
          data.EmployeeId,
          data.LocalEntradaProgramadoId,
          data.LocalEntradaProgramado,
        ],
        (_, result: any) => resolve(result),
        (_, error: any) => reject(error)
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
        (_, error: any) => reject(error)
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
        (_, error: any) => reject(error)
      );
    });
  });
};


export const fetchEscalasMotoristasByNome = async (descricao: string) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT * FROM EscalasMotoristas WHERE Descricao = ?;`,
        [descricao],
        (_, result: any) => {
          // console.log("Resultado SQL:", result.rows._array);  // Log de depuração
          resolve(result.rows._array || []);
        },
        (_, error: any) => {
          // console.error("Erro SQL:", error);  // Log de depuração
          reject(error);
        }
      );
    });
  });
};



export const updateEscalasMotoristas = async (data: {
  Id: string;
  Descricao: string;
  BateuPonto: boolean;
  DataEntradaProgramada: string;
  HoraInicioProgramada: string;
  DataSaidaProgramada: string;
  HoraFimProgramada: string;
  EmployeeId: string;
  LocalEntradaProgramadoId: string;
  LocalEntradaProgramado: string;
}) => {
  if (!data.Id || typeof data.Id !== "string") {
    console.error("Erro: Valor inválido para 'Id'");
    return;
  }

  return new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        `
          UPDATE EscalasMotoristas 
          SET Descricao = ?, BateuPonto = ?, DataEntradaProgramada = ?, HoraInicioProgramada = ?, DataSaidaProgramada = ?, HoraFimProgramada = ?, EmployeeId = ?, LocalEntradaProgramadoId = ?, LocalEntradaProgramado = ?
          WHERE Id = ?;
        `,
        [
          data.Descricao,
          data.BateuPonto ? 1 : 0,
          data.DataEntradaProgramada,
          data.HoraInicioProgramada,
          data.DataSaidaProgramada,
          data.HoraFimProgramada,
          data.EmployeeId,
          data.LocalEntradaProgramadoId,
          data.LocalEntradaProgramado,
          data.Id
        ],
        (_, result: any) => resolve(result),
        (_, error: any) => reject(error)
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
          SELECT Id FROM EscalasMotoristas WHERE Id = ?;
        `,
        [id],
        (_, result: any) => {
          if (result.rows.length > 0) {
            resolve(true);
          } else {
            resolve(false);
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

