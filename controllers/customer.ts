import { Request, Response } from "express";
import { Customer } from "../db/entities/customer.js";
import { AppError } from "../errors/AppErrors.js";

const createCustomer = async (payload: Customer) => {
  const customer = await Customer.findOne({
    where: {
      name: payload.name,
      mobilePhone: payload.mobilePhone,
      balance: payload.balance,
    },
  });

  if (customer) {
    throw new AppError(`Customer already exist`, 409, true);
  }
  const existingMobileNumber = await Customer.findOne({
    where: { mobilePhone: payload.mobilePhone },
  });

  if (existingMobileNumber) {
    throw new AppError("Mobile phone already in use", 409, true);
  }

  const newCustomer = await Customer.create(payload).save();
  return newCustomer;
};

const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await Customer.find();

  res.json({
    message: `Getting all Customers successfully`,
    status: true,
    customers: customers,
  });
};

const getCustomer = async (customerId: any) => {
  const customer = await Customer.findOne({ where: { id: customerId } });

  if (!customer) {
    throw new AppError("Customer not found", 404, true);
  }

  return customer;
};

const removeCustomer = async (customerId: any) => {
  const customer = await Customer.findOne({ where: { id: customerId } });

  if (!customer) {
    throw new AppError("Customer not found ", 404, true);
  }

  return customer.remove();
};

const editCustomer = async (customerId: number, payload: Customer) => {
  const customer = await Customer.findOne({ where: { id: customerId } });

  if (!customer) {
    throw new AppError("Customer not found ", 404, true);
  }

  if (payload.mobilePhone) {
    const existingCustomer = await Customer.findOne({
      where: { mobilePhone: payload.mobilePhone },
    });

    if (existingCustomer && existingCustomer.id !== customerId) {
      throw new AppError("Mobile phone already in use", 409, true);
    }
    customer.mobilePhone = payload.mobilePhone;
  }

  if (payload.name) {
    customer.name = payload.name;
  }

  if (payload.balance) {
    customer.balance = payload.balance;
  }

  return customer.save();
};

export {
  createCustomer,
  getAllCustomers,
  getCustomer,
  removeCustomer,
  editCustomer,
};
