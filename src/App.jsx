/**
 * =============================================================================
 * MAIN APPLICATION COMPONENT
 * =============================================================================
 * 
 * This is the root component of the Socialsect website application.
 * It sets up the global layout structure and includes all necessary
 * interactive components and styling.
 * 
 * @author Socialsect Team
 * @version 1.0.0
 * @since 2024
 */

// =============================================================================
// IMPORTS
// =============================================================================

// Core Layout Components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import MainRoutes from "./routes/routes";

// Interactive UI Components
import ClickSpark from "./components/clickspark";
import TargetCursor from "./components/targetcursor/cursor";

// Global Styles
import "./App.css";
import "./styles/global.css";

// =============================================================================
// MAIN APP COMPONENT
// =============================================================================

/**
 * App Component
 * 
 * The main application wrapper that provides:
 * - Global layout structure (Navbar, Content, Footer)
 * - Interactive cursor effects
 * - Click spark animations
 * - Route management
 * 
 * @returns {JSX.Element} The complete application structure
 */
function App() {
  return (
    <div className="app">
      {/* Custom Cursor Component */}
      <TargetCursor />
      
      {/* Click Spark Animation Wrapper */}
      <ClickSpark
        sparkColor='#000'        // Black spark color for contrast
        sparkSize={10}           // Size of individual sparks
        sparkRadius={15}         // Radius of spark spread
        sparkCount={8}           // Number of sparks per click
        duration={400}           // Animation duration in ms
      >
        {/* Global Navigation */}
        <Navbar />
        
        {/* Main Content Area */}
        <div className="content">
          <MainRoutes />
        </div>
        
        {/* Global Footer */}
        <Footer />
      </ClickSpark>
    </div>
  );
}

export default App;