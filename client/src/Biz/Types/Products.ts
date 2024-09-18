export enum Products {
  All = 0,
  Tester = 1,
  PF = 2,
  FCS = 3,
  LogSystem = 4,
}

export function ProductToString(product: Products): string {
  switch (product) {
    case 0:
      return "All";
    case 1:
      return "Tester";
    case 2:
      return "PF";
    case 3:
      return "FCS";
    case 4:
      return "Logger";
  }

  return "";
}