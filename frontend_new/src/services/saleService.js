import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";

export async function getCustomers() {
  return apiGet("/customers");
}

export async function addCustomer(data) {
  return apiPost("/customers", data);
}

export async function updateCustomer(data) {
  return apiPut(`/customers/${data.id}`, data);
}

export async function deleteCustomer(id) {
  return apiDelete(`/customers/${id}`);
}

export async function getSales() {
  return apiGet("/sales");
}

export async function addSale(data) {
  return apiPost("/sales", data);
}
