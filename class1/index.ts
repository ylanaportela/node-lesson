import express from "express";

const app = express();

type User = {
  id: number;
  name: string;
  email: string;
  limit: number;
  password?: string;
};

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@example.com",
    limit: 1000,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    limit: 1500,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    limit: 2000,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob.brown@example.com",
    limit: 2500,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 5,
    name: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    limit: 3000,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 6,
    name: "Diana Evans",
    email: "diana.evans@example.com",
    limit: 3500,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 7,
    name: "Francisco Oliveira",
    email: "francisco.oliveira@example.com",
    limit: 4000,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 8,
    name: "Grace Harris",
    email: "grace.harris@example.com",
    limit: 4500,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 9,
    name: "Henrique Costa",
    email: "henrique.costa@example.com",
    limit: 5000,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
  {
    id: 10,
    name: "Ivy Martinez",
    email: "ivy.martinez@example.com",
    limit: 5500,
    password: "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Zf4a2B5Pz1u1Z1Z1Z1Z1Z",
  },
];

const urls = [
  { id: "a1B2c3", destination: "https://news.com/article/1", userId: 2 },
  { id: "d4E5f6", destination: "https://shop.net/product/2", userId: 3 },
  { id: "g7H8i9", destination: "https://blog.co/post/3", userId: 5 },
  { id: "j0K1l2", destination: "https://forum.info/thread/4", userId: 6 },
  { id: "m3N4o5", destination: "https://store.biz/item/5", userId: 8 },
  { id: "p6Q7r8", destination: "https://media.tv/video/6", userId: 9 },
  { id: "s9T0u1", destination: "https://service.io/help/7", userId: 10 },
  { id: "v2W3x4", destination: "https://portal.ai/dashboard/8", userId: 2 },
  { id: "y5Z6a7", destination: "https://app.dev/profile/9", userId: 3 },
  { id: "b8C9d0", destination: "https://docs.app/guide/10", userId: 5 },
];

const PORT = 3000;

const getAllUsers = () => {
  app.get("/users", (_, res) => {
    res.send(users);
  });
};

const getUserFromId = (req: string) => {
  const findUser: User | undefined = users.find(
    (item) => Number(item.id) === Number(req)
  );
  return findUser;
}

const getUser = () => {
  app.get("/users/:id", (req, res) => {
    const user = getUserFromId(req.params.id)

    if (user) {
      delete user.password;
      res.send(user);
    }
    res.status(404).send("User not found");
  });
};

const getUrlFromUser = () => {
  app.get("/users/:userId/urls", (req, res) => {
    const user = getUserFromId(req.params.userId)

    if(user){
      const urlFromUser = urls.filter(item => Number(item.userId) === Number(req.params.userId))
      if(urlFromUser.length) res.send(urlFromUser);
      res.status(404).send("No URLs are associated with this user");
    }
    res.status(404).send("User not found");
  })
};

const redirectUrl = () => {
  app.get("/urls/:urlId", (req, res) => {
    const findUrl = urls.find(
      (item) => item.id === req.params.urlId);

    if(findUrl) res.redirect(findUrl.destination)

    res.status(404).send("Something went wrong");
  });
};

app.listen(PORT, () => {
  console.log("server ready");
});

getAllUsers();
getUser();
getUrlFromUser();
redirectUrl();  
