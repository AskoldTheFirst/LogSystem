export enum Severity {
  All = 0, Low = 1, Middle = 2, High = 3
}

export function SeverityToString(severity: Severity): string {
  switch (severity) {
    case 0:
      return "All";
    case 1:
      return "Low";
    case 2:
      return "Middle";
    case 3:
      return "High";
  }

  return "";
}