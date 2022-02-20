import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { Form } from "remix";

interface InputFormProps {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}

export function InputForm({ input, setInput, disabled }: InputFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <Form
      method="post"
      autoComplete="off"
      className="h-0 overflow-hidden"
      onSubmit={(e) => {
        if (input.length === 0) {
          e.preventDefault();
        }
      }}
    >
      <fieldset disabled={disabled}>
        <label>
          Guess:
          <input
            ref={inputRef}
            type="text"
            name="word"
            value={input}
            maxLength={5}
            onBlur={() => {
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            onChange={(e) => setInput(e.target.value.toLowerCase())}
          />
        </label>
      </fieldset>
    </Form>
  );
}
