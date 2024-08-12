const dbConfig = require("./dbConfig");

const createTables = async () => {
  let userTable = `CREATE TABLE if not exists userTable(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(userid)
);`;

  let questionTable = `CREATE TABLE  if not exists questionTable(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY(id),
    FOREIGN KEY(userid) REFERENCES userTable(userid)
);`;

  let answerTable = `CREATE TABLE  if not exists answerTable(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN KEY(questionid) REFERENCES questionTable(questionid),
    FOREIGN KEY(userid) REFERENCES userTable(userid)
);`;

  const talbleList = [userTable, questionTable, answerTable];
  talbleList.map(async (query) => {
    try {
      const [result] = await dbConfig.query(query);
      console.log("result", result);
    } catch (error) {
      console.log("error on database tables ", error);
    }
  });
};
module.exports = { createTables };
