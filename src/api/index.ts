import { BASE_URL, CLASS_KEY } from "../config/constants";

export const fetchStudents = async () => {
  const resp = await fetch(`${BASE_URL}/v1/${CLASS_KEY}/Schoolboy`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await resp.json();
};

export const fetchColumnsLessons = async () => {
  const resp = await fetch(
    `${BASE_URL}/v1/${CLASS_KEY}/Column
    `,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return await resp.json();
};

export const fetchRates = async () => {
  const resp = await fetch(
    `${BASE_URL}/v1/${CLASS_KEY}/Rate
    `,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return resp.json();
};

export const markRateFetch = async (dto: {
  SchoolboyId: number;
  ColumnId: number;
  Title: string;
}) => {
  const resp = await fetch(`${BASE_URL}/v1/${CLASS_KEY}/Rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  /** 
  This error i think because empty body, 
  when i  try convert resp with json method, means that you're trying to parse something that is not a valid JSON object.
  @error : 
   "SyntaxError: Unexpected end of JSON input"
  */

  //return await resp.json()

  if (!resp.ok) {
    return Promise.reject(() => new Error("Request failed"));
  }
};

export const unMarkRateFetch = async (dto: {
  SchoolboyId: number;
  ColumnId: number;
}) => {
  const resp = await fetch(`${BASE_URL}/v1/${CLASS_KEY}/UnRate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dto),
  });

  //return await resp.json()
  if (!resp.ok) {
    return Promise.reject(() => new Error("Request failed"));
  }
};
