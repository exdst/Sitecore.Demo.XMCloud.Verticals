import fs from 'fs';

/**
 * Using @var path find all files recursively and generate output using @var resolveItem by calling it for each file
 * @param path plugins path
 * @param resolveItem will resolve item in required data format
 * @param cb will be called when new item is found
 * @param fileFormat Matches specific files
 * @returns {Item[]} items
 */
export function getItems<Item>(settings: {
  path: string;
  resolveItem: (path: string, name: string) => Item;
  cb?: (name: string) => void;
  fileFormat?: RegExp;
  excludeFolders?: RegExp;
}): Item[] {
  const { path, resolveItem, cb, fileFormat = new RegExp(/(.+)(?<!\.d)\.astro?$/), excludeFolders } = settings;
  const items: Item[] = [];
  const folders: fs.Dirent[] = [];

  if (!fs.existsSync(path)) return [];

  fs.readdirSync(path, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {

      if (excludeFolders && excludeFolders.test(item.name)){
        return;
      }
      folders.push(item);
    }

    if (fileFormat.test(item.name)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const name = item.name.match(fileFormat)![1];
      items.push(resolveItem(path, name));
      cb && cb(name);
    }
  });

  for (const folder of folders) {
    items.push(
      ...getItems<Item>({
        path: `${path}/${folder.name}`,
        resolveItem,
        cb,
        fileFormat,
        excludeFolders
      })
    );
  }

  return items;
}
