import React, { useEffect, useState, useRef } from "react";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";
import "./Pokemon.css";

const Pokemon = () => {
  const [poki, setPoki] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);

  const fetchedPages = useRef(new Set());

  const LIMIT = 20;

  const handleFetch = async () => {
    if (loading) return;

    if (fetchedPages.current.has(page)) return;
    fetchedPages.current.add(page);

    setLoading(true);

    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${page * LIMIT}`
    );
    const data = await res.json();

    const detailedPokemonData = data.results.map(async (cur) => {
      const res = await fetch(cur.url);
      return res.json();
    });

    const detailedData = await Promise.all(detailedPokemonData);

    setPoki((prev) => {
      const existingIds = new Set(prev.map(p => p.id));
      const newData = detailedData.filter(p => !existingIds.has(p.id));
      return [...prev, ...newData];
    });

    setLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, [page]);

  const searchData = poki.filter((cur) =>
    cur.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="title">PokeVerse</h1>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="grid">
        {searchData.map((cur) => (
          <PokemonCard
            key={cur.id}
            pokiData={cur}
            onClick={() => setSelected(cur)}
          />
        ))}
      </ul>

      <div className="loadMoreWrapper">
        <button
          className="loadMoreBtn"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>

      {selected && (
        <PokemonModal data={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default Pokemon;