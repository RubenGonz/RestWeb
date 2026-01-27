import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {

  constructor(
    private readonly datasource: TodoDataSource
  ) { }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll()
  }

  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id)
  }

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto)
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto)
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id)
  }
}