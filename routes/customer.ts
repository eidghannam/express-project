import { Router, Request, Response, NextFunction } from "express";
import {
  createCustomer,
  editCustomer,
  getAllCustomers,
  getCustomer,
  removeCustomer,
} from "../controllers/customer.js";
import { Customer } from "../db/entities/customer.js";
const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const payload: Customer = req.body;

  if (!payload.name || !payload.mobilePhone || !payload.balance) {
    res.status(400).json({
      message: "Some felids are missing",
      success: false,
    });
    return;
  }
  try {
    const customer = await createCustomer(req.body);

    res.status(201).json({
      message: "Customer created successfully",
      success: true,
      customer: customer,
    });
  } catch (error) {
    console.log("Error" + error);
    next(error);
  }
});

router.get("/", getAllCustomers);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const customerId = Number(req.params.id);
  const payload: Customer = req.body;

  try {
    const customer = await editCustomer(customerId, payload);

    res.json({
      message: "Customer edited successfully",
      success: true,
      customer: customer,
    });
  } catch (error) {
    console.log("Error" + error);
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerId = Number(req.params.id);
    const customer = await getCustomer(customerId);

    res.json({
      message: "success",
      customer: customer,
    });
  } catch (error) {
    console.log("error: " + error);
    next(error);
  }
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const customerId = Number(req.params.id);

    try {
      const customer = await removeCustomer(customerId);

      res.json({
        message: "Customer deleted successfully",
        success: true,
      });
    } catch (error) {
      console.log("Error" + error);
      next(error);
    }
  }
);
export default router;
