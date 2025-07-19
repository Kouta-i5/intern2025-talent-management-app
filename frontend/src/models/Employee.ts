import * as t from "io-ts";

// 性別の型定義
export const GenderT = t.union([
    t.literal('男性'),
    t.literal('女性'),
    t.literal('その他')
]);

// 所属の型定義
export const DepartmentT = t.union([
    t.literal('A'),
    t.literal('B'),
    t.literal('C'),
    t.literal('D')
]);

// スキル・希望の型定義
export const SkillT = t.union([
    t.literal('フロントエンド'),
    t.literal('バックエンド'),
    t.literal('クラウド'),
    t.literal('デザイン'),
    t.literal('PM')
]);

export const EmployeeT = t.type({
  id: t.string,
  name: t.string,
  age: t.number,
  gender: GenderT,
  department: DepartmentT,
  skills: t.array(SkillT),
  qualifications: t.array(t.string),
  hireYear: t.number,
  aspirations: t.array(SkillT),
});

export type Employee = t.TypeOf<typeof EmployeeT>;
export type Gender = t.TypeOf<typeof GenderT>;
export type Department = t.TypeOf<typeof DepartmentT>;
export type Skill = t.TypeOf<typeof SkillT>;
