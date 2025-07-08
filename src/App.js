import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentJuiceIndex, setCurrentJuiceIndex] = useState(0);
  const [deg, setDeg] = useState(-45);
  const [fadeIn, setFadeIn] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const mainRef = useRef(null);

  const juiceData = [
    {
      name: "Orange Juice",
      description:
        "Orange juice is a liquid extract of the orange tree fruit, produced by squeezing or reaming oranges. It comes in several different varieties, including blood orange, navel oranges, valencia orange, clementine, and tangerine.",
      backgroundColor:
        "linear-gradient(90deg, rgba(167,162,244,1) 0%, rgba(112,112,143,1) 35%, rgba(166,149,13,1) 100%)",
      juiceImage: "/juice1.png",
      fruitImage: "/bgorange.png",
    },
    {
      name: "Plum Juice",
      description:
        "A luscious elixir extracted from ripe plums. Bursting with rich flavor and natural sweetness, it delivers a refreshing and satisfying experience. Indulge in the succulent essence of plums while enjoying the numerous health benefits it offers.",
      backgroundColor:
        "linear-gradient(90deg, rgba(2,19,45,1) 4%, rgba(120,109,181,1) 49%, rgba(230,132,132,1) 100%)",
      juiceImage: "/juice2.png",
      fruitImage: "/bgplumb.png",
    },
    {
      name: "Kiwi Juice",
      description:
        "A vibrant and tangy elixir extracted from ripe kiwis. Packed with essential nutrients, it offers a refreshing and invigorating experience. The perfect balance of sweetness and tanginess makes it a popular choice for a healthy and flavorful beverage.",
      backgroundColor:
        "linear-gradient(90deg, rgba(9,111,55,1) 0%, rgba(39,196,129,1) 49%, rgba(47,209,232,1) 100%)",
      juiceImage: "/juice3.png",
      fruitImage: "/bgkiwi.png",
    },
    {
      name: "Strawberry Juice",
      description:
        "Strawberry Juice is a refreshing fresh fruit juice that is full of vitamin C and antioxidants and lot of invigorating flavor. Apart from fresh and ripe strawberries, this recipe also uses lime juice to make it tantalizing.",
      backgroundColor:
        "linear-gradient(90deg, rgba(101,18,18,1) 0%, rgba(186,44,44,1) 49%, rgba(235,134,80,1) 100%)",
      juiceImage: "/juice4.png",
      fruitImage: "/bgstrawberry.png",
    },
  ];

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get responsive values based on screen size
  const getResponsiveValues = () => {
    const { width, height } = screenSize;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    return {
      isMobile,
      isTablet,
      isDesktop,
      juiceWheelSize: isMobile ? Math.min(width * 0.8, height * 0.6) : isTablet ? Math.min(width * 0.6, height * 0.5) : Math.min(width * 0.45, height * 0.7),
      fruitWheelSize: isMobile ? Math.min(width * 1.2, height * 0.8) : isTablet ? Math.min(width * 0.9, height * 0.7) : Math.min(width * 0.65, height * 0.9),
      juiceImageSize: isMobile ? '60%' : isTablet ? '65%' : '70%',
      fruitImageSize: isMobile ? '90%' : isTablet ? '95%' : '100%'
    };
  };

  const handleJuiceClick = (index) => {
    // Exit early if clicking the same juice that's already active
    if (index === currentJuiceIndex) {
      return;
    }

    if (mainRef.current) {
      mainRef.current.style.background = juiceData[index].backgroundColor;
    }

    const newDeg = deg - 90;
    setDeg(newDeg);
    setCurrentJuiceIndex(index);

    setFadeIn(true);
    setTimeout(() => {
      setFadeIn(false);
    }, 1000);
  };

  const responsive = getResponsiveValues();

  // Dynamic positioning for juice images
  const getDynamicJuicePosition = (index) => {
    const size = responsive.juiceWheelSize;
    const positions = [
      { top: `${-size * 0.65}px`, right: `${size * 0.18}px` },
      { right: `${-size * 0.55}px`, top: `${size * 0.06}px`, transform: 'rotate(90deg)' },
      { bottom: `${-size * 0.65}px`, right: `${size * 0.16}px`, transform: 'rotate(180deg)' },
      { top: `${size * 0.06}px`, left: `${-size * 0.55}px`, transform: 'rotate(-90deg)' }
    ];
    return positions[index];
  };

  // Dynamic positioning for fruit images
  const getDynamicFruitPosition = (index) => {
    const size = responsive.fruitWheelSize;
    const positions = [
      { bottom: `${-size * 0.65}px`, left: `${size * 0.02}px`, transform: 'rotate(90deg)' },
      { bottom: `${size * 0.28}px`, left: `${-size * 0.75}px`, transform: 'rotate(180deg)' },
      { top: `${-size * 0.45}px`, left: `${size * 0.12}px`, transform: 'rotate(100deg)' },
      { bottom: `${size * 0.17}px`, right: `${-size * 0.75}px` }
    ];
    return positions[index];
  };

  return (
    <main 
      ref={mainRef} 
      className="main-container"
      style={{ 
        background: juiceData[currentJuiceIndex].backgroundColor,
        '--juice-wheel-size': `${responsive.juiceWheelSize}px`,
        '--fruit-wheel-size': `${responsive.fruitWheelSize}px`,
        '--juice-wheel-right': responsive.isMobile ? `${-responsive.juiceWheelSize * 0.6}px` : responsive.isTablet ? `${-responsive.juiceWheelSize * 0.55}px` : `${-responsive.juiceWheelSize * 0.5}px`,
        '--juice-wheel-bottom': responsive.isMobile ? `${-responsive.juiceWheelSize * 0.6}px` : responsive.isTablet ? `${-responsive.juiceWheelSize * 0.55}px` : `${-responsive.juiceWheelSize * 0.5}px`,
        '--fruit-wheel-top': responsive.isMobile ? `${-responsive.fruitWheelSize * 0.7}px` : responsive.isTablet ? `${-responsive.fruitWheelSize * 0.65}px` : `${-responsive.fruitWheelSize * 0.6}px`,
        '--fruit-wheel-left': responsive.isMobile ? `${-responsive.fruitWheelSize * 0.6}px` : responsive.isTablet ? `${-responsive.fruitWheelSize * 0.65}px` : `${-responsive.fruitWheelSize * 0.7}px`,
        '--juice-image-size': responsive.juiceImageSize,
        '--fruit-image-size': responsive.fruitImageSize
      }}
    >
      <nav className={`nav ${responsive.isMobile ? 'mobile' : responsive.isTablet ? 'tablet' : 'desktop'}`}>
        <img src="/logo.png" alt="logo" className="logo" />
        <div className="menu-text">
          <p>Home</p>
          <p>Flavor</p>
          <p>About</p>
        </div>
        <div className="mobile-menu">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
        <button className="shop-button">Shop online</button>
      </nav>

      <div className={`content ${responsive.isMobile ? 'mobile' : responsive.isTablet ? 'tablet' : 'desktop'}`}>
        <div className={`juice-text ${fadeIn ? 'fade-in' : ''}`}>
          <h1 className="juice-title">{juiceData[currentJuiceIndex].name}</h1>
          <p className="juice-info">
            {juiceData[currentJuiceIndex].description}
          </p>
        </div>

        <div className="photos">
          {juiceData.map((juice, index) => (
            <div
              key={index}
              className={`juice-wrapper ${index === currentJuiceIndex ? 'active-photo' : ''}`}
              onClick={() => handleJuiceClick(index)}
            >
              <img src={juice.juiceImage} alt={`juice${index + 1}`} className="static-juice" />
            </div>
          ))}
        </div>
      </div>

      <div className="juice-wheel" style={{ transform: `rotate(${deg}deg)` }}>
        {juiceData.map((juice, index) => (
          <img
            key={index}
            src={juice.juiceImage}
            alt={`juice${index + 1}`}
            className={`dynamic-juice dynamic-juice-${index + 1}`}
            style={getDynamicJuicePosition(index)}
          />
        ))}
      </div>

      <div className="fruits-wheel" style={{ transform: `rotate(${deg}deg)` }}>
        {juiceData.map((juice, index) => (
          <img
            key={index}
            src={juice.fruitImage}
            alt={`fruit${index + 1}`}
            className={`dynamic-fruit dynamic-fruit-${index + 1}`}
            style={getDynamicFruitPosition(index)}
          />
        ))}
      </div>
    </main>
  );
};

export default App;