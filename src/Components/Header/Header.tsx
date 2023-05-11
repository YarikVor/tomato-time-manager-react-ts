import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <a href={"https://github.com/YarikVor"} className="logo">
        YarikVor
      </a>
      <a>🍅 Tomato - Your time manager ⏲</a>
      <nav>
        <a href={"https://github.com/YarikVor/tomato-time-manager-react-ts"}>
          GitHub
        </a>
      </nav>
    </header>
  );
};

export default Header;
