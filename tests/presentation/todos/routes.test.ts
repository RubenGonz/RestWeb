import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres/init';

describe("should return TODOS api/todos", () => {

  beforeEach(async () => {
    await prisma.todo.deleteMany()
  })

  beforeAll(async () => {
    await testServer.start()
  })

  afterAll(() => {
    testServer.close()
  })

  const todo1 = { text: "Testing todo 1" }
  const todo2 = { text: "Testing todo 2" }

  test("should return a TODO api/todos", async () => {
    await prisma.todo.createMany({
      data: [todo1, todo2]
    })

    const { body } = await request(testServer.app)
      .get("/api/todos")
      .expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBe(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[0].completedAt).toBe(null)
    expect(body[1].text).toBe(todo2.text)
    expect(body[1].completedAt).toBe(null)
  })

  test("should return a TODO api/todos/:id", async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200)

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt
    })
  })

  test("should return a 404 api/todos/:id", async () => {
    const invalidId = 0
    const { body } = await request(testServer.app)
      .get(`/api/todos/${invalidId}`)
      .expect(404)

    expect(body).toEqual({ error: `Todo with id ${invalidId} not found` })
  })

  test("should return a new TODO api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send(todo1)
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null
    })
  })

  test("should return an error if text is not present at api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({})
      .expect(400)

    expect(body).toEqual({ error: "Text property is required" })
  })

  test("should return an updated TODO api/todos", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({ text: "" })
      .expect(400)

    expect(body).toEqual({ error: "Text property is required" })
  })

  test("should return an updated TODO api/todos", async () => {
    const newData = { text: "Updated Todo", completedAt: "2026-01-30" }
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send(newData)
      .expect(200)

    expect(body).toEqual({
      id: expect.any(Number),
      text: newData.text,
      completedAt: newData.completedAt + "T00:00:00.000Z"
    })
  })

  test("should return 404 if TODO not found", async () => {
    const invalidId = 1.5
    const { body } = await request(testServer.app)
      .put(`/api/todos/${invalidId}`)
      .send({ text: "Updated Todo", completedAt: "2026-01-30" })
      .expect(404)

    expect(body).toEqual({ error: `Todo with id ${invalidId} not found` })
  })

  test("should return an updated TODO only with the date", async () => {
    const newData = { completedAt: "2026-01-30" }
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send(newData)
      .expect(200)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: newData.completedAt + "T00:00:00.000Z"
    })
  })

  test("should delete a TODO", async () => {
    const todo = await prisma.todo.create({ data: todo1 })

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null
    })
  })

  test("should return a 404 if todo to delete does not exist", async () => {
    const invalidId = 1.5
    const { body } = await request(testServer.app)
      .delete(`/api/todos/${invalidId}`)
      .expect(404)

    expect(body).toEqual({ error: `Todo with id ${invalidId} not found` })
  })
})