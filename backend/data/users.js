import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456789"),
    isAdmin: true,
  },
  {
    name: "Alex",
    email: "alex@example.com",
    password: bcrypt.hashSync("123456789"),
  },
  {
    name: "Lamar",
    email: "lamar@example.com",
    password: bcrypt.hashSync("123456789"),
  },
];

export default users;
