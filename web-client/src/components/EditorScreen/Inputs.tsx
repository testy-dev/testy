import React from "react";

import { TextInput as GrommetTextInput } from "grommet";

import { InputProps } from "./commandDefinitions";

export const TextInput: React.FC<InputProps> = ({ onChange, ...props }) => (
  <GrommetTextInput onChange={e => onChange(e.target.value)} {...props} />
);

export const URLInput = TextInput;
export const SelectorInput = TextInput;
export const NumberInput = TextInput;
