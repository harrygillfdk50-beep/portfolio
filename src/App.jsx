import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  Tech,
  Testimonials,
  Works,
} from "./components";

const App = () => (
  <BrowserRouter>
    <div className="relative z-0 bg-primary min-h-screen">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <About />
      <div className="section-alt">
        <Works />
      </div>
      <Feedbacks />
      <div className="section-alt">
        <Testimonials />
      </div>
      <Tech />
      <Experience />
      <div className="relative z-0">
        <Contact />
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
