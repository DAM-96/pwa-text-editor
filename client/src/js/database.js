import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const callDb = await openDB("jate", 1);
  const readData = callDb.transaction("jate", "readwrite");
  const saveData = readData.objectStore("jate");
  const finalRequest = saveData.put({ id: 1, text: content });
  const result = await finalRequest;
  console.log("Text data has been succesfully saved on the Database: ", JSON.stringify(result));
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const callDb = await openDB("jate", 1);
  const readData = callDb.transaction("jate", "readonly");
  const saveData = readData.objectStore("jate");
  const finalRequest = saveData.getAll();
  const result = await finalRequest;

  // Check if there's content on the DB
  if (result.length > 0) {
    console.log("Database data obtained successfully: ", JSON.stringify(result));
    return result[0].content;
  } else {
    console.log("No database content as of now");
    return null;
  }
};

initdb();
