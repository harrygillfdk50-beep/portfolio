import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  CustomCursor,
  Experience,
  Feedbacks,
  Footer,
  Hero,
  Navbar,
  Skills,
  Testimonials,
  Works,
  WorkSamples,
} from "./components";
import AmbientOrbs from "./components/AmbientOrbs";
import BackgroundPaths from "./components/BackgroundPaths";
import BookingModal from "./components/BookingModal";
import { BookingProvider } from "./context/BookingContext";

const App = () => (
  <BrowserRouter>
    <BookingProvider>
      <CustomCursor />
      <BookingModal />
      <div className="relative z-0 bg-primary min-h-screen">
        <BackgroundPaths />
        <AmbientOrbs />
        <main className="relative">
          <div className="relative">
            <Navbar />
            <Hero />
          </div>
          <div className="section-alt">
            <About />
          </div>
          <Experience />
          <WorkSamples />
          <div className="section-alt">
            <Works />
          </div>
          <Feedbacks />
          <div className="section-alt">
            <Skills />
          </div>
          <div className="section-alt">
            <Testimonials />
          </div>
          <div className="relative z-0">
            <Contact />
          </div>
          <Footer />
        </main>
      </div>
    </BookingProvider>
  </BrowserRouter>
);

export default App;
