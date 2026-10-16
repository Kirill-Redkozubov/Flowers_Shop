import { useEffect, useState} from "react";
import type { Bouquet } from "./types.ts";
import Header from "./components/Header.tsx";
import Hero from "./components/Hero.tsx";


function App() {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);

  useEffect(() => {
    async function loadBouquets() {
      const response = await fetch("http://127.0.0.1:8001/api/bouquets");
      const data = await response.json();
      setBouquets(data);
    }
    loadBouquets();
  }, []);


  return (
    <div>
      <Header/>
        <Hero/>
      <h1>Популярные букеты</h1>
      <ul>
        {bouquets.map((bouquet) => (
            <li key={bouquet.id}>
              {bouquet.name}: {bouquet.price.toLocaleString("ru-RU")} ₽
            </li>
        ))}
      </ul>
    </div>
  )
}

export default App
