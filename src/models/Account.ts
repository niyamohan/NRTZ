import { z } from 'zod';

// 账户的 Schema
export const AccountSchema = z.object({
  id: z.number(), // 账户ID，数字类型
  name: z.string(), // 账户名称，字符串类型
});

// AccountContext 的 Schema
export const AccountContextTypeSchema = z.object({
  selectedAccount: AccountSchema.nullable(), // 当前选择的账户，可能为 null
  setSelectedAccount: z.function().args(AccountSchema.nullable()).returns(z.promise(z.void())), // 设置当前账户的函数，接受一个可为 null 的账户对象，并返回一个 Promise
});

// AccountSelectorProps 数据的 Schema
export const AccountSelectorPropsSchema = z.object({
  accounts: z.array(AccountSchema), // 账户列表，数组类型，每个元素是一个账户对象
  currentAccount: AccountSchema.nullable(), // 当前账户，可能为 null
  onChange: z.function().args(AccountSchema).returns(z.promise(z.void())), // 账户变化时触发的回调函数，接受一个账户对象并返回 Promise
});

// 使用 Zod 类型推导生成接口
export interface Account extends z.infer<typeof AccountSchema> {} // 推导出 Account 类型
export interface AccountContextType extends z.infer<typeof AccountContextTypeSchema> {} // 推导出 AccountContextType 类型
export interface AccountSelectorProps extends z.infer<typeof AccountSelectorPropsSchema> {} // 推导出 AccountSelectorProps 类型