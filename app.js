const app = express();
const PORT = 3000;

const {
  resetProducts,
  addProduct,
  removeProduct,
  getProducts,
  getProduct,
  updateProduct,
} = require("./productManager");

describe("Product Manager", () => {
  beforeEach(() => {
    resetProducts();
  });

  describe("addProduct", () => {
    test("debería agregar un producto", () => {
      addProduct("Producto 1", 10);
      const products = getProducts();
      expect(products.length).toBe(1);
      expect(products[0].name).toBe("Producto 1");
      expect(products[0].price).toBe(10);
    });

    test("debería incrementar el id en 1 cada vez que se añada un producto", () => {
      addProduct("Producto 1", 10);
      addProduct("Producto 2", 20);
      const products = getProducts();
      expect(products[1].id).toBe(1);
    });

    test("debería lanzar un error si el nombre o el precio no están definidos", () => {
      expect(() => addProduct()).toThrow();
      expect(() => addProduct("Producto 1")).toThrow();
      expect(() => addProduct(null, 10)).toThrow();
    });

    test("debería lanzar un error si el producto ya existe", () => {
      addProduct("Producto 1", 10);
      expect(() => addProduct("Producto 1", 10)).toThrow();
    });
  });

  describe("removeProduct", () => {
    test("debería eliminar un producto", () => {
      addProduct("Producto 1", 10);
      removeProduct(0);
      const products = getProducts();
      expect(products.length).toBe(0);
    });

    test("debería lanzar un error si el producto no existe", () => {
      expect(() => removeProduct(999)).toThrow();
    });
  });

  describe("getProduct", () => {
    test("debería devolver un producto por su id", () => {
      addProduct("Producto 1", 10);
      const product = getProduct(0);
      expect(product).toBeDefined();
      expect(product.name).toBe("Producto 1");
      expect(product.price).toBe(10);
    });

    test("debería lanzar un error si el producto no existe", () => {
      expect(() => getProduct(999)).toThrow();
    });
  });

  describe("updateProduct", () => {
    test("debería actualizar un producto por su id", () => {
      addProduct("Producto 1", 10);
      updateProduct(0, "Producto Actualizado", 20);
      const product = getProduct(0);
      expect(product.name).toBe("Producto Actualizado");
      expect(product.price).toBe(20);
    });

    test("debería lanzar un error si el producto no existe", () => {
      expect(() => updateProduct(999, "Producto", 10)).toThrow();
    });
  });
});

app.listen(PORT, () => {
  console.log("servidor escuchando puerto 3000");
});
