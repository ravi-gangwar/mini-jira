import { createProject, createTask, deleteUser, login, register } from "./helpers.js";

describe("E2E flow", () => {
    let project;
    let task;

    beforeAll(async () => {
        const regRes = await register();
        expect(regRes.status).toBe(201);

        const loginRes = await login();
        expect(loginRes.status).toBe(200);
    });

    afterAll(async () => {
        const delRes = await deleteUser();
        expect(delRes.status).toBe(200);
    });

    test("create-project", async () => {
        const res = await createProject();
        expect(res.status).toBe(201);
        expect(res.project).toHaveProperty("_id");
        expect(res.project.name).toBe("Project Testing");

        project = res.project; // store for later
    });

    test("create-task", async () => {
        const res = await createTask();
        expect(res.status).toBe(201);
        expect(res.task).toHaveProperty("_id");
        expect(res.task.title).toBe("Task Testing");

        task = res.task; // store if needed
    });
});
