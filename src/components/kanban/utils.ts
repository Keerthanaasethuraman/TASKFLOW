import type {
  Columns,
  Status,
} from "./kanbanTypes";

export const COLUMN_ORDER: Status[] = [
  "Todo",
  "In Progress",
  "Review",
  "Done",
];

export function createEmptyColumns(): Columns {
  return {
    Todo: [],
    "In Progress": [],
    Review: [],
    Done: [],
  };
}