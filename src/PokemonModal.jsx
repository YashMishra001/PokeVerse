import React from "react";

const PokemonModal = ({ data, onClose }) => {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>✕</button>

        <div className="modalTop">
          <img
            src={
              data.sprites.other.dream_world.front_default ||
              data.sprites.front_default
            }
            alt={data.name}
          />

          <h2>{data.name}</h2>

          <div className="types">
            {data.types.map((t, i) => (
              <span key={i}>{t.type.name}</span>
            ))}
          </div>
        </div>

        <div className="modalInfo">
          <div className="infoBox">
            <p>Height</p>
            <span>{data.height}</span>
          </div>

          <div className="infoBox">
            <p>Weight</p>
            <span>{data.weight}</span>
          </div>

          <div className="infoBox">
            <p>Experience</p>
            <span>{data.base_experience}</span>
          </div>

          <div className="infoBox full">
            <p>Abilities</p>
            <span>
              {data.abilities.map(a => a.ability.name).join(", ")}
            </span>
          </div>
        </div>

        <div className="statsSection">
          {data.stats.map((s, i) => (
            <div key={i} className="statRow">
              <div className="statHeader">
                <span>{s.stat.name}</span>
                <span>{s.base_stat}</span>
              </div>

              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${(s.base_stat / 150) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
