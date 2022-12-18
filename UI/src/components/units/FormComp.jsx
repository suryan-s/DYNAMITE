import { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Select,
  FormControl,
  FormLabel,
  Button,
  Alert,
  AlertIcon,
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
  breast: [
    "diagnosis",
    "radius_mean",
    "texture_mean",
    "perimeter_mean",
    "area_mean",
    "smoothness_mean",
    "compactness_mean",
    "concavity_mean",
    "concave points_mean",
    "symmetry_mean",
    "fractal_dimension_mean",
    "radius_se",
    "texture_se",
    "perimeter_se",
    "area_se",
    "smoothness_se",
    "compactness_se",
    "concavity_se",
    "concave points_se",
    "symmetry_se",
    "fractal_dimension_se",
    "radius_worst",
    "texture_worst",
    "perimeter_worst",
    "area_worst",
    "smoothness_worst",
    "compactness_worst",
    "concavity_worst",
    "concave points_worst",
    "symmetry_worst",
    "fractal_dimension_worst",
  ],
  parkinson: [
    "Jitter:DDP",
    "NHR",
    "HNR",
    "RPDE",
    "DFA",
    "spread1",
    "spread2",
    "D2",
    "PPE",
    "MDVP:Fo(Hz)",
    "MDVP:Fhi(Hz)",
    "MDVP:Flo(Hz)",
    "MDVP:Jitter(%)",
    "MDVP:Jitter(Abs)",
    "MDVP:RAP",
    "MDVP:PPQ",
    "MDVP:Shimmer",
    "MDVP:Shimmer(dB)",
    "MDVP:APQ",
    "Shimmer:APQ3",
    "Shimmer:APQ5",
    "Shimmer:DDA",
  ],
};

export default function FormComp() {
  const [formItems, setFormItems] = useState([]);
  const [response, setResponse] = useState(null);
  const [val, setVal] = useState(null);
  const formElement = useRef();
  function subForm() {
    const data = new FormData();
    formItems.map((item) => {
      if (item === "Sex") {
        data.append(
          item,
          document.querySelector(`select[name='${item}']`).value
        );
      } else {
        data.append(
          item,
          document.querySelector(`input[name='${item}']`).value
        );
      }
    });
    console.log(data);
    console.log(JSON.stringify(Object.fromEntries(data)));
    fetch(`/form/${val}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(Object.fromEntries(data)),
    })
      .then((res) => res.text())
      .then((text) => {
        setResponse(text);
      });
  }
  return (
    <>
      <Select
        placeholder="select option"
        onChange={(e) => {
          setVal(e.target.value);
          setFormItems(fields[e.target.value]);
          console.log(e.target.value);
        }}
      >
        <option value="heart">Heart</option>
        <option value="breast">Breast Cancer</option>
        <option value="parkinson">Parkinsons</option>
      </Select>
      <form ref={formElement} style={{ textAlign: "center" }}>
        {formItems.map((item, idx) => {
          return item === "Sex" ? (
            <FormControl key={idx} px="1rem" py="0.5rem">
              <FormLabel>{item}</FormLabel>
              <Select placeholder="Choose Gender:" name="Sex" py="" required>
                <option value="0">Female</option>
                <option value="1">Male</option>
              </Select>
            </FormControl>
          ) : (
            <>
              {item === "MDVP:Fo(Hz)" && (
                <FormControl key={idx} px="1rem">
                  <FormLabel py="1rem" fontSize="xl">
                    MDVP
                  </FormLabel>
                </FormControl>
              )}
              {item === "Shimmer:APQ3" && (
                <FormControl key={idx} px="1rem">
                  <FormLabel fontSize="xl" py="1rem">
                    Shimmer
                  </FormLabel>
                </FormControl>
              )}
              <FormControl key={idx} px="1rem">
                <FormLabel>{item}</FormLabel>
                <Input name={item} type="text" required />
              </FormControl>
            </>
          );
        })}
      </form>
      {formItems[1] && (
        <Button onClick={subForm} my="2rem">
          Submit
        </Button>
      )}
      {response && (
        <Alert status="info" my="1rem">
          <AlertIcon />
          {response}
        </Alert>
      )}
    </>
  );
}
