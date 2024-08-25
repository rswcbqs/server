import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../common/base-service';
import { TestGoods } from '../../entity/test/goods';

interface Category {
  id: number;
  name: string;
  parent_id: number | null;
  level: number;
  children?: Category[];
}

function buildTree(categories: Category[]): Category[] {
  const map = new Map<number, Category>();

  // Initialize the map with the categories
  categories.forEach(category => {
    map.set(category.id, { ...category, children: [] });
  });

  const tree: Category[] = [];

  // Build the tree structure
  categories.forEach(category => {
    if (category.parent_id === null) {
      // Root node
      tree.push(map.get(category.id)!);
    } else {
      // Add to parent node
      const parent = map.get(category.parent_id);
      if (parent) {
        parent.children?.push(map.get(category.id)!);
      }
    }
  });

  return tree;
}

@Provide()
export class FolderService extends BaseService<TestGoods> {
  @InjectEntityModel(TestGoods)
  userModel: Repository<TestGoods>;

  getModel(): Repository<TestGoods> {
    return this.userModel;
  }

  async getTree(parentId?: number) {
    const query = parentId
      ? `
        WITH RECURSIVE category_tree AS (
            SELECT id, name, parent_id, 1 AS level
            FROM system_folder
            WHERE id = ?
            UNION ALL
            SELECT c.id, c.name, c.parent_id, ct.level + 1
            FROM system_folder c
            INNER JOIN category_tree ct ON c.parent_id = ct.id
        )
        SELECT * FROM category_tree;
      `
      : `
        WITH RECURSIVE category_tree AS (
            SELECT id, name, parent_id, 1 AS level
            FROM system_folder
            WHERE parent_id IS NULL
            UNION ALL
            SELECT c.id, c.name, c.parent_id, ct.level + 1
            FROM system_folder c
            INNER JOIN category_tree ct ON c.parent_id = ct.id
        )
        SELECT * FROM category_tree;
      `;

    // Execute the query
    const result = parentId
      ? await this.userModel.query(query, [parentId])
      : await this.userModel.query(query);

    const tree = buildTree(result);
    return tree;
  }
}
