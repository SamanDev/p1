import { useTour } from "@reactour/tour";
import { Icon, Segment } from "semantic-ui-react";
import $ from "jquery";
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key].split("-")[0]] =
      result[currentValue[key].split("-")[0]] || []).push(currentValue);
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};
function App() {
  const { setIsOpen, setCurrentStep, steps } = useTour();

  const startAtmy = () => {
    var _g = groupBy(steps, "selector");
    var defclass = 0;
    if ($(".step2:visible").length) {
      defclass = 0;
    } else if ($(".step0:visible").length) {
      defclass = _g[".step2"].length;
    } else if ($(".step1:visible").length) {
      defclass = _g[".step2"].length + _g[".step0"].length;
    }
    setCurrentStep(defclass);
    setIsOpen(true);
  };
  return (
    <>
      <Segment
        basic
        id="openhelp"
        style={{
          color: "#fff",
          position: "absolute",
          top: 3,
          right: 60,
          opacity: 1,
          padding: 0,
          cursor: "pointer",
          zIndex: 4,
        }}
        title="تور معرفی سایت"
        onClick={() => startAtmy()}
      >
        <Icon size="big" name="question circle outline" />
      </Segment>
    </>
  );
}
export default App;
