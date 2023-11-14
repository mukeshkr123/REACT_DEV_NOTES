import "./home.module.css"; // Import your stylesheet

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to My Website</h1>
        <p>Discover amazing content and more.</p>
      </header>
      <main>
        {/* Add your content here */}
        <p>This is the main content of your homepage.</p>

        <Link to="/login"> Login </Link>
      </main>
      <footer>
        <p>&copy; 2023 Your Website</p>
      </footer>
    </div>
  );
};

export default HomePage;
