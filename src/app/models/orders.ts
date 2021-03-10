import { Client } from "./client";
import { Drink } from "./drink";

export interface Order {
    date?: Date,
    client?: any,
    table?: string,
    numberClient?: string,
    totalSpent?: Number,
    savedPoint?: Number,
    drinks?: any
}