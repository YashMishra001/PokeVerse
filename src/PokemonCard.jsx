import React from "react";

const PokemonCard = ({ pokiData, onClick }) => {
  return (
    <li className="card" onClick={onClick}>
      <div className="cardTop">
        <img
          src={
            pokiData.sprites.other.dream_world.front_default ||
            pokiData.sprites.front_default
          }
          alt={pokiData.name}
        />
      </div>

      <div className="cardBody">
        <h2>{pokiData.name}</h2>

        <div className="types">
          {pokiData.types.map((t, i) => (
            <span key={i}>{t.type.name}</span>
          ))}
        </div>

        <div className="stats">
          <div>
            <p className="label">Speed</p>
            <span>{pokiData.stats[5].base_stat}</span>
          </div>

          <div>
            <p className="label">Attack</p>
            <span>{pokiData.stats[1].base_stat}</span>
          </div>

          <div>
            <p className="label">Height</p>
            <span>{pokiData.height}</span>
          </div>

          <div>
            <p className="label">Weight</p>
            <span>{pokiData.weight}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PokemonCard;
