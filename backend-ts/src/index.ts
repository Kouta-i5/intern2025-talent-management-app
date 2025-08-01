import express, { Request, Response } from "express";
import { EmployeeDatabaseInMemory } from './employee/EmployeeDatabaseInMemory';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeT } from './employee/Employee';
import { isLeft } from 'fp-ts/Either';

const app = express();
const port = process.env.PORT ?? 8080;
const database = new EmployeeDatabaseInMemory();

app.get("/api/employees", async (req: Request, res: Response) => {
    const filterText = req.query.filterText ?? "";
    const filterDepartment = req.query.filterDepartment ?? "";
    const filterSkill = req.query.filterSkill ?? "";
    // req.query is parsed by the qs module.
    // https://www.npmjs.com/package/qs
    if (Array.isArray(filterText)) {
        // Multiple filterText is not supported
        res.status(400).send();
        return;
    }
    if (typeof filterText !== "string") {
        // Nested query object is not supported
        res.status(400).send();
        return;
    }
    if (Array.isArray(filterDepartment)) {
        res.status(400).send();
        return;
    }
    if (typeof filterDepartment !== "string") {
        res.status(400).send();
        return;
    }
    if (Array.isArray(filterSkill)) {
        res.status(400).send();
        return;
    }
    if (typeof filterSkill !== "string") {
        res.status(400).send();
        return;
    }
    try {
        const employees = await database.getEmployees(filterText, filterDepartment, filterSkill);
        res.status(200).send(JSON.stringify(employees));
    } catch (e) {
        console.error(`Failed to load the users filtered by ${filterText}.`, e);
        res.status(500).send();
    }
});

app.get("/api/employees/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId;
    try {
        const employee = await database.getEmployee(userId);
        if (employee == undefined) {
            res.status(404).send();
            return;
        }
        res.status(200).send(JSON.stringify(employee));
    } catch (e) {
        console.error(`Failed to load the user ${userId}.`, e);
        res.status(500).send();
    }
});

app.post("/api/employees", async (req: Request, res: Response) => {
    const parsed = req.body;
    parsed.id = uuidv4();

    const decoded = EmployeeT.decode(parsed);
    if (isLeft(decoded)) {
        res.status(400).json({ message: "Invalid employee data" });
        return;
    }

    try {
        await database.addEmployee(decoded.right);
        res.status(201).json({ id: decoded.right.id });
    } catch (e) {
        console.error("Failed to add employee", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`App listening on the port ${port}`);
});
