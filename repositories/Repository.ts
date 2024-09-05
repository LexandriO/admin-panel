import { Api } from "@/api/Api";

interface Model {}

export abstract class Repository<T> {
  private api = new Api("/api");

  abstract resource(): string; // product, user, article

  // rest, resource прочитать
  async index(): Promise<T[]> {
    const data = await this.api.get(this.resource());

    return data as T[];
  }

  // in laravel
  // Что такое модел и какой тип по итогу должен быть
  // { name: 123 }, { title: test }
  async store(model: Model): Promise<T> {
    const data = await this.api.post<Model>(this.resource(), model);

    return data as T;
  }

  async update(model: T): Promise<T> {
    const data = await this.api.put(this.resource(), model); // вся модель
    // const data = await this.api.patch<Model>(this.resource(), model); // свойство модели

    return data as T;
  }

  async delete(id: number): Promise<void> {
    await this.api.delete(`${this.resource()}/${id}`);

    // return data as T; удаленная модель либо статус
  }
}
