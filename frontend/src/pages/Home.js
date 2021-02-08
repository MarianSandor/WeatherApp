import "./Home.css";

// components
import Header from "../components/header/Header";
import LogInForm from "../components/modals/LogInForm";
import SignUpForm from "../components/modals/SignUpForm";

function Home({ setIsHome }) {
  return (
    <>
      <div className="Home">
        <header>
          <Header setIsHome={setIsHome} />
        </header>
        <div className="empty"></div>
        <div className="text-container">
          <h1>Welcome to SanWeather</h1>
          <h3>What is SanWeather?</h3>
          <p className="p">
            &nbsp;&nbsp;&nbsp;&nbsp;SanWeather is a website that provides
            weather forecasts for many locations around the world. More than
            this, it is a way for people across the whole world to connect and
            share their impressions of different locations they've visited.
          </p>
          <h3>How does it work?</h3>
          <p className="p">
            &nbsp;&nbsp;&nbsp;&nbsp;In order to get access to the
            functionalities of the website, you first need to create an account.
            This can be of two types: Silver or Gold. It is important to know
            that a silver user can only read others reviews while a gold user
            can also write reviews. One more thing, gold users have access to
            live webcams for the locations they've searched.
          </p>
        </div>
      </div>
      <LogInForm />
      <SignUpForm />
    </>
  );
}

export default Home;
