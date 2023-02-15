import React from "react";
import Slider from "../components/Slider/Slider";
import Timeline from "../components/Timeline";
import './css/home.css';

function Home() {
  return (
    <div className="home space-y-8">
      <section>
        <Slider />
      </section>
      {/* <Timeline /> */}
    </div>
  );
}

export default Home;
