import bcrypt from "bcryptjs";

const users = [
  {
    nome: "Administrador",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    nome: "Laura R",
    email: "laura@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    nome: "Rodrigo B",
    email: "rodrigo@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
