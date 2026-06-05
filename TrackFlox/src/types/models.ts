export type Regions = {
   Region: "EEUU" | "Spanish";
}
export type location = {
    city: string;
    country: string;
    postalCode: string;
}
export interface User {
  idPerson: number;
  fullname: string;
  email: string;
  location: location;
  Region: Regions;
}
export interface Admin extends User {
    role: string;
    permissions: string[];
}
export interface interestedworker extends User {
    skills: string[];
    experience: number;
}

export interface Employee extends User {
    position: string;
    department: string;
    ageWork: number;

    }
export interface Customer extends User {
    purchaseHistory: string[];
    ConfidentPoints: number;

}
export interface Transportist extends Employee {
    vehicleType: string;
    licensePlate: string;
    locationlive: string;
    Inventory: string[];
    Destination: string;
    WorkingFor: Customer;
}
export interface Warehouse extends Employee {
    warehouseLocation: string;
    storageCapacity: number;
    Region: Regions;
    inventoryManagementSystem: string;
}
export interface Contractor extends Employee {
    contractDuration: number;
    agency: string;
}
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    warehouseLocation: Warehouse;
    expirationDate: Date;
    estado: "activo" | "inactivo";

}
export interface Devolution {
    id: number;
    product: Product;
    customer: Customer;
    reason: string;
    date: Date;
}
