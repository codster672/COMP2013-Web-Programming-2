import "./App.css";
import Card from "./Components/Card";
function App() {
  return (
    <>
      <div className="main-div">
        <h1 style={{ color: "#6A6A6A" }}>Resorts Lite</h1>
        <div className="main-container">
          <Card
            image="src\assets\images\1.jpg"
            country="Indonesia"
            name="Gill Air Hotel"
            rate="4.8"
            price="$589/night"
          />
              <Card
            image="src\assets\images\2.jpg"
            country="Seychelles"
            name="Hilton Resort"
            rate="4.2"
            price="$629/night"
          />
              <Card
            image="src\assets\images\3.jpg"
            country="US Virgin Islands"
            name="Goa Resort"
            rate="3.5"
            price="$485/night"
          />
              <Card
            image="src\assets\images\4.jpg"
            country="Bahamas"
            name="Kuredu Resort"
            rate="4.1"
            price="$729/night"
          />
              <Card
            image="src\assets\images\5.jpg"
            country="Mauritius"
            name="Trou D'eau Douce"
            rate="4.9"
            price="$877/night"
          />
              <Card
            image="src\assets\images\6.jpg"
            country="Bermuda"
            name="Staniel Cay Hotel"
            rate="3.2"
            price="$365/night"
          />
              
        </div>
      </div>
    </>
  );
}

export default App;
