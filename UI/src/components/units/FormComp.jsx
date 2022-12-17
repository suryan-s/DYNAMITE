import { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Select,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";

const fields = {
  heart: [
    "Age",
    "Sex",
    "Chest_pain_type",
    "BP",
    "Cholesterol",
    "FBS_over_120",
    "EK_results",
    "Max_HR",
    "Exercise_angina",
    "ST_depression",
    "Slope_of_ST",
    "Number_of_vessels_fluro",
    "Thallium",
  ],
};

export default function FormComp() {
  const [formItems, setFormItems] = useState([]);
  const formElement = useRef();
  function subForm() {
    const data = new FormData();
    formItems.map((item) => {
      data.append(item, document.querySelector(`input[name='${item}']`).value);
    });
    console.log(data);
    fetch("/form/heart", {
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    }).then((res) => {
      console.log(res.json());
    });
  }
  return (
    <>
      <Select
        placeholder="select option"
        onChange={(e) => {
          setFormItems(fields[e.target.value]);
          console.log(e.target.value);
        }}
      >
        <option value="heart">Heart</option>
      </Select>
      <form ref={formElement}>
        {formItems.map((item, idx) => (
          <FormControl key={idx} px="1rem">
            <FormLabel>{item}</FormLabel>
            <Input name={item} type="text" />
          </FormControl>
        ))}
      </form>
      {formItems[1] && <Button onClick={subForm}>Submit</Button>}
    </>
  );
}
