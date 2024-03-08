import { useState } from "react";

export const AgeForm = (): JSX.Element => {
  const [cache, setCache] = useState<Map<string, string>>(
    new Map<string, string>()
  );

  let controller = new AbortController();

  const getAge = async (name: string): Promise<void> => {
    controller.abort();
    controller = new AbortController();
    if (cache.has(name)) {
      setValue(cache.get(name));
      return;
    }

    return fetch("https://api.agify.io?name=" + name, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((responseJson) => responseJson.age)
      .then((age) => {
        const updatedCache = new Map<string, string>(cache);
        updatedCache.set(name, age);
        setCache(updatedCache);
        setValue(age);
      });
  };

  const [value, setValue] = useState<string>("");

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = () => {
    setTimeout(() => {
      getAge(value);
    }, 3000);
  };

  return (
    <div>
      <textarea
        name="age"
        id="age"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Get Age</button>
    </div>
  );
};
