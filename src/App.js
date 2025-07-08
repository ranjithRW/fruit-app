import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [currentJuiceIndex, setCurrentJuiceIndex] = useState(0);
  const [deg, setDeg] = useState(-45);
  const [fadeIn, setFadeIn] = useState(false);
  const mainRef = useRef(null);

  const juiceData = [
    {
      name: "Orange Juice",
      description:
        "Orange juice is a liquid extract of the orange tree fruit, produced by squeezing or reaming oranges. It comes in several different varieties, including blood orange, navel oranges, valencia orange, clementine, and tangerine.",
      backgroundColor:
        "linear-gradient(90deg, rgba(167,162,244,1) 0%, rgba(112,112,143,1) 35%, rgba(166,149,13,1) 100%, rgba(0,212,255,1) 100%)",
      juiceImage: "/juice1.png",
      fruitImage: "/bgorange.png",
    },
    {
      name: "Plum Juice",
      description:
        "A luscious elixir extracted from ripe plums. Bursting with rich flavor and natural sweetness, it delivers a refreshing and satisfying experience. Indulge in the succulent essence of plums while enjoying the numerous health benefits it offers.",
      backgroundColor:
        "linear-gradient(90deg, rgba(2,19,45,1) 4%, rgba(120,109,181,1) 49%, rgba(230,132,132,1) 100%, rgba(0,212,255,1) 100%)",
      juiceImage: "/juice2.png",
      fruitImage: "/bgplumb.png",
    },
    {
      name: "Kiwi Juice",
      description:
        "A vibrant and tangy elixir extracted from ripe kiwis. Packed with essential nutrients, it offers a refreshing and invigorating experience. The perfect balance of sweetness and tanginess makes it a popular choice for a healthy and flavorful beverage.",
      backgroundColor:
        "linear-gradient(90deg, rgba(9,111,55,1) 0%, rgba(39,196,129,1) 49%, rgba(47,209,232,1) 100%, rgba(0,212,255,1) 100%)",
      juiceImage: "/juice3.png",
      fruitImage: "/bgkiwi.png",
    },
    {
      name: "Strawberry Juice",
      description:
        "Strawberry Juice is a refreshing fresh fruit juice that is full of vitamin C and antioxidants and lot of invigorating flavor. Apart from fresh and ripe strawberries, this recipe also uses lime juice to make it tantalizing.",
      backgroundColor:
        "linear-gradient(90deg, rgba(101,18,18,1) 0%, rgba(186,44,44,1) 49%, rgba(235,134,80,1) 100%, rgba(0,212,255,1) 100%)",
      juiceImage: "/juice4.png",
      fruitImage: "/bgstrawberry.png",
    },
  ];

  const handleJuiceClick = (index) => {
    if (mainRef.current) {
      mainRef.current.style.background = juiceData[index].backgroundColor;
    }

    const newDeg = deg - 90;
    setDeg(newDeg);
    setCurrentJuiceIndex(index);

    // Trigger fade-in animation
    setFadeIn(true);
    setTimeout(() => {
      setFadeIn(false);
    }, 1000);
  };

  return (
    <main ref={mainRef} style={{ background: juiceData[currentJuiceIndex].backgroundColor }}>
      <nav>
        <img src="/logo.png" alt="logo" className="logo" />
        <div className="menu-text">
          <p>Home</p>
          <p>Flavor</p>
          <p>About</p>
        </div>
        <button>Shop online</button>
      </nav>

      <div className="content">
        <div className={`juice-text ${fadeIn ? 'fade-in' : ''}`}>
          <h1>{juiceData[currentJuiceIndex].name}</h1>
          <p className="juice-info">
            {juiceData[currentJuiceIndex].description}
          </p>
        </div>

        <div className="photos">
          {juiceData.map((juice, index) => (
            <div
              key={index}
              className={`juice-wrapper ${index === currentJuiceIndex ? 'activePhoto' : ''}`}
              onClick={() => handleJuiceClick(index)}
            >
              <img src={juice.juiceImage} alt={`juice${index + 1}`} className="static-juice" />
            </div>
          ))}
        </div>
      </div>

      <div className="juice-wheel" style={{ transform: `rotate(${deg}deg)` }}>
        <img src="/juice1.png" alt="juice1" className="dynamic-juice-1" />
        <img src="/juice2.png" alt="juice2" className="dynamic-juice-2" />
        <img src="/juice3.png" alt="juice3" className="dynamic-juice-3" />
        <img src="/juice4.png" alt="juice4" className="dynamic-juice-4" />
      </div>

      <div className="fruits-wheel" style={{ transform: `rotate(${deg}deg)` }}>
        <img src="/bgorange.png" alt="orange" className="dynamic-fruits-1" />
        <img src="/bgplumb.png" alt="plumb" className="dynamic-fruits-2" />
        <img src="/bgkiwi.png" alt="kiwi" className="dynamic-fruits-3" />
        <img src="/bgstrawberry.png" alt="strawberry" className="dynamic-fruits-4" />
      </div>
    </main>
  );
};

export default App;