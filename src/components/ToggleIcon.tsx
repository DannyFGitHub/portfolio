import React from "react";
import PropTypes from "prop-types";

let _clipPathSupported: boolean | null = null;

// Check if clip-path is supported. From http://stackoverflow.com/a/30041538.
function clipPathSupported() {
  if (_clipPathSupported != null) {
    return _clipPathSupported;
  }
  if (typeof document === "undefined") {
    _clipPathSupported = false;
    return false;
  }

  const base = "clipPath";
  const prefixes = ["Webkit"];
  const properties = [
    base,
    ...prefixes.map(
      (prefix) => prefix + base.charAt(0).toUpperCase() + base.slice(1)
    ),
  ];
  const testElement = document.createElement("testelement");
  const attribute = "polygon(50% 0%, 0% 100%, 100% 100%)";

  // Interate over the properties and see if they pass two tests.
  for (const property of properties) {
    // First, they need to even support clip-path (IE <= 11 does not)...
    if (testElement.style[property] === "") {
      // Second, we need to see what happens when we try to create a CSS shape...
      testElement.style[property] = attribute;
      if (testElement.style[property] !== "") {
        _clipPathSupported = true;
        return true;
      }
    }
  }
  _clipPathSupported = false;
  return false;
}

const clipPath = (value: string) => ({
  WebkitClipPath: value,
  clipPath: value,
});

/**
 * An animated toggle icon.
 */
function ToggleIcon(props: {
  [x: string]: any;
  offIcon: any;
  onIcon: any;
  on: any;
}) {
  const { offIcon, onIcon, on, ...other } = props;

  return (
    <div
      {...other}
      style={{
        width: 24,
        height: 24,
        position: "relative",
        display: "inline-block",
      }}
    >
      {React.cloneElement(offIcon, {
        style: {
          ...clipPath(
            on
              ? "polygon(0% 0%, 0% 0%, 0% 0%)"
              : "polygon(0% 200%, 0% 0%, 200% 0%)"
          ),
          visibility: !on || clipPathSupported() ? "visible" : "hidden",
          transition:
            "clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1), -webkit-clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
        },
      })}
      {React.cloneElement(onIcon, {
        style: {
          ...clipPath(
            on
              ? "polygon(100% -100%, 100% 100%, -100% 100%)"
              : "polygon(100% 100%, 100% 100%, 100% 100%)"
          ),
          visibility: on || clipPathSupported() ? "visible" : "hidden",
          transition:
            "clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1), -webkit-clip-path 550ms cubic-bezier(0.4, 0.0, 0.2, 1)",
          width: "100%",
          height: "100%",
          position: "absolute",
          left: 0,
          top: 0,
        },
      })}
    </div>
  );
}

ToggleIcon.propTypes = {
  /**
   * The icon to be displayed if the `on` prop is set to `false`.
   */
  offIcon: PropTypes.element.isRequired,
  /**
   * The icon to be displayed if the `on` prop is set to `true`.
   */
  onIcon: PropTypes.element.isRequired,
  /**
   * Controls whether the `onIcon` or the `offIcon` is displayed.
   */
  on: PropTypes.bool.isRequired,
};

export default ToggleIcon;
