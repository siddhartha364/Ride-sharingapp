import React, { useState } from "react";
import "./App.css";

export default function App() {
  // ==== Auth States ====
  const [isLogin, setIsLogin] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  // Auth forms
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // ==== Ride States ====
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [price, setPrice] = useState(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);

  // === Register ===
  const handleRegister = (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(regPhone)) {
      alert("Phone must be exactly 10 digits");
      return;
    }
    setRegisteredUser({
      email: regEmail,
      phone: regPhone,
      password: regPassword,
    });
    alert("Registered successfully! Please Login.");
    setRegEmail("");
    setRegPhone("");
    setRegPassword("");
  };

  // === Login ===
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      registeredUser &&
      loginEmail === registeredUser.email &&
      loginPhone === registeredUser.phone &&
      loginPassword === registeredUser.password
    ) {
      setIsLogin(true);
    } else {
      alert("Invalid credentials or user not registered!");
    }
  };

  const handleLogout = () => {
    setIsLogin(false);
    setPickup("");
    setDrop("");
    setVehicle("");
    setPrice(null);
    setRideConfirmed(false);
    setLoginEmail("");
    setLoginPhone("");
    setLoginPassword("");
  };

  // === Price Calculation ===
  const handleSeePrices = () => {
    if (!pickup || !drop || !vehicle) {
      alert("Please enter all details");
      return;
    }
    // Generate a random price up to 500
    const randomPrice = Math.floor(Math.random() * 501);
    setPrice(randomPrice);
  };

  const handleConfirmRide = () => {
    if (price === null) {
      alert("Check price first");
      return;
    }
    setRideConfirmed(true);
  };

  const handleCancelRide = () => {
    setRideConfirmed(false);
    setPrice(null);
  };

  return (
    <div className="app-container">
      {!isLogin ? (
        <section className="active">
          <div className="container">
            <h1 className="title">Welcome to QuickRide</h1>
            <div className="form-wrapper">
              {/* Register Form */}
              {!registeredUser ? (
                <form className="form" onSubmit={handleRegister}>
                  <h2>Create Account</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (10 digits)"
                    value={regPhone}
                    maxLength="10"
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn green">
                    Register
                  </button>
                  <p className="switch">
                    Already have an account?{" "}
                    <a href="#" onClick={() => setRegisteredUser({})}>
                      Login
                    </a>
                  </p>
                </form>
              ) : (
                // Login Form
                <form className="form" onSubmit={handleLogin}>
                  <h2>Login</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (10 digits)"
                    value={loginPhone}
                    maxLength="10"
                    onChange={(e) => setLoginPhone(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn green">
                    Login
                  </button>
                  <p className="switch">
                    New here?{" "}
                    <a
                      href="#"
                      onClick={() => {
                        setRegisteredUser(null);
                      }}
                    >
                      Register
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="active">
          <div className="container">
            <div className="ride-header">
              <h1>Go anywhere with QuickRide</h1>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
            <div className="ride-container">
              <div className="ride-form">
                <input
                  type="text"
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Dropoff location"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  required
                />
                <select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  required
                >
                  <option value="">Select Vehicle</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Auto">Auto</option>
                </select>
                {!rideConfirmed && (
                  <>
                    <button className="btn green" onClick={handleSeePrices}>
                      See Prices
                    </button>
                    {price !== null && (
                      <>
                        <div className="price-display">₹ {price}</div>
                        <button
                          className="btn green"
                          onClick={handleConfirmRide}
                        >
                          Confirm Ride
                        </button>
                      </>
                    )}
                  </>
                )}
                {rideConfirmed && (
                  <>
                    <div className="price-display">
                      Ride Confirmed for ₹ {price}
                    </div>
                    <button className="btn cancel-btn" onClick={handleCancelRide}>
                      Cancel Ride
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
