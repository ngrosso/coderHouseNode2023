import { Command } from 'commander';
import ProductManager from '../../domain/managers/product.manager.js';

const AddProductCommand = new Command('addProduct');

AddProductCommand
  .version('0.0.1')
  .description('Add product')
  .option('-t, --title <title>', 'Product title')
  .option('-d, --description <description>', 'Product description')
  .option('-p, --price <price>', 'Product unit price')
  .option('-th, --thumbnail <thumbnail>', 'Product Image in URL format or separed by commas')
  .option('-s, --stock <stock>', 'Product quantity in stock')
  .option('-c, --code <code>', 'Product code')
  .option('-cat, --category <category>', 'Product category')
  .option('-st, --status <status>', 'Product status (true/false)')
  .action(async (env) => {
    const payload = {
      title: env.title,
      description: env.description,
      price: +env.price,
      thumbnail: [env.thumbnail],
      stock: +env.stock,
      code: env.code,
      category: env.category,
      status: env.status === 'true',
    };

    console.log("payload", payload)
    const manager = new ProductManager();
    const product= await manager.create("admin",payload);

    if (product) {
      console.log('Product created successfully');
    }
  });

export default AddProductCommand;
