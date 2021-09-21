export interface Rating {
    improvements: any[];
}

export interface Status {
    _id: string;
    name: string;
    date: Date;
    obs: string;
}

export interface ExternalVendors {
    name: string;
    failed: boolean;
    finished: boolean;
    status: Status[];
}

export interface Latlng {
    lat: number;
    lng: number;
}

export interface Address {
    latlng: Latlng;
    address: string;
    city: string;
    complement: string;
    district: string;
    number: string;
    state: string;
    zip: string;
}

export interface Whatsapp {
    is_active: boolean;
    phone: string;
}

export interface Details {
    whatsapp: Whatsapp;
    document: string;
    email: string;
    phone: string;
    socialName: string;
    storePhone: string;
}

export interface Store {
    _id: string;
    name: string;
    address: Address;
    deliveryTime: string;
    toGoTime: string;
    details: Details;
}

export interface User {
    _id: string;
    name: string;
    document: string;
    email: string;
    phone: string;
    totalOrders: number;
}

export interface Latlng2 {
    lat: number;
    lng: number;
}

export interface Address2 {
    latlng: Latlng2;
    is_active: boolean;
    created_at: Date;
    _id: string;
    zip: string;
    state: string;
    city: string;
    address: string;
    number: string;
    complement: string;
    district: string;
    name: string;
}

export interface Status2 {
    _id: string;
    name: string;
    date: Date;
    obs: string;
}

export interface Payment {
    online: boolean;
    name: string;
    cod: string;
    externalVendorCode: string;
}

export interface Price {
    actualPrice: number;
    originalPrice: number;
    starterPrice: number;
}

export interface Modifier {
    id: string;
    name: string;
    price: Price;
    quantity: number;
    group: string;
    externalVendorCode: string;
}

export interface Product {
    id: string;
    name: string;
    quantity: number;
    modifiers: Modifier[];
    notes: string;
    total: number;
    externalVendorCode: string;
}

export interface Order {
    _id: string;
    rating: Rating;
    externalVendors: ExternalVendors;
    delivery: boolean;
    canceled: boolean;
    scheduled: boolean;
    created_at: Date;
    updated_at: Date;
    network: string;
    sequential: number;
    store: Store;
    user: User;
    address: Address2;
    discount: number;
    subtotal: number;
    deliveryTax: number;
    date: Date;
    document: string;
    ip: string;
    change: number;
    source: string;
    status: Status2[];
    total: number;
    payment: Payment;
    products: Product[];
    __v: number;
}