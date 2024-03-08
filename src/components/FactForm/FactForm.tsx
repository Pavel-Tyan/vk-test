import { useEffect, useState } from "react";
import { useRef } from "react";

export const FactForm = (): JSX.Element => {
  const getFact = async (): Promise<string> => {
    return fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((responseJson) => responseJson.fact);
  };

  const [value, setValue] = useState<string>("");

  const factTextareaRef = useRef(null);
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    getFact().then((text) => setValue(text));

    if (factTextareaRef && factTextareaRef.current) {
      factTextareaRef.current.focus();
    }
  };

  useEffect(() => {
    if (!factTextareaRef || !factTextareaRef.current) {
      return;
    }

    let startInd = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] == " ") {
        startInd = i;
        break;
      }
    }

    factTextareaRef.current.setSelectionRange(startInd, startInd);
  }, [value]);

  return (
    <div>
      <textarea
        ref={factTextareaRef}
        name="fact"
        id="fact"
        value={value}
      ></textarea>
      <button onClick={handleSubmit}>Get Fact</button>
    </div>
  );
};
