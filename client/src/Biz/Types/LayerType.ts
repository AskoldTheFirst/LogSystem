export enum LayerType {
    All = 0, FrontEnd = 1, BackEnd = 2, Database = 3
  }

  export function LayerToString(layer: LayerType): string {
    switch (layer) {
      case 0:
        return "All";
      case 1:
        return "Front";
      case 2:
        return "Back";
      case 3:
        return "Storage";
    }
  
    return "";
  }