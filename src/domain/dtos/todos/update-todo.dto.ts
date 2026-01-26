export class UpdateTodoDto {
  constructor(
    public readonly id: number,
    public readonly text: string,
    public readonly completedAt: string,
  ) { }

  get values() {
    const returnOgj: { [key: string]: any } = {}

    if (this.text) returnOgj.text = this.text
    if (this.completedAt) returnOgj.completedAt = this.completedAt

    return returnOgj
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props

    if (!id || isNaN(Number(id))) return ["Id must be a valid number"]

    let newCompletedAt = completedAt
    if (completedAt) {
      newCompletedAt = new Date(completedAt)
      if (newCompletedAt.toString() === "Invalid Date") {
        return ["CompletedAT must be a valid date"]
      }
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)]
  }
}