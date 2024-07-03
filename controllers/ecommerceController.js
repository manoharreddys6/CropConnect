import fs from 'fs';
import path from 'path';

const itemsFilePath = path.resolve('data/items.json');

export const getItems = (req, res) => {
  fs.readFile(itemsFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read items file' });
    }
    res.json(JSON.parse(data));
  });
};

export const addItem = (req, res) => {
  const { title, description, price } = req.body;
  const imageUrl = `/uploads/${req.file.filename}`;

  const newItem = { title, description, price, imageUrl };

  fs.readFile(itemsFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read items file' });
    }
    const items = JSON.parse(data);
    items.push(newItem);

    fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to write items file' });
      }
      res.status(200).json({ message: 'Item added successfully' });
    });
  });
};
