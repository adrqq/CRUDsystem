import express, { Express, Request, Response } from "express";
import { User } from "./types";
import cors from "cors";
import path from "path";
import phones from "../data/phones.json";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";
import { ClientRequest } from "http";

const PORT = 5210;
const client = new MongoClient(
  "mongodb+srv://Adrian:Mongocrud2022@crud.j0ehphe.mongodb.net/?retryWrites=true&w=majority"
);

// add users to db

// const addUsers = async () => {
//   try {
//     await client.connect();

//     const users = client.db().collection('users');

//     for (let i = 1; i <= 60; i++) {
//       await users.insertOne({
//         name: names[i],
//         surname: surnames[i],
//         email: `forever${Math.floor(Math.random() * 100000)}@gmail.com`,
//         phone: `+38099${Math.floor(Math.random() * 10000000)}`,
//         id: i,
//         date: Date.now(),
//         eventsCount: 0,
//       });
//     }

//     console.log('Sucsessfully added users');
//   } catch(err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// };

// addUsers();

// delete all users

// const deleteUsers = async () => {
//   try {
//     const users = client.db().collection('users');
//     await users.deleteMany({});
//     console.log('Deleted users correctly');
//   } catch (err) {
//     console.log(err);
//   }
// };

// deleteUsers();

// create events collection and add events to db with fields: name, description, date, id

// const addEvents1method = async () => {
//   try {
//     await client.connect();
//     const events = client.db().collection('events');
//     let id = 0;

//     for (let i = 1; i <= 60; i++) {
//       for(let j = 1; j <= 40; j++) {
//         id++;

//         await events.insertOne({
//           id: id,
//           name: `Event ${j}`,
//           description: `Description ${j}`,
//           date: Date.now(),
//           userId: i,
//         });
//       }
//     }
//     console.log('Sucsessfully added events');

//   } catch(err) {
//     console.log(err);
//   } finally {
//     await client.close();
//   }
// };

// addEvents1method();

// delete all events
// const deleteEvents = async () => {
//   try {
//     const events = client.db().collection('events');
//     await events.deleteMany({});
//     console.log('Deleted events correctly');
//   } catch (err) {
//     console.log(err);
//   }
// };

// deleteEvents();

function connectToMongo() {
  client
    .connect()
    .then(() => {
      console.log("Connected correctly to server");
    })
    .catch((err) => {
      console.log(err);
    });
}

connectToMongo();

const app: Express = express();

app.use(cors());

