import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Initialized 1build with key
   */
  useEffect(() => {
    function initOnebuild() {
      window.onebuild.init({
        key: process.env.REACT_APP_1BUILD_API_KEY,
      });
    }

    initOnebuild();
  }, []);

  /**
   * Opens widget.
   */
  function open() {
    let params = {
      readOnlyLocation: true,
    };

    if (location !== "") {
      params["location"] = { zipcode: location };
    }

    if (searchTerm !== "") {
      params["searchTerm"] = searchTerm;
    }

    console.log("Opening widget with following paramerters:");
    console.log(params);
    window.onebuild.open(params);
  }

  function clear() {
    setLocation("");
    setSearchTerm("");
  }

  return (
    <div className="app">
      <h1>1build widget with React</h1>

      <div className="make__full__width">
        <label className="form__field">
          Location (zipcode)
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter a location for accurate pricing"
          />
        </label>
        <ExampleZipcodesTable setLocation={setLocation} />
      </div>

      <label className="form__field">
        Search term
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Try 'drywall' or 'douglas fir'"
        />
      </label>

      <div className="buttons">
        <button onClick={clear}>Clear fields</button>
        <button onClick={open}>Open onebuild widget</button>
      </div>
    </div>
  );
}

function ExampleZipcodesTable({ setLocation }) {
  return (
    <div>
      <p>Sample zipcodes</p>
      <table className="zipcodes__table">
        <thead>
          <tr>
            <td>State</td>
            <td>Zipcode</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>California, Maryland</td>
            <td>20619</td>
            <td>
              <button onClick={() => setLocation("20619")}>select</button>
            </td>
          </tr>
          <tr>
            <td>California, Pennsylvania</td>
            <td>15419</td>
            <td>
              <button onClick={() => setLocation("15419")}>select</button>
            </td>
          </tr>
          <tr>
            <td>California, Kentucky</td>
            <td>41007</td>
            <td>
              <button onClick={() => setLocation("41007")}>select</button>
            </td>
          </tr>
          <tr>
            <td>California, Missouri</td>
            <td>65018</td>
            <td>
              <button onClick={() => setLocation("65018")}>select</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
