import { DataItem } from "../../types/types";

export async function fetchData(): Promise<DataItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/data`);
    return res.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
}
