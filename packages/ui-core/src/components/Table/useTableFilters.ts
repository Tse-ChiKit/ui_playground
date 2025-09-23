import { useEffect, useState } from "react";

type DebounceConfig<T> = {
  [K in keyof T]?: number;
};

export function useTableFilters<T extends Record<string, any>>(
  initial: T,
  debounce?: DebounceConfig<T>
) {
  const [inputs, setInputs] = useState<T>(initial);
  const [filters, setFilters] = useState<T>(initial);

  const [debounced, setDebounced] = useState<T>(initial);

  // Debounce each key individually
  useEffect(() => {
    const timers = Object.keys(inputs).map((key) => {
      const k = key as keyof T;
      const delay = debounce?.[k] ?? 0;

      if (delay > 0) {
        return setTimeout(() => {
          setDebounced((prev) => ({ ...prev, [k]: inputs[k] }));
        }, delay);
      } else {
        setDebounced((prev) => ({ ...prev, [k]: inputs[k] }));
        return null;
      }
    });

    return () => {
      timers.forEach((t) => t && clearTimeout(t));
    };
  }, [inputs, debounce]);

  const setInput = <K extends keyof T>(key: K, value: T[K]) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const submit = () => setFilters(inputs);
  const clear = () => {
    setInputs(initial);
    setFilters(initial);
    setDebounced(initial);
  };

  return {
    inputs,
    setInput,
    filters,
    submit,
    clear,
    debounced,
    queryParams: debounced,
  };
}
