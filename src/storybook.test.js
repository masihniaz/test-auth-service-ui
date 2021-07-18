import initStoryshots from "@storybook/addon-storyshots";
import ReactDOM from "react-dom";

ReactDOM.createPortal = jest.fn((element, node) => {
  return element;
});

initStoryshots();