app.use("/", (req, res, next) => {
  next();
  app.use(express.json());

  app.get("/users", (req: Request, res: Response) => {
    const { _limit, _sort, _page } = req.query;

    console.log(_limit, _sort);
    const getUsers = async () => {
      try {
        await client.connect();
        const users = client.db().collection("users");
        let cursor;

        switch (_sort) {
          case "NameUp":
            cursor = users
              .find()
              .sort({ name: -1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "NameDown":
            cursor = users
              .find()
              .sort({ name: 1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "SurnameUp":
            cursor = users
              .find()
              .sort({ surname: -1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "SurnameDown":
            cursor = users
              .find()
              .sort({ surname: 1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "DateAddedUp":
            cursor = users
              .find()
              .sort({ date: -1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "DateAddedDown":
            cursor = users
              .find()
              .sort({ date: 1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;

          case "IDup":
            cursor = users
              .find()
              .sort({ id: 1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;

          case "IDdown":
            cursor = users
              .find()
              .sort({ id: -1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          default:
            cursor = users
              .find()
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
        }

        const results = await cursor.toArray();
        const totalCount = await users.countDocuments();

        // for (let i = 0; i < results.length; i++) {
        //   const events = client.db().collection('events');
        //   const evData = events.find({ userId: Number(results[i].id) });
        //   const count = await evData.toArray();

        //   let times = count.map(eve => eve.date)
        //   console.log(times);

        //   times = times.filter(el => el - Date.now() >= 0)

        //   results[i] = {
        //     ...results[i],
        //     eventsCount: count.length,
        //     timeToNextEvent: Math.min(...times) || 0,
        //   };
        // }

        res.send([results, totalCount]);
      } catch (err) {
        res.status(500).send("error505");
        console.log(err);
      }
    };

    getUsers();
  });

  app.get("/events", (req: Request, res: Response) => {
    const { userId, _limit, _sort, _page } = req.query;

    const getEvents = async () => {
      try {
        const events = client.db().collection("events");
        // const eventsData = await events.find({ userId: Number(userId) }).skip((Number(_page) - 1) * Number(_limit)).limit(Number(_limit)).toArray();

        let cursor;

        switch (_sort) {
          case "NameUp":
            cursor = events
              .find({ userId: Number(userId) })
              .sort({ name: -1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "NameDown":
            cursor = events
              .find({ userId: Number(userId) })
              .sort({ name: 1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "DateAddedUp":
            cursor = events
              .find({ userId: Number(userId) })
              .sort({ date: 1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          case "DateAddedDown":
            cursor = events
              .find({ userId: Number(userId) })
              .sort({ date: -1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;

          case "IDup":
            cursor = events
              .find({ userId: Number(userId) })
              .sort({ id: 1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;

          case "IDdown":
            cursor = events
              .find({ userId: Number(userId) })
              .sort({ id: -1 })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
            break;
          default:
            cursor = events
              .find({ userId: Number(userId) })
              .skip((Number(_page) - 1) * Number(_limit))
              .limit(Number(_limit));
        }

        const results = await cursor.toArray();
        const totalCount = await events.countDocuments({
          userId: Number(userId),
        });

        res.send([results, totalCount]);

        // await client.close();
      } catch (err) {
        console.log(err);
      }
    };

    getEvents();
  });

  app.post("/events", (req: Request, res: Response) => {
    const { id, name, description, date, startTime, endTime, userId } =
      req.body;

    const addEvents = async () => {
      try {
        // client.connect().then(() => {
        //   console.log('Connected correctly to server');
        // }).catch(err => {
        //   console.log(err);
        // });

        const events = client.db().collection("events");
        await events.insertOne({
          id,
          name,
          description,
          date,
          startTime,
          endTime,
          userId,
        });

        console.log(id, name, description, userId);

        res.send("Event added");

        // await client.close();
      } catch (err) {
        console.log(err);
      }
    };

    addEvents();
  });

  app.post("/users", (req: Request, res: Response) => {
    const { name, surname, email, phone, takenTimes } = req.body;

    const addUsers = async () => {
      try {
        // client.connect().then(() => {
        //   console.log('Connected correctly to server');
        // }).catch(err => {
        //   console.log(err);
        // });

        const users = client.db().collection("users");
        const usersCount = await users.countDocuments();
        await users.insertOne({
          name,
          surname,
          email,
          phone,
          date: Date.now(),
          id: usersCount + 1,
          takenTimes: takenTimes,
        });

        res.send("User added");

        // await client.close();
      } catch (err) {
        console.log(err);
      }
    };

    addUsers();
  });

  app.post("/users/delete", (req: Request, res: Response) => {
    const { _userId } = req.query;

    const users = client.db().collection("users");

    console.log(_userId);

    users.deleteOne({ id: Number(_userId) });

    res.send("User deleted");
  });

  app.post("/events/delete", (req: Request, res: Response) => {
    const { _eventId } = req.query;

    const events = client.db().collection("events");

    console.log("eventid", _eventId);

    events.deleteOne({ id: Number(_eventId) });

    res.send("Event deleted");
  });

  app.patch("/users/next-event", (req: Request, res: Response) => {
    const { _limit, _page } = req.query;

    const upadataUsers = async () => {
      try {
        const users = client.db().collection("users");
        const events = client.db().collection("events");

        const usersLimit = await users
          .find()
          .skip((Number(_page) - 1) * Number(_limit))
          .limit(Number(_limit))
          .toArray();

        for (let i = 0; i < usersLimit.length; i++) {
          const userEvents = await events
            .find({ userId: usersLimit[i].id })
            .toArray();
          console.log(userEvents);

          userEvents.sort((a, b) => {
            return a.date - b.date;
          });

          for (let j = 0; j < userEvents.length; j++) {
            if (userEvents[j].date > Date.now()) {
              await users.updateOne(
                { id: usersLimit[i].id },
                { $set: { nextEvent: userEvents[j].date } }
              );
              break;
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    upadataUsers();

    res.send("Next event added to users");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
