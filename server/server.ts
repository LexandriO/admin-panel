import { type Request, createServer, Response } from "miragejs";
import { type IProduct } from "@/types/entities/Product";
import { type IUserBackend } from "@/types/entities/user/UserBackend";
import products from "./mocks/products.json";
import users from "./mocks/users.json";

const server = createServer({
  namespace: "api",
  routes() {
    this.get("/users", (): IUserBackend[] => users as IUserBackend[]);

    this.post("/users", (_, request: Request) => {
      const attrs = JSON.parse(request.requestBody) as { login?: string; password?: string };

      if (attrs.login && attrs.password) {
        const candidate: IUserBackend | undefined = (users as IUserBackend[]).find(
          (user) => user.login === attrs.login
        );

        if (!candidate) {
          return new Response(404, {}, { error: ["Пользователь не найден"] });
        }

        if (candidate.password === attrs.password) {
          const candidateWithOptionalPassword: { password?: string } & Omit<IUserBackend, "password"> = {
            ...candidate,
          };

          delete candidateWithOptionalPassword.password;

          return candidateWithOptionalPassword;
        }

        return new Response(401, {}, { error: ["Неверный пароль"] });
      }

      return new Response(400, {}, { error: ["Введите логин и пароль"] });
    });

    this.get("/products", (): IProduct[] => products as IProduct[]);

    this.post("/products", (_: any, request: Request) => {
      const newProduct = JSON.parse(request.requestBody) as IProduct;

      if (!newProduct.title || !newProduct.description || !newProduct.image) {
        return new Response(400, {}, { errors: ["Некоторые обязательные поля отсутствуют"] });
      }

      newProduct.id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

      products.push(newProduct);

      return new Response(201, {}, { message: "Продукт успешно добавлен", product: newProduct });
    });

    this.del("/products/:id", (_, request: Request) => {
      const id = +request.params.id;

      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        return new Response(404, {}, { errors: ["Товар не найден"] });
      }

      products.splice(productIndex, 1);
      return new Response(200, {}, { message: `Продукт с id ${id} был успешно удален.` });
    });

    this.put("/products/:id", (_, request: Request) => {
      const id = +request.params.id;
      const updatedProduct = JSON.parse(request.requestBody) as IProduct;

      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        return new Response(404, {}, { errors: ["Товар не найден"] });
      }

      products[productIndex] = { ...products[productIndex], ...updatedProduct };

      return new Response(
        200,
        {},
        { message: `Продукт с id ${id} был успешно обновлен.`, product: products[productIndex] }
      );
    });
  },
});

export { server };
