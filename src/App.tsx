// In questo esercizio, utilizzerai async/await con typescript per creare la funzione getChefBirthday(id). Questa funzione accetta un id di una ricetta e deve:
// Recuperare la ricetta da https://dummyjson.com/recipes/{id}
// Estrarre la proprietà userId dalla ricetta
// Usare userId per ottenere le informazioni dello chef da https://dummyjson.com/users/{userId}
// Restituire la data di nascita dello chef
// Note del docente
// Scrivi la funzione getChefBirthday(id), che deve:
// Essere asincrona (async).
// Utilizzare await per chiamare le API.
// Restituire una Promise con la data di nascita dello chef.
// Gestire gli errori con try/catch
// const dayjs = require(`dayjs`);
// import dayjs from 'dayjs';
import dayjs from "dayjs";
async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Errore fetch dell'url: ${url}`);
  const obj = await response.json();
  return obj;
}

const getChefBirthday = async (id: number): Promise<string> => {
  try {
    const recipe = await fetchJson(`https://dummyjson.com/recipes/${id}`);
    if (!recipe) {
      throw new Error(`Ricetta con id ${id} non trovata`);
    }
    const userId = recipe.userId;
    const user = await fetchJson(`https://dummyjson.com/users/${userId}`);
    return user.birthDate;
  } catch (error) {
    console.error(
      "Errore nel recupero della data di nascita dello chef:",
      error
    );
    throw error;
  }
};

(async () => {
  try {
    const birthday = await getChefBirthday(1);
    let d = new Date(birthday);
    let bDay = dayjs(d).format("DD/MM/YYYY");
    console.log(`Data di nascita dello chef: ${bDay}`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Operazione completata");
  }
})();

function App() {
  return (
    <>
      <h1>compleanno dello chef</h1>
    </>
  );
}

export default App;
